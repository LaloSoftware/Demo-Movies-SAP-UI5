sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "../model/formatter",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/core/UIComponent"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, formatter, Filter, FilterOperator, UIComponent) {
		"use strict";

		return Controller.extend("ns.App.controller.main", {
            formatter: formatter,
			onInit: function () {

			},
            onPress: function (sValue) {
                sap.ui.require(["sap/m/MessageToast"], function (oMessage) {
                    var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                        oMessage.show(oResourceBundle.getText("search") + sValue
                    );
                }.bind(this));
                var sCity = this.byId('city').getValue(),
                sGenre = this.byId('genre').getSelectedItem().getKey(),
                oCalendar = this.byId("calendar"),
                oRowBinding = oCalendar.getBinding("rows"), oFilterGenre, oFilterCity;
                // Create filters for genre and city according to user inputs
                oFilterGenre = sGenre ? new Filter("genre", FilterOperator.EQ, sGenre) : null;
                oFilterCity = sCity ? new Filter("info", FilterOperator.Contains, sCity) : null;
                // Apply genre filter to calendar rows
                oRowBinding.filter(oFilterGenre);
                // Apply city filter to row appointments
                var aRows = oCalendar.getAggregation("rows");
                aRows.forEach(function (oItem) {
                    var oAppointmentsBinding = oItem.getBinding("appointments");
                    oAppointmentsBinding.filter(oFilterCity);
                });
            },
            onAppointmentSelect: function (oAppointment) {
                var oContext = oAppointment.getBindingContext("movies"), sPath = oContext.getPath();
                var aParameters = sPath.split("/");
                UIComponent.getRouterFor(this).navTo("Detail", {
                    movieId: aParameters[2],
                    appointmentId: aParameters[4]
                });
            }
		});
    }
);