sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("tdapp.controller.extension.AddFlightDialog", {
		onDialogAddPress: function () {
			// don't actually know what the below is doing?...
			const isInput = control => control.isA("sap.m.InputBase");
			var aFormInput = this.byId("form").getControlsByFieldGroupId("inputs").filter(isInput);
			this.oActModel = oOwnerComponent.getModel();
			
			aFormInput.forEach(function(oInputElement, i){
				var test = oInputElement.lastValue;
			});
			
			this.oActModel.data.push({	"ItemId": "a5", 
										"Category": "c1", 
										"Selected": true, 
										"Action": "Add check box", 
										"Description": "You can add more text here for additional notes 1",
										"DateSet": "28/06/2021",
										"DateDue": "01/07/2021"});							
		},

		onDialogCancelPress: function() {
			this.byId("AddActionDialog").close();
		},

	});
});