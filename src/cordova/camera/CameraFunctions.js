// https://cordova.apache.org/docs/en/2.0.0/cordova/camera/camera.getPicture.html
sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/cordova/camera/CameraException"
], function(Object, CameraException) {
	"use strict";
	return {
		getPicture: function(oCameraOptions) {
			return new Promise(function(fnResolve, fnReject) {
				navigator.camera.getPicture(
					(oResult) => fnResolve(oResult),
					(oError) => fnReject(new CameraException({
						sMessage: "Failed to make camera shot with options: '" + JSON.stringify(oCameraOptions) + "'",
						oCausedBy: oError
					})), oCameraOptions);
			});
		}
	};
});