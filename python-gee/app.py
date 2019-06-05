import ee
from ee import batch
from dateutil.parser import parse
import time

from flask import Flask, jsonify, request
from download import get_images_for_dataset

app = Flask(__name__)

@app.route('/')
# @cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def hello_world():
    ee.Initialize()
    response = jsonify({'ee_hello_world': ee.Number(1).sin().getInfo()})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# @app.route('/download_one/<case_id>/<analysis_id>/')
@app.route('/download_one', methods=['POST'])
def download():
    body = request.get_json(force=True)
    ee.Initialize()

    get_images_for_dataset(
        dataset='Satellite',
        northeast=body['northeast'],
        southwest=body['southwest'],
        caseId=body['caseId'],
        analysisId=body['analysisId'],
        startDateStr=body['startDate'],
        endDateStr=body['endDate']
    )

    response = jsonify({'ee_hello_world': ee.Number(1).sin().getInfo()})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
