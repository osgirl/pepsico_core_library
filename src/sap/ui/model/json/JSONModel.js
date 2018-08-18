sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/json/JSONPropertyBinding",
	"sap/ui/model/Binding"
], function(JSONModel, JSONPropertyBinding, Binding) {
	"use strict";
	return JSONModel.extend("com.pepsico.core.sap.ui.model.json.JSONModel", {
		attachChange: function(sPath, fnHandler) {
			//let oBinding = new JSONPropertyBinding(this, sPath, this.getContext(sPath));
			let oBinding = new Binding(this, sPath, this.getContext(sPath));
			oBinding.attachChange(fnHandler, this);
		}
	});
});