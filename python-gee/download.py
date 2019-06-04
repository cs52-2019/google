# Import the Earth Engine Python Package
import ee
from ee import batch
from dateutil.parser import parse
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
        'bands': ['tropospheric_NO2_column_number_density']
    }
}

# def toUnixTimestamp(date):
#     return int(time.mktime(date.timetuple())) * 1000

def filterCloudsLandsat7(image):
    filled1a = image.focal_mean(2, 'square', 'pixels', 1)
    return filled1a.blend(image)

def get_images_for_dataset(dataset, northeast, southwest, caseId, analysisId, startDateStr, endDateStr):
    if dataset in ee_dataset:
        dataset_info = ee_dataset[dataset]
        min_lat, min_lng = southwest
        max_lat, max_lng = northeast
    else:
        print('Invalid dataset')
        return

    startDate = parse(startDateStr)
    endDate = parse(endDateStr)
    startDateStr = startDate.strftime('%Y-%m-%d')
    endDateStr = endDate.strftime('%Y-%m-%d')

    ee.Initialize()

    # Get and filter collection
    collection = ee.ImageCollection(dataset_info['collection']) \
                   .select(dataset_info['bands']) \
                   .filterDate(startDateStr, endDateStr) \
                   .filterBounds(ee.Geometry.Rectangle([min_lng, min_lat, max_lng, max_lat]))

    # Filter cloudy scenes
    if dataset == 'Satellite':
        # collection = collection.filter(ee.Filter.lt('CLOUD_COVER', 5))
        collection = collection.filter(ee.Filter.lt('CLOUD_COVER',25)) \
                               .map(filterCloudsLandsat7)

    # Reduce collection to a single image
    image = collection.median()
    output = image.visualize(bands=dataset_info['bands'], min=300, max=1800)

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

# get_images_for_dataset('Satellite', [24, 54], [25, 55], "caseId", "analysisId", "1/1/16", "6/1/16")
for year in range(10, 19):
    get_images_for_dataset('Satellite', [48.739046872463796, 29.42372907460026], [48.51211900387867, 28.92683376133732], "vinnytsia_poultry_farm", "-LgXk1i_C3DY_4wWHRtI", "1/1/{}".format(year), "12/31/{}".format(year))

# # Initialize the Earth Engine object, using the authentication credentials.
# ee.Initialize()
#
# # Get Landsat data
# # collection = ee.ImageCollection('LANDSAT/LC8_L1T_TOA')
# collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2').select('tropospheric_NO2_column_number_density')
#
# # Filter date
# date = collection.filterDate('2016-01-01', '2016-12-31')
#
# # Filter location
# min_lng, min_lat, max_lng, max_lat = 28.5, 47.5, 29, 48 # Ukraine
# # min_lng, min_lat, max_lng, max_lat = 54, 24, 55, 25 # Dubai
# region = ee.Geometry.Rectangle([min_lng, min_lat, max_lng, max_lat])
# loc = date.filterBounds(region)
#
# # point = ee.Geometry.Point(28.5, 47.5)
# # point = ee.Geometry.Point(55, 25)
# # region = date.filterBounds(point)
#
# # Filter cloudy scenes
# # clouds = loc.filter(ee.Filter.lt('CLOUD_COVER', 5))
#
# # Select bands
# # bands = clouds.select(['B4', 'B3', 'B2'])
#
# # Make the data 8-bit
# def convertBit(image):
#     return image.multiply(512).uint8()
#
# image = loc.mean()
# output = image.visualize(bands = ['tropospheric_NO2_column_number_density'], min=0, max=.0002, opacity=1, palette=["black", "blue", "purple", "cyan", "green", "yellow", "red"], forceRgbOutput=True)
#
# # Export
# print "about to export"
#
# out = batch.Export.image.toCloudStorage(
#       output,
#       # region=([29.6458, 48.3540], [28.8135, 48.3540], [28.8135, 47.8042], [29.6458, 47.8042]),
#       # region=([55.6458,25.3540], [54.8135,25.3540],[54.8135,24.8042],[55.6458,24.8042]),
#       # region=([55,25],[54,25],[54,24],[55,24]),
#       region=([max_lng,max_lat],[min_lng,max_lat],[min_lng,min_lat],[max_lng,min_lat]),
#       dimensions = 720,
#       description='test',
#       outputBucket='gee-app-3c3fb.appspot.com')
#
# process = batch.Task.start(out)
#
# print "process sent to cloud"
