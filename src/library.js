sap.ui.define([
	"sap/ui/core/Core",
	"sap/ui/core/library"
],function(Core, Library) {
	"use strict";

	sap.ui.getCore().initLibrary({
		name : "com.pepsico.core",
		noLibraryCSS: true,
		dependencies : [
			"sap.ui.core"
		],
		types: [],
		interfaces: [],
		controls: [],
		elements: [
		],
		version: "0.1.0"
	});

	return com.pesico.core;

}, /* bExport= */ false);