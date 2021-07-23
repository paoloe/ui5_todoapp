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
			var x = this.byId("form");
			var y = x.getControlsByFieldGroupId("inputs").filter(isInput);
			y.forEach(function(oValue, i){
				var test = oValue.lastValue;
			});
			// yourDataModel.data.push({"name":"james","last name":"ruler"});
			this.oActModel = oOwnerComponent.getModel();
			this.oActModel.data.push({	"ItemId": "a5", 
										"Category": "c1", 
										"Selected": true, 
										"Action": "Add check box", 
										"Description": "You can add more text here for additional notes 1",
										"DateSet": "28/06/2021",
										"DateDue": "01/07/2021"});

			// "ItemId": "a1",
			// "Category": "c1",
			// "Selected": true,
			// "Action": "Add check box",
			// "Description": "You can add more text here for additional notes 1",
			// "DateSet": "28/06/2021",
			// "DateDue": "01/07/2021"
		},

		onOpenDialog: function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "tdapp.view.fragment.AddAction",
					controller : this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		onDialogCancelPress: function() {
			this.byId("AddActionDialog").close();
		},

	});
});