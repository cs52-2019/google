# Import the Earth Engine Python Package
import ee
from ee import batch
from dateutil.parser import parse
from datetime import datetime
import time

ee_dataset = {
    'Satellite': {
        # 'collection': 'LANDSAT/LC8_L1T_TOA', # 2013-present Landsat 8, raw?
        # 'collection': 'LANDSAT/LC08/C01/T1_SR', # 2013-present Landsat 8, surface reflectance
        'collection': 'LANDSAT/LE07/C01/T1_SR', # 1999-present Landsat 7, raw
        # 'bands': ['B4', 'B3', 'B2'], # Landsat 8
        'bands': ['B3', 'B2', 'B1'] # Landsat 7
    },
    'Nitrogen dioxide': {
        'collection': 'COPERNICUS/S5P/OFFL/L3_NO2',
        'bands': ['NO2_column_number_density']
    }
}

def filterCloudsLandsat7(image):
    filled1a = image.focal_mean(2, 'square', 'pixels', 1)
    return filled1a.blend(image)

def get_images_for_dataset(dataset, northeast, southwest, caseId, analysisId, startDateStr, endDateStr):
    if dataset in ee_dataset:
        dataset_info = ee_dataset[dataset]
        min_lat = southwest['lat']
        min_lng = southwest['lng']
        max_lat = northeast['lat']
        max_lng = northeast['lng']
    else:
        print('Invalid dataset')
        return

    satellite_info = ee_dataset['Satellite']

    startDate = parse(startDateStr)
    endDate = parse(endDateStr)
    if startDate > datetime.now() or endDate > datetime.now():
        print('Requesting date in the future, TODO')
        return

    startDateStr = startDate.strftime('%Y-%m-%d')
    endDateStr = endDate.strftime('%Y-%m-%d')

    ee.Initialize()

    # Everyone needs satellite
    satellite = ee.ImageCollection(satellite_info['collection']) \
                  .select(satellite_info['bands']) \
                  .filterBounds(ee.Geometry.Rectangle([min_lng, min_lat, max_lng, max_lat]))


    # If we only want satellite, filter date properly
    if dataset == 'Satellite':
        satellite = satellite.filterDate(startDateStr, endDateStr) \
                            .filter(ee.Filter.lt('CLOUD_COVER',25)) \
                            .map(filterCloudsLandsat7)
        image = satellite.median()
        output = image.visualize(bands=satellite_info['bands'], min=300, max=1800)

    elif dataset == 'Nitrogen dioxide':
        # Otherwise we're just using it for an underlay, so use a recent satellite image just to have something as background (TODO match date)
        satellite = satellite.filterDate('2018-01-01', '2018-12-31') \
                            .filter(ee.Filter.lt('CLOUD_COVER',25)) \
                            .map(filterCloudsLandsat7)
        sat_image = satellite.median()
        sat_output = sat_image.visualize(bands=satellite_info['bands'], min=300, max=1800)

        # Get and filter actual collection
        collection = ee.ImageCollection(dataset_info['collection']) \
                       .select(dataset_info['bands']) \
                       .filterDate(startDateStr, endDateStr) \
                       .filterBounds(ee.Geometry.Rectangle([min_lng, min_lat, max_lng, max_lat]))
        filter_image = collection.mean()
        filter_output = filter_image.visualize( \
            bands=dataset_info['bands'], \
            min=0, \
            max=.0002, \
            opacity=.5, \
            palette=["black", "blue", "purple", "cyan", "green", "yellow", "red"], \
        )

        output = ee.ImageCollection([
            sat_output,
            filter_output
        ]).mosaic();

    # Export to Firebase
    print("about to export")
    export = batch.Export.image.toCloudStorage(
          output,
          region=([max_lng,max_lat],[min_lng,max_lat],[min_lng,min_lat],[max_lng,min_lat]),
          dimensions = 1080,
          description='{}_{}_{}'.format(caseId, analysisId, startDateStr),
          outputBucket='gee-app-3c3fb.appspot.com')

    process = batch.Task.start(export)

    print("process sent to cloud")

# get_images_for_dataset('Nitrogen dioxide', {'lat': 24, 'lng': 54}, {'lat': 25, 'lng': 55}, "caseId", "analysisId", "1/1/19", "2/1/19")
# get_images_for_dataset('Satellite', {'lat': 24, 'lng': 54}, {'lat': 25, 'lng': 55}, "caseId", "analysisId", "1/1/18", "12/31/18")

# for year in range(10, 19):
#     get_images_for_dataset('Satellite', [48.739046872463796, 29.42372907460026], [48.51211900387867, 28.92683376133732], "vinnytsia_poultry_farm", "-LgXk1i_C3DY_4wWHRtI", "1/1/{}".format(year), "12/31/{}".format(year))
