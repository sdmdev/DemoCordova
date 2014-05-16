var scheda = {
	initialize : function() {
		this.bind();
	},

	bind : function() {
		document.addEventListener('deviceready', this.deviceready, false);
		$("#btnSalva").on("tap", scheda.save);
	},

	save : function() {

		// Istruzioni per il salvataggio
		navigator.notification.alert("Salvataggio effettuato!", function() {
		}, "Informazione", "OK");
	},

	deviceready : function() {
		app.start();
	},

	start : function() {

		// ...
	}
};

$(document).ready(function() {
	scheda.initialize();
});}