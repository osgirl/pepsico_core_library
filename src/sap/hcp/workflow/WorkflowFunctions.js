sap.ui.define([
	"sap/ui/base/Object",
	"com/pepsico/core/sap/hcp/workflow/WorkflowException"
], function(Object, WorkflowException) {
	"use strict";
	return {
		getTaskDetails: function(sTaskId) {
			var that = this;
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: "/bpmworkflowruntime/rest/v1/task-instances/" + sTaskId,
					method: "GET",
					async: true,
					success: function(oResult, sStatus, oXhr) {
						resolve(oResult);
					},
					error: function(oXHR, sTextStatus, sErrorThrown) {
						reject(new WorkflowException({sMessage: ""}));
					}

				});
			});
		},
		getTaskContext: function(sTaskId) {
			var that = this;
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: "/bpmworkflowruntime/rest/v1/task-instances/" + sTaskId + "/context",
					method: "GET",
					async: true,
					success: function(oResult, sStatus, oXhr) {
						resolve(oResult);
					},
					error: function(oXHR, sTextStatus, sErrorThrown) {
						reject(new WorkflowException({sMessage: ""}));
					}

				});
			});
		},
		completeTask: function(sTaskId) {
			var that = this;
			return that._fetchToken()
				.then(sToken => new Promise(function(resolve, reject) {
					$.ajax({
						url: "/bpmworkflowruntime/rest/v1/task-instances/" + sTaskId,
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
							reject(new WorkflowException({sMessage: ""}));
						}

					});
				}));
		},
		patchContext: function(sWorkflowInstanceId, oContext) {
			var that = this;
			return that._fetchToken()
				.then(sToken => new Promise(function(resolve, reject) {
					$.ajax({
						url: "/bpmworkflowruntime/rest/v1/workflow-instances/" + sWorkflowInstanceId + "/context",
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
							reject(new WorkflowException({sMessage: ""}));
						}
					});
				}));
		},
		startInstance: function(sWorkflowId, oContext) {
			var that = this;
			return that._fetchToken()
				.then(sToken => new Promise(function(resolve, reject) {
					$.ajax({
						url: "/bpmworkflowruntime/rest/v1/workflow-instances",
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
							reject(new WorkflowException({sMessage: ""}));
						}
					});
				}));
		},
		_fetchToken: function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: "/bpmworkflowruntime/rest/v1/xsrf-token",
					method: "GET",
					async: true,
					headers: {
						"X-CSRF-Token": "Fetch"
					},
					success: function(result, xhr, data) {
						resolve(data.getResponseHeader("X-CSRF-Token"));
					},
					error: function(oXHR, sTextStatus, sErrorThrown) {
						reject(new WorkflowException({sMessage: ""}));
					}
				});
			});
		}
	};
});