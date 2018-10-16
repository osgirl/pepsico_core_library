sap.ui.define([
	"sap/ui/model/odata/v2/ODataModel",
	"com/pepsico/core/sap/ui/model/odata/v2/ODataException"
], function(ODataModel, ODataException) {
	"use strict";
	return {
		/*constructor: function() {
			ODataModel.call(this);
			
		},*/ //
		attachChange: function(sPath, fnOnChange) {
			let oBinding = new sap.ui.model.Binding(this, sPath, this.getContext(sPath));
			oBinding.attachChange((oEvent) => fnOnChange(oEvent));
		},
		getRelatedPath: function(sFullPath) {
			return sFullPath.replace(this.sServiceUrl, "");
		},
		readPromise: function(oODataModel, sPath, mParameters) {
			mParameters = mParameters || {};
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to read '" + sPath + "'", oCausedBy: oException}));
				oODataModel.read(sPath, mParameters);
			});
		},
		createPromise: function(sPath, oData, mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({
							sMessage: "Failed to create entry at path '" + sPath + "', data: " + JSON.stringify(oData, null, 4), 
							oCausedBy: oException
						}));
				that.create(sPath, oData, mParameters);
			});
		},
		removePromise: function(sPath, mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to remove '" + sPath + "'", oCausedBy: oException}));
				that.remove(sPath, mParameters);
			});
		},
		submitChangesPromise: function(mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to submit changes", oCausedBy: oException}));
				that.submitChanges(mParameters);
			});
		},
		callFunctionPromise: function(sFuncPath, mParameters) {
			mParameters = mParameters || {};
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				mParameters.success = fnResolve;
				mParameters.error = (oException) =>
						fnReject(new ODataException({sMessage: "Failed to call function '" + sFuncPath + "'", oCausedBy: oException}));
				that.callFunction(sFuncPath, mParameters);
			});
		},
		refreshSecurityTokenPromise: function(bAsync) {
			var that = this;
			return new Promise(function(fnResolve, fnReject) {
				that.refreshSecurityToken(fnResolve, fnReject, bAsync);
			});
		},
		callFunctionExt: function(sFuncPath, sMethod, mUrlParameters) {
			var that = this;
			return new Promise(function (resolve, reject) {
				that.callFunction(sFuncPath, { 
					method: sMethod,
					urlParameters: mUrlParameters,
					success: function(oData) {
						resolve(oData);
					},
					error: function(oException) {
						reject(new ODataException({sMessage: "Failed", oCausedBy: oException}));
					}
				});	
			});
		},
		readExt: function(sPath, mUrlParameters) {
			var that = this;
			return new Promise(function(resolve, reject) {
				that.read(sPath, {
					urlParameters: mUrlParameters,
					success: function(oData) {
						resolve(oData);
					},
					error: function(oException) {
						reject(new ODataException({sMessage: "Failed", oCausedBy: oException}));
					}
				});
			});
		},
		createExt: function(sPath, oData) {
			var that = this;
			return new Promise(function(resolve, reject) {
				that.create(sPath, oData, {
					success: function(oDataResult) {
						resolve(oDataResult);
					},
					error: function(oException) {
						reject(new ODataException({sMessage: "Failed", oCausedBy: oException}));
					}
				});
			});
		},
		submitChangesExt: function(sFullPath) {
			var that = this;
			return new Promise(function(resolve, reject) {
				that.submitChanges({
					success: function(oData) {
						resolve(oData);
					},
					error: function(oException) {
						reject(new ODataException({sMessage: "Failed", oCausedBy: oException}));
					}
				});
			});
		},
		removeExt: function(sFullPath) {
			var that = this;
			return new Promise(function(resolve, reject) {
				that.remove(sFullPath, {
					success: function(oData) {
						resolve(oData);
					},
					error: function(oException) {
						reject(new ODataException({sMessage: "Failed", oCausedBy: oException}));
					}
				});
			});
		}
	};
});