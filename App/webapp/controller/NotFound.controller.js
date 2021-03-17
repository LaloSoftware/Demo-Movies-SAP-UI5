sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("ns.App.controller.NotFound", {

		onNavBack : function () {
			UIComponent.getRouterFor(this).navTo("Home");
		}

	});

});