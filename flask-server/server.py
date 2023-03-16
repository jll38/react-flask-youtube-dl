from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pytube import YouTube, Channel, Playlist
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
    
    print(yt.streams.filter(progressive=True))
    stream = yt.streams.filter(progressive=True).get_by_resolution('720p')
    if stream is None:
        stream = yt.streams.filter(progressive=True).get_by_resolution('360p')
        if stream is None:
            return {"error": "no stream found"}
    print(f'MP4 stream found: {stream}')
    stream = yt.streams.filter(progressive=True).get_by_resolution('720p')
    mp4stream = True
    mp3stream = True
    if stream is None:
        stream = yt.streams.filter(progressive=True).get_by_resolution('360p')
        if stream is None:
            mp4stream = False
    stream = yt.streams.filter(only_audio=True)
    if stream is None:
        stream = yt.streams.filter(progressive=True).get_by_resolution('360p')
        if stream is None:
            mp3stream = False
    print(f'MP4 stream found: {mp4stream}')
    print(f'MP3 stream found: {mp3stream}')
    details = {
        'title' : yt.title,
        'thumbnail_url' : yt.thumbnail_url,
        'channel' : channel.channel_name,
        'embed_url' : yt.embed_url,
        'link' :  yt.watch_url,
        'mp4' : mp4stream,
        'mp3': mp3stream
    }
    return details

@app.route("/process-playlist", methods=["POST"])
def processPlaylist():
    print("Processing playlist...")
    playlistData = request.json
    playlist = Playlist(playlistData['link'])
    title = playlist.title
    videoURLS = playlist.video_urls[:3]
    playlistDetails = {
        'title' : title,
        'videos' : videoURLS
    }
    return playlistDetails


@app.route("/download", methods=["POST"])
def download():
    print('downloadVideo() called')
    data = request.json
    title = data.get('title')
    link = data.get('link')
    type = data.get('type')
    yt = YouTube(link)
    stream = yt.streams.filter(progressive=True)[0]
    print(f"Input Type {type}")
    if(type == '.mp4'):
        print(f"Downloading MP4")
        stream = yt.streams.filter(progressive=True).get_by_resolution('720p')
        if stream is None:
            stream = yt.streams.filter(progressive=True).get_by_resolution('360p')
            if stream is None:
                return {"error": "no stream found"}
    elif(type == '.mp3'):
        print(f"Downloading MP3")
        stream = yt.streams.filter(only_audio=True).first()
        print(stream)
    else:
        return {"error": "invalid type"}
    filename = f"RF-JL-{title}{type}"
    print(f'filename: {filename}')
    stream.download(output_path='./downloads/', filename = filename)
    mimetype = mimetypes.guess_type(filename)[0]
    print(f'mimetype: {mimetype}')
    return send_file(f'./downloads/{filename}', as_attachment=True, mimetype=mimetype)
    
if __name__ == "__main__":
    app.run(debug=True)