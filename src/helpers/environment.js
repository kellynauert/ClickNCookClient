let APIURL = '';

switch (window.location.hostname) {
	// this is the local host name of your react app
	case 'localhost' || '127.0.0.1':
		// this is the local host name of your API
		APIURL = 'http://localhost:3000';
		break;
	// this is the deployed react application, no end slash or https
	case 'clickncook-client.herokuapp.com':
		// this is the full url of your deployed API, no end slash
		APIURL = 'https://clickncook-server.herokuapp.com';
}

export default APIURL;
