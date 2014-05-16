function initialize() {	
	this.bindEvents();
}

function bindEvents() {
	document.addEventListener('deviceready', this.onDeviceReady, false);
	console.log("bindEvents ...");
}

function onDeviceReady() {

    // Read NDEF formatted NFC Tags
    nfc.addNdefListener (
        function (nfcEvent) {
            var tag = nfcEvent.tag,
                ndefMessage = tag.ndefMessage;

            // dump the raw json of the message
            // note: real code will need to decode
            // the payload from each record
            alert(JSON.stringify(ndefMessage));

            // assuming the first record in the message has 
            // a payload that can be converted to a string.
            alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
        }, 
        function () { // success callback
            alert("Waiting for NDEF tag");
        },
        function (error) { // error callback
            alert("Error adding NDEF listener " + JSON.stringify(error));
        }
    );
}

$( document ).on( "pageinit", "#main", function( event ) {
	initialize();
	});


