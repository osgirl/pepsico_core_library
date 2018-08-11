sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/sap/hcp/workflow/WorkflowException"
], function(Object, WorkflowException) {
	"use strict";
	return Object.extend("com.pepsico.core.sap.hcp.workflow.WorkflowService", {

		constructor: function(sWorkflowServiceUrl) {
			this._sWorkflowServiceUrl = sWorkflowServiceUrl;
		},

		getTaskDetails: function(sTaskId) {
			var that = this;
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: this._sWorkflowServiceUrl + "/task-instances/" + sTaskId,
					method: "GET",
					async: true,
					success: function(oResult, sStatus, oXhr) {
						resolve(oResult);
					},
					error: function(oXHR, sTextStatus, sErrorThrown) {
						reject(new WorkflowException({
							sMessage: "Failed getTaskDetails",
							oCausedBy: sErrorThrown
						}));
					}
				});
			});
		},

		getTaskContext: function(sTaskId) {
			var that = this;
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: this._sWorkflowServiceUrl + "/task-instances/" + sTaskId + "/context",
					method: "GET",
					async: true,
					success: function(oResult, sStatus, oXhr) {
						resolve(oResult);
					},
					error: function(oXHR, sTextStatus, sErrorThrown) {
						reject(new WorkflowException({
							sMessage: "Failed getTaskContext",
							oCausedBy: sErrorThrown
						}));
					}

				});
			});
		},

		completeTask: function(sTaskId) {
			var that = this;
			return that._fetchToken()
				.then(sToken => new Promise(function(resolve, reject) {
					$.ajax({
						url: this._sWorkflowServiceUrl + "/task-instances/" + sTaskId,
						method: "PATCH",
						contentType: "application/json",
						async: true,
						data: "{\"status\": \"COMPLETED\"}",
						headers: {
							"X-CSRF-Token": sToken
						},
						success: function(oResult, sStatus, oXhr) {
							resolve(oResult);
						},
						error: function(oXHR, sTextStatus, sErrorThrown) {
							reject(new WorkflowException({
								sMessage: "Failed completeTask",
								oCausedBy: sErrorThrown
							}));
						}

					});
				}));
		},

		patchContext: function(sWorkflowInstanceId, oContext) {
			var that = this;
			return that._fetchToken()
				.then(sToken => new Promise(function(resolve, reject) {
					$.ajax({
						url: this._sWorkflowServiceUrl + "/workflow-instances/" + sWorkflowInstanceId + "/context",
						method: "PATCH",
						contentType: "application/json",
						async: true,
						data: JSON.stringify(oContext),
						headers: {
							"X-CSRF-Token": sToken
						},
						success: function(oResult, sStatus, oXhr) {
							resolve(oResult);
						},
						error: function(oXHR, sTextStatus, sErrorThrown) {
							reject(new WorkflowException({
								sMessage: "Failed patchContext",
								oCausedBy: sErrorThrown
							}));
						}
					});
				}));
		},

		startInstance: function(sWorkflowId, oContext) {
			var that = this;
			return that._fetchToken()
				.then(sToken => new Promise(function(resolve, reject) {
					$.ajax({
						url: this._sWorkflowServiceUrl + "/workflow-instances",
						method: "POST",
						async: true,
						contentType: "application/json",
						headers: {
							"X-CSRF-Token": sToken
						},
						data: JSON.stringify({
							definitionId: sWorkflowId,
							context: oContext
						}),
						success: function(oResult, sStatus, oXhr) {
							resolve(oResult);
						},
						error: function(oXHR, sTextStatus, sErrorThrown) {
							reject(new WorkflowException({
								sMessage: "Failed startInstance",
								oCausedBy: sErrorThrown
							}));
						}
					});
				}));
		},

		_fetchToken: function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: this._sWorkflowServiceUrl + "/xsrf-token",
					method: "GET",
					async: true,
					headers: {
						"X-CSRF-Token": "Fetch"
					},
					success: function(result, xhr, data) {
						resolve(data.getResponseHeader("X-CSRF-Token"));
					},
					error: function(oXHR, sTextStatus, sErrorThrown) {
						reject(new WorkflowException({
							sMessage: "Failed _fetchToken",
							oCausedBy: sErrorThrown
						}));
					}
				});
			});
		}

	});
});