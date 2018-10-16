// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
sap.ui.define([
	"com/pepsico/core/sap/ui/base/RuntimeException",
	"com/pepsico/core/sap/ui/model/odata/v2/ODataException"
], function(RuntimeException) {
	"use strict";
	return {
		/*fromODataModel: function(oOdataModel, sFunctionName) {
			const aParamsCount = [
					{sFunctionName: "read", iParamsCount: 2},
					{sFunctionName: "read", iParamsCount: 2},
					{sFunctionName: "read", iParamsCount: 2},
					{sFunctionName: "read", iParamsCount: 2},
				];
			const iParamsCount = aParamsCount.find(item => item.sFunctionName === sFunctionName).iParamsCount;
			return function() {
				let aFunctionParams = Array.from(arguments);
				let mParameters
				return new Promise(function(fnResolve, fnReject) {
					oOdataModel[sFunctionName].apply(oOdataModel, aFunctionParams[0], aFunctionParams[1], );
				});
				
			};
		},*/
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