
var viewentry = {

	publicValues : {
		index : 0,
		noOfEntries : 0,
		columnName : "",
	},

	calcTotal : function (maxEntries, fieldName) {
		var totalAmt = 0.0
		for (var i = 0; i<maxEntries; i++) {
			var el = dsxcommon.getObject(fieldName + i.toString())
			if (el != null) {
				amt = parseFloat(el.value.replace(dsxcommon.regex.notCurrency,''))
				totalAmt += amt
			}
		}
		totalAmt = dsxcommon.roundNumber(totalAmt, 2)
		return totalAmt
	},

	validateCalculateAndShowTotal : function(e) {
		dsxvalidator.currencyValidate(e)
		var el = dsxcommon.getSource(e)
		var amount = parseFloat(el.value.replace(dsxcommon.regex.notCurrency,''))
		var fieldName = el.id + ".hidden"
		viewentry.getColumNameAndIndex(fieldName)
		dsxcommon.getObject(fieldName).value = amount
		var totalAmt = viewentry.calcTotal(viewentry.publicValues.noOfEntries, viewentry.publicValues.columnName)
		var s = String(totalAmt)
		var hiddenTotalEl = dsxcommon.getObject("totals" + viewentry.publicValues.index.toString())
		var displayTotalEl = dsxcommon.getObject("totalsID" + viewentry.publicValues.index.toString())
		hiddenTotalEl.value = totalAmt
		displayTotalEl.innerHTML = dsxcommon.addCommasDouble(s)
	},

	validate4DecCalculateAndShowTotal : function(e) {
		dsxvalidator.fourDecimalValidate(e)
		var el = dsxcommon.getSource(e)
		var amount = parseFloat(el.value.replace(dsxcommon.regex.notCurrency,''))
		var fieldName = el.id + ".hidden"
		viewentry.getColumNameAndIndex(fieldName)
		dsxcommon.getObject(fieldName).value = amount
		var totalAmt = viewentry.calcTotal(viewentry.publicValues.noOfEntries, viewentry.publicValues.columnName)
		var s = String(totalAmt)
		var hiddenTotalEl = dsxcommon.getObject("totals" + viewentry.publicValues.index.toString())
		var displayTotalEl = dsxcommon.getObject("totalsID" + viewentry.publicValues.index.toString())
		hiddenTotalEl.value = totalAmt
		displayTotalEl.innerHTML = dsxcommon.addCommasDouble(s)
	},

	validateInteger : function(e) {
		var t = dsxcommon.getSource(e)
		var validValue = dsxcommon.regex.isInteger.test(t.value)
		if (!validValue) {
			t.value = "0"
		}
		var fieldName = t.id + ".hidden"
		dsxcommon.getObject(fieldName).value = t.value
	},

	getColumNameAndIndex : function (fieldName) {
		var a = fieldName.split(/\d/)
		viewentry.publicValues.columnName = a[0]
		var c = dsxcommon.getObject("columnNames").value
		var c1 = c.replace('[','')
		var c2 = c1.replace(']','')
		var c3 = c2.split(', ')
		viewentry.publicValues.index = 0
		for (var i=0; i<c3.length; i++) {
			if (c3[i] == viewentry.publicValues.columnName) {
				viewentry.publicValues.index = i
			}
		}
	},

	init : function() {
		//set autocomplete to off for all input tags
		var inputElements = document.getElementsByTagName("input");
		for (i in inputElements) {
			el = inputElements[i];
			if (el.className && (el.className.indexOf("inputbox") != -1) && (!el.disabled)) {
				el.setAttribute("autocomplete","off");
			} //if current input element has the inputbox class set.
		}

		//dsxvalidator.init()
		var displayTotals = dsxcommon.getObject("displayTotals").value
		var withTotals = dsxcommon.getArray(dsxcommon.getObject("withTotals").value)
		var columnNames = dsxcommon.getArray(dsxcommon.getObject("columnNames").value)
		var columnTypes = dsxcommon.getArray(dsxcommon.getObject("columnTypes").value)
		var maxEntries = dsxcommon.getObject("maxEntries").value
		var maxColumns = dsxcommon.getObject("maxColumns").value
		//alert("displayTotals: " + displayTotals + " maxEntries: " + maxEntries + " maxColumns: " + maxColumns + " withTotals: " + withTotals + " columnNames: " + columnNames + " columnTypes: " + columnTypes)

		//define the property for the number of entries
		viewentry.publicValues.noOfEntries = maxEntries;

		for (var i=0; i<maxColumns; i++) {
			//add events to text boxes
			if (columnTypes[i].substring(0,4) == "Text") {
				var types = columnTypes[i].split("-")
				if (types.length > 1) {
					if (types[1] == "Double") {
						//alert("reached here - i: " + i + ", columnType: " + columnTypes[i])
						for (var j=0; j<maxEntries; j++) {
							var fieldname = columnNames[i] + j.toString()
							var el = dsxcommon.getObject(fieldname)
							if (el != null) {
								el.style.textAlign = "right"
								dsxcommon.addEvent(el, dsxvalidator.currencyInit, "load")
								dsxcommon.addEvent(el, dsxvalidator.currencyInit, "focus")
								dsxcommon.addEvent(el, dsxvalidator.currencyKeypressed, "keyup")
								if (withTotals[i] == "Y") {
									//define the public properties for index and columnName
									viewentry.publicValues.index = i;
									viewentry.publicValues.columnName = columnNames[i];
									dsxcommon.addEvent(el, viewentry.validateCalculateAndShowTotal, "blur")
								}
								else {
									dsxcommon.addEvent(el, dsxvalidator.currencyValidate, "blur")
								}
							}
						}
					}
					else if (types[1] == "4Dec") {
						//alert("reached here - i: " + i + ", columnType: " + columnTypes[i])
						for (var j=0; j<maxEntries; j++) {
							var fieldname = columnNames[i] + j.toString()
							var el = dsxcommon.getObject(fieldname)
							if (el != null) {
								el.style.textAlign = "right"
								dsxcommon.addEvent(el, dsxvalidator.fourDecimalInit, "load")
								dsxcommon.addEvent(el, dsxvalidator.fourDecimalInit, "focus")
								dsxcommon.addEvent(el, dsxvalidator.fourDecimalKeypressed, "keyup")
								dsxcommon.addEvent(el, dsxvalidator.fourDecimalValidate, "blur")
							}
						}
					}
					else if (types[1] == "Int") {
						//alert("reached here - i: " + i + ", columnType: " + columnTypes[i])
						for (var j=0; j<maxEntries; j++) {
							var fieldname = columnNames[i] + j.toString()
							var el = dsxcommon.getObject(fieldname)
							if (el != null) {
									dsxcommon.addEvent(el, dsxvalidator.integerInit, "load")
									dsxcommon.addEvent(el, dsxvalidator.integerInit, "focus")
									dsxcommon.addEvent(el, dsxvalidator.integerKeypressed, "keyup")
									dsxcommon.addEvent(el, viewentry.validateInteger, "blur")
							}
						}
					}
					else {
						if (types[1] == "Date") {
							for (var j=0; j<maxEntries; j++) {
								var fieldname = columnNames[i] + j.toString()
								var el = dsxcommon.getObject(fieldname)
								if (el != null) {
									dsxcommon.addEvent(el, dsxvalidator.dateInit, "load")
									dsxcommon.addEvent(el, dsxvalidator.dateInit, "focus")
									dsxcommon.addEvent(el, dsxvalidator.dateKeypressed, "keyup")
									dsxcommon.addEvent(el, dsxvalidator.dateValidate, "blur")
								}
							}
						}
					}
				}
			}
		}
	}
}
