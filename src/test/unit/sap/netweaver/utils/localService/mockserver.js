sap.ui.define([
		"sap/ui/core/util/MockServer"
	], function (MockServer) {
		"use strict";

		var oMockServer;
		return {

			init : function () {
				this._oMockServer = new MockServer({
					rootUri: "/mockserver/"
				});
				let sPath = jQuery.sap.getModulePath("com.pepsico.core.test.unit.sap.netweaver.utils.localService");
				this._oMockServer.simulate(sPath + "/metadata.xml", {
						sMockdataBaseUrl: sPath + "/mockdata",
						bGenerateMissingMockData: true
					});
				MockServer.config({
					autoRespond : true,
					autoRespondAfter :  300
				});
				this._oMockServer.start();
			},
			

			/**
			 * @public returns the mockserver of the app, should be used in integration tests
			 * @returns {sap.ui.core.util.MockServer} the mockserver instance
			 */
			getMockServer : function () {
				return oMockServer;
			}
		};

	}
);