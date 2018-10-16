sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/json/JSONPropertyBinding"
], function(JSONModel, JSONPropertyBinding) {
	"use strict";
	return {
		attachPropertyChanged: function({
			oJSONModel = undefined,
			sPath = undefined,
			fnHandler = undefined,
			oListener = undefined
		} = {}) {
			let oBinding = new JSONPropertyBinding(oJSONModel, sPath, oJSONModel.getContext(sPath));
			oBinding.attachChange(fnHandler, oListener);
			return oBinding;
		}
	};
});