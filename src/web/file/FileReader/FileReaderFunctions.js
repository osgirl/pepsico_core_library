// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/web/file/FileReader/FileReaderException"
], function(Object, FileReaderException) {
	"use strict";
	return {
		readAsArrayBuffer: function(oFile) {
			return new Promise(function(fnResolve, fnReject) {
				let oFileReader = new FileReader();
				oFileReader.onloadend = function(oEvent) {
					if (oEvent.target.error != null) {
						fnReject(new FileReaderException({
							sMessage: "File read failure, file details:\n" + JSON.stringify(oFile, null, 4),
							oCausedBy: oEvent.target.error
						}));
					} else {
						fnResolve(oFileReader.result );
					}
				};
				oFileReader.readAsArrayBuffer(oFile);
			});
		},
		readAsBinaryString: function(oFile) {
			return new Promise(function(fnResolve, fnReject) {
				let oFileReader = new FileReader();
				oFileReader.onloadend = function(oEvent) {
					if (oEvent.target.error != null) {
						fnReject(new FileReaderException({
							sMessage: "File read failure, file details:\n" + JSON.stringify(oFile, null, 4),
							oCausedBy: oEvent.target.error
						}));
					} else {
						fnResolve(oFileReader.result );
					}
				};
				oFileReader.readAsBinaryString(oFile);
			});
		},
		readAsDataURL: function(oFile) {
			return new Promise(function(fnResolve, fnReject) {
				let oFileReader = new FileReader();
				oFileReader.onloadend = function(oEvent) {
					if (oEvent.target.error != null) {
						fnReject(new FileReaderException({
							sMessage: "File read failure, file details:\n" + JSON.stringify(oFile, null, 4),
							oCausedBy: oEvent.target.error
						}));
					} else {
						fnResolve(oFileReader.result );
					}
				};
				oFileReader.readAsDataURL(oFile);
			});
		},
		readAsText: function(oFile) {
			return new Promise(function(fnResolve, fnReject) {
				let oFileReader = new FileReader();
				oFileReader.onloadend = function(oEvent) {
					if (oEvent.target.error != null) {
						fnReject(new FileReaderException({
							sMessage: "",
							oCausedBy: oEvent.target.error
						}));
					} else {
						fnResolve(oFileReader.result );
					}
				};
				oFileReader.readAsText(oFile);
			});
		}
	};
});