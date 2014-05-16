
var app = {
	// Application Constructor
	initialize : function() {
		console.log("initialize ...");

		this.bindEvents();
	},

	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		console.log("bindEvents ...");

	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		console.log("onDeviceReady");
		app.receivedEvent('deviceready');
		console.log("onDeviceReady ...");
	},

	showAlert : function() {

		navigator.notification.alert('you winner', alertDismissed, 'game over',
				'done');
	},

	// Update DOM on a Received Event
	receivedEvent : function(id) {
		alert("receivedEvent -----");
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
		this.writeOnFileSystem();
		// this.doAjaxFunc();
		// console.log('Received Event: ' + id);
		// console.log("speech event");
		// var u = new SpeechSynthesisUtterance();
		// u.text = "You know you're going to make the app say something now";
		// u.lang = 'en-US';
		// speechSynthesis.speak(u);
	},

	doAjaxFunc : function() {
		var inputValue = $('input#ajax_input').val(); // prendiamo il valore
		// della nostro campo
		// input

		// ecco la nostra richiesta ad un file al quale inviamo in POST il
		// parametro value contenente il valore del nostro campo input
		var richiesta = $.ajax({
			url : "http://ip.jsontest.com/",
			type : "POST",
			data : {
				value : inputValue
			},
			dataType : "text"
		});

		// Questa è la funzione che restituisce la risposta del nostro script se
		// la nostra richiesta Ajax avrà esito positivo
		richiesta.done(function(data) {
			alert(data);
		});
		// Questa funzione invece (che sostituisce .error delle precedenti
		// versioni di jQuery) restituisce, in caso di richiesta errata, il
		// messaggio di errore riscontrato durante la richiesta ajax
		richiesta.fail(function(jqXHR, textStatus) {
			alert("Request failed: " + textStatus);
		});
		this.writeOnFileSystem();
	},

	writeOnFileSystem : function() {
		console.log("writeOnFileSystem requestFileSystem ...");
		// window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		window.resolveLocalFileSystemURI(
				"file:///data/data/eu.techmobile.democordova", onSuccess,
				onError);
	}
};

function onSuccess(entry) {
	console.log("onSuccess ...");
	console.log("prima di getdir ...");
	entry.getDirectory("directoryEsempio", {
		create : true,
		exclusive : false
	}, onGetDirectorySuccess, onGetDirectoryFail);
	console.log("dopo di getdir ...");

}

function onError(error) {
	console.log("onError");
}

function onGetDirectorySuccess(dir) {
	alert("onGetDirectorySuccess ...");
	console.log("created dir: " +dir.name);
	console.log("created dir fullPath: " +dir.fullPath);
	dir.getFile("mioFile",{
				create : true,
				exclusive : false
			}, gotFileEntry, fail);
}

function onGetDirectoryFail(error) {
	alert("Error creating directory " + error.code);
}

function gotFileEntry(fileEntry) {
	console.log("gotFileEntry...");
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	console.log("gotFileWriter ...");

	writer.onwriteend = function(evt) {
		console.log("contents of file now 'some sample text'");
		writer.truncate(11);
		writer.onwriteend = function(evt) {
			console.log("contents of file now 'some sample'");
			writer.seek(4);
			writer.write(" Sergio scrive su data/data");
			writer.onwriteend = function(evt) {
				console.log("contents of file now 'some different text'");
			}
		};
	};
	writer.write("some sample text");
	

}

function fail(error) {
	console.log("fail ...");

	console.log(error.code);
}


// read --------------------------------------------
//read --------------------------------------------
//read --------------------------------------------


function readOnDataData() {
	console.log("readOnDataData ...");
//	readDataUrl(file);
//	readAsText(file);
	window.resolveLocalFileSystemURI(
			"file:///data/data/eu.techmobile.democordova/directoryEsempio", gotFSRead,
			onErrorRead);
}

function gotFSRead(fileSystem) {
	console.log("onSuccessRead ...");

	fileSystem.getFile("mioFile", null, gotFileReaderEntry, onErrorReading )
}
function onErrorRead(fileEntry) {
	console.log("onErrorRead ...");
	
}

function gotFileReaderEntry(fileEntry) {
	fileEntry.file(gotFileReading, failReading);
}

function gotFileReading(file) {
    readAsText(file);
}

function failReading(error) {
console.log("onErrorReading ...");
}

function onErrorReading(fileEntry) {
	console.log("onErrorReading ...");
}

function readDataUrl(file) {
	console.log("readDataUrl ...");
    var reader = new FileReader();
    reader.
    reader.onloadend = function(evt) {
        console.log("Read as data URL");
        console.log(evt.target.result);
    };
    reader.readAsDataURL(file);
}

function readAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as text ---------");
        alert(evt.target.result);
        console.log(evt.target.result);
    };
    reader.readAsText(file);
}

function fail(evt) {
    console.log(evt.target.error.code);
}

