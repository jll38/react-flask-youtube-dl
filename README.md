# YouTube Downloader Web Application

This web application is built using React and Flask. It allows users to download videos from YouTube by providing a valid video link. The application also provides details such as video title, thumbnail, and channel name.

Along with downloading singular videos from YouTube, this application will allow users to download whole playlists from Youtube by providing a valid url. 

## Installation (Local Machine)

To run this application on your local machine, follow the instructions below:

1. Clone the repository.

2. Install the dependencies by running `npm install` in the `client` directory.

3. Install Flask and other requirements by running `pip install -r requirements.txt` in the `flask-server` directory.

4. Start the Flask server by running `python server.py` in the `flask-server` directory.

5. Start the React app by running `npm start` in the client directory.

6. Navigate to http://localhost:3000 in your web browser.

## Installation using Docker Compose

1. Clone the repository.

2. Navigate to the top directory of the project.

3. Build the Docker images for the Flask server and the React app by running `docker-compose build`.

4. Start the containers by running `docker-compose up`.

5. Navigate to http://localhost:3000 in your web browser.


## Credits

This project was created by Julian Lechner in 2023. It uses the following libraries and frameworks:

- React (https://reactjs.org/)
- Flask (https://flask.palletsprojects.com/)
- Chakra UI (https://chakra-ui.com/)
- PyTube (https://pytube.io/)

