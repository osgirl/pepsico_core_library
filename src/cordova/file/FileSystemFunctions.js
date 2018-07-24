sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/cordova/file/FileSystemException"
], function(Object, FileSystemException) {
	"use strict";
	return {
		resolveLocalFileSystemURL: function(sLocalFileSystemURL) {
			return new Promise(function(fnResolve, fnReject) {
				window.resolveLocalFileSystemURL(
					sLocalFileSystemURL,
					(oFileEntry) => fnResolve(oFileEntry),
					(oError) => fnReject(new FileSystemException({
						sMessage: "Failed to resolve local file: '" + sLocalFileSystemURL + "'",
						oCausedBy: oError
					})));
			});
		},
		getFileFromFileEntry: function(oFileEntry) {
			return new Promise(function(fnResolve, fnReject) {
				oFileEntry.file(
					(oFile) => fnResolve(oFile),
					(oError) => fnReject(new FileSystemException({
						sMessage: "Failed to get file from fileEntry:\n" + JSON.stringify(oFileEntry, null, 4),
						oCausedBy: oError
					})));
		});
		}
	};
});