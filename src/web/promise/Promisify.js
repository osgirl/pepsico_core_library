// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
sap.ui.define([
	"com/pepsico/core/sap/ui/base/RuntimeException"
], function(RuntimeException) {
	"use strict";
	return {
		fromOData: function(oOdataModel, sFunctionName) {
			return function() {
				debugger;
				let oFunctionParams = Array.from(arguments);
				oOdataModel[sFunctionName].apply(oOdataModel, oFunctionParams);
			};
		},
		fromSuccesError: function(fnFunction) {
			return this.fromSuccesErrorParams(fnFunction);
		},
		fromSuccesErrorParams: function(fnFunction) {
			return function() {
				let oFunctionParams = Array.from(arguments);
				return new Promise(function(fnResolve, fnReject) {
					fnFunction(function() {
						fnResolve(Array.from(arguments));
					}, function(oError) {
						throw new RuntimeException({
							sName: "PromisifyException",
							sMessage: "Error callback",
							oCausedBy: oError
						});
					}, ...oFunctionParams);
				});
				
			};
		},
		fromSuccesErrorParamsObj: function(oObject, sFunctionName) {
			return function() {
				let oFunctionParams = Array.from(arguments);
				return new Promise(function(fnResolve, fnReject) {
					oObject[sFunctionName].apply(oObject, fnResolve, fnReject, ...oFunctionParams);
				});
				
			};
		},
	};
});