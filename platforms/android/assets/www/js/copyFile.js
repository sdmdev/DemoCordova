var ParentEntry;

// Application Constructor
function initialize() {
	console.log("initialize seconda ...");
	this.bindEvents();
}

function bindEvents() {
	document.addEventListener('deviceready', this.onDeviceReady, false);
	console.log("bindEvents ...");

}
// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicity call 'app.receivedEvent(...);'
function onDeviceReady() {
	console.log("onDeviceReady");
	receivedEvent('deviceready');
}

// Update DOM on a Received Event
function receivedEvent(id) {
	alert("receivedEvent -----");
	var parentElement = document.getElementById(id);
	var listeningElement = parentElement.querySelector('.listening');
	var receivedElement = parentElement.querySelector('.received');

	listeningElement.setAttribute('style', 'display:none;');
	receivedElement.setAttribute('style', 'display:block;');
	copyFileFromSD();
}

function copyFileFromSD() {
	console
			.log("copyFileFromSD requestFileSystem .....................................");

	// window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	window.resolveLocalFileSystemURL(
			"file:///data/data/eu.techmobile.democordova", onSuccess, onError);
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
			onFileSystemSuccess, fail);
}

function onSuccess(parentEntry) {
	alert("onSuccess ...");
}

function onError(error) {
	alert("onError ...");
}

function onFileSystemSuccess(fileSystem) {
	alert("onFileSystemSuccess ...");
	parentEntry = new DirectoryEntry({
		fullPath : parent
	});
	fileSystem.copyTo(parentEntry, "indice.html", success, fail);
}

function success() {
	alert("success!!");

}
function fail() {
	alert("fail!!");
}
