from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import pandas as pd
import base64
import io
from contextlib import redirect_stdout
import threading
import gridfs
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

client = MongoClient('mongodb://localhost:27017/')
db = client['myDatabase']
fs = gridfs.GridFS(db)

@app.route('/run', methods=['POST'])
def run_code():
    code = request.json.get('code')
    output = None
    plot_url = None
    buffer = io.StringIO()

    try:
        def exec_code():
            nonlocal output, plot_url
            with redirect_stdout(buffer):
                exec_globals = {'plt': plt, 'pd': pd}  # Include pandas and matplotlib in the globals
                exec_locals = {}
                exec(code, exec_globals, exec_locals)

            if plt.get_fignums():
                buf = io.BytesIO()
                plt.subplots_adjust(bottom=0.2)
                plt.savefig(buf, format='png')
                buf.seek(0)
                plot_url = base64.b64encode(buf.read()).decode('utf-8')
                plt.close('all')

            output = buffer.getvalue() or 'Code executed successfully.'

        exec_thread = threading.Thread(target=exec_code)
        exec_thread.start()
        exec_thread.join()
        
    except Exception as e:
        output = str(e)

    return jsonify({'output': output, 'plot': plot_url})

@app.route('/file/<file_id>', methods=['GET'])
def get_file(file_id):
    try:
        file_id = ObjectId(file_id)
        file_data = fs.get(file_id).read()
        response = Response(file_data, mimetype='application/octet-stream')
        response.headers['Content-Disposition'] = f'attachment; filename={file_id}.hdf5'
        return response
    except Exception as e:
        return str(e), 404

if __name__ == '__main__':
    app.run(debug=True)
