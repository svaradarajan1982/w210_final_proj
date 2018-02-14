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

sys.path.append('/Users/chu/Documents/sc/W210/w210_final_proj/backend/')
print(sys.path)
# sys.path.append("...")


from consumer_module import consumer_controller
from retailer_module import retailer_controller
from db import db_controller
import bottle
bottle.BaseRequest.MEMFILE_MAX = 1024 * 1024

def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)
    return _enable_cors

app = Bottle()
retailer_c = retailer_controller.RetailerController()
consumer_c = consumer_controller.ConsumerController()
db_c = db_controller.DBController()

@app.route('/test')
def test():
    return 'working'

@app.route(path='/user/login', method='POST')
@enable_cors
def userLogin():
    try:
        request_json = dict(request.json)
        username = request_json['username']
        password = request_json['password']
        user = db_c.getUser(username, password)
        return {'result': user}
    except Exception as e:
        print e
        return e

@app.route(path='/user/save', method='POST')
@enable_cors
def userCreation():
    try:
        request_json = dict(request.json)
        username = request_json['username']
        password = request_json['password']
        email = request_json['email']
        db_c.createUser(username, password, email)
        return {'result': request_json}
    except Exception as e:
        print e
        return e






if __name__ == '__main__':
    from optparse import OptionParser

    parser = OptionParser()
    parser.add_option("--host", dest="host", default="localhost",
                      help="hostname or ip address", metavar="host")
    parser.add_option("--port", dest="port", default=8090,
                      help="port number", metavar="port")
    (options, args) = parser.parse_args()

    run(app,  server='gevent', host=options.host, port=int(options.port))