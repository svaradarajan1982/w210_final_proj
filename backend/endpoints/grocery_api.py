from gevent import monkey; monkey.patch_all()
from bottle import Bottle, route, run, request, response, install, HTTPResponse, hook, error, static_file
from bottle import static_file

import re
import json
import os
import sys
from datetime import datetime
import uuid
import base64

from grocery import grocery_service
import bottle
bottle.BaseRequest.MEMFILE_MAX = 1024 * 1024

def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token, user_id'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)
    return _enable_cors

grocery_app = Bottle()
grocery_serv = grocery_service.GroceryService()

@grocery_app.route(path='/grocery/test', method=['GET','OPTIONS'])
@enable_cors
def groceryTest():
    try:
        return {'result': 'grocery test'}
    except Exception as e:
        print e
        return e


@grocery_app.route(path='/grocery/recommended', method=['GET', 'OPTIONS'])
@enable_cors
def getRecommendedGrocery():
    try:
        user_id = request.get_header('user_id')
        print('user id:', user_id)
        rec_grocery_data = grocery_serv.getRecommendedGrocery(user_id)
        return { 'data': rec_grocery_data}
    except Exception as e:
        print e
        return e

@grocery_app.route(path='/grocery/suggested', method=['GET','OPTIONS'])
@enable_cors
def getSuggestedItems():
    try:
        user_id = request.get_header('user_id')
        # request_json = dict(request.json)
        data = grocery_serv.getSuggestedGrocery(user_id)
        return {'data': data}
    except Exception as e:
        print e
        return e

if __name__ == '__main__':
    from optparse import OptionParser

    parser = OptionParser()
    parser.add_option("--host", dest="host", default="0.0.0.0",
                      help="hostname or ip address", metavar="host")
    parser.add_option("--port", dest="port", default=8090,
                      help="port number", metavar="port")
    (options, args) = parser.parse_args()

    run(grocery_app,  server='gevent', host=options.host, port=int(options.port))