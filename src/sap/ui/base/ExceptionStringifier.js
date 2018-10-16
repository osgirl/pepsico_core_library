sap.ui.define([
	"com/pepsico/core/sap/ui/base/RuntimeException"
], function(RuntimeException) {
	"use strict";

	return {
		stringify: function(oException) {
			if (!oException)
				return "";
<<<<<<< HEAD
			if (oException instanceof com.pepsico.core.sap.ui.base.RuntimeException) {
				return oException.toString();
			} else if (oException instanceof Error) {
				return oException.toString() + "\n" + oException.stack;
=======
			if (oException instanceof RuntimeException) {
				return oException.toString();
			} else if (oException instanceof Error) {
				return oException.toString();
>>>>>>> branch 'master' of https://github.com/ysokol/pepsico_core_library.git
			} else if (typeof oException === "object"){
				return JSON.stringify(oException, null, 4);
			} else if (typeof oException === "string"){
				return oException;
			} else {
				return "Uncknown object '" + oException + "'";
			}
		}
	};
});
