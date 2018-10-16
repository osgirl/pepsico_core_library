/*global QUnit,sinon*/
/*eslint-env browser*/

sap.ui.define([
	"com/pepsico/core/sap/netweaver/utils/UserExitStrategy",
	"com/pepsico/core/test/unit/sap/netweaver/utils/localService/mockserver",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit",
], function(UserExitStrategy, mockserver) {
	"use strict";
	debugger;
	QUnit.module("User Exit Strategy");
	QUnit.test("Test 1", function(assert) {
		mockserver.init();
		let oUserExitStrategy = new UserExitStrategy({
			aUserExitIds: [
				"USER_EXIT_01",
				"USER_EXIT_02",
				"USER_EXIT_03",
			],
			/*aUserExitStrategyMapping: [
				{
					UserExitId: "USER_EXIT_01",
					FieldValue1: "RU01",
					FieldValue2: "SA",
					FunctionName: 'fnHandlerFunction'
				}, {
					UserExitId: "USER_EXIT_01",
					FieldValue1: "RU01",
					FieldValue2: "SB",
					FunctionName: 'fnHandlerFunction'
				}
			],*/
			sServiceUrl: "/mockserver"
		});

		let fnDone = assert.async();
		let oHandler = {
			fnHandlerFunction: (oData) => {
				assert.ok(true, "Passed");
				fnDone();
			}
		};
		oUserExitStrategy.init()
			.then(() => oUserExitStrategy.exec({
				sUserExitId: "USER_EXIT_01",
				sFieldValue1: "RU01",
				sFieldValue2: "SA",
				oHandler: oHandler,
				oData: "test_data"
			}));

	});
});