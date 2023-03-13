from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pytube import YouTube, Channel
import mimetypes
import os
import shutil


currentdirectory = os.path.dirname(os.path.abspath(__file__))


app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)

# Delete the contents of the downloads directory when the app starts up
downloads_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'downloads')
if os.path.exists(downloads_dir):
    shutil.rmtree(downloads_dir)
os.makedirs(downloads_dir)

@app.route("/greeting")
def default():
    return {"message" : "Hello from the server!"}

@app.route("/process", methods=["POST"])
def processVideo():
    url = request.json.get('link')
    yt = YouTube(url)
    channel = Channel(yt.channel_url)
    details = {
        'title' : yt.title,
        'thumbnail_url' : yt.thumbnail_url,
        'channel' : channel.channel_name,
        'embed_url' : yt.embed_url
    }
    print(yt.streams.filter(progressive=True))
    stream = yt.streams.filter(progressive=True).get_by_resolution('720p')
    if stream is None:
        stream = yt.streams.filter(progressive=True).get_by_resolution('360p')
        if stream is None:
            return {"error": "no stream found"}
    print(stream)
    stream.download(output_path='./downloads/', filename = f"RF-JL-{yt.title}.mp4")
    return details

@app.route("/download", methods=["POST"])
def download():
    title = request.json.get('title')
    print('downloadVideo() called')
    filename = f"RF-JL-{title}.mp4"
    mimetype = mimetypes.guess_type(filename)[0]
    return send_file(f'./downloads/{filename}', as_attachment=True, mimetype=mimetype)
    
if __name__ == "__main__":
    app.run(debug=True)