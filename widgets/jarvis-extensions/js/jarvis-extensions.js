/*
	ioBroker.vis jarvis-extensions Widget-Set

	version: "0.0.1"

	Copyright 2024 mcuiobroker mcuiobroker@gmail.com
*/
'use strict';

/* global $, vis, systemDictionary */

// add translations for edit mode
$.extend(true, systemDictionary, {
	// Add your translations here, e.g.:
	// "size": {
	// 	"en": "Size",
	// 	"de": "Größe",
	// 	"ru": "Размер",
	// 	"pt": "Tamanho",
	// 	"nl": "Grootte",
	// 	"fr": "Taille",
	// 	"it": "Dimensione",
	// 	"es": "Talla",
	// 	"pl": "Rozmiar",
	// 	"zh-cn": "尺寸"
	// }
});

// this code can be placed directly in jarvis-extensions.html
vis.binds['jarvis-extensions'] = {
	version: '0.0.1',
	showVersion: function () {
		if (vis.binds['jarvis-extensions'].version) {
			console.log('Version jarvis-extensions: ' + vis.binds['jarvis-extensions'].version);
			vis.binds['jarvis-extensions'].version = null;
		}
	},
	createWidget: function (widgetID, view, data, style) {
		const $div = $('#' + widgetID);
		// if nothing found => wait
		if (!$div.length) {
			return setTimeout(function () {
				vis.binds['jarvis-extensions'].createWidget(widgetID, view, data, style);
			}, 100);
		}

		let text = '';
		text += 'OID: ' + data.oid + '</div><br>';
		text += 'OID value: <span class="jarvis-extensions-value">' + vis.states[data.oid + '.val'] + '</span><br>';
		text += 'Color: <span style="color: ' + data.myColor + '">' + data.myColor + '</span><br>';
		text += 'extraAttr: ' + data.extraAttr + '<br>';
		text += 'Browser instance: ' + vis.instance + '<br>';
		text += 'htmlText: <textarea readonly style="width:100%">' + (data.htmlText || '') + '</textarea><br>';

		$('#' + widgetID).html(text);

		// subscribe on updates of value
		function onChange(e, newVal, oldVal) {
			console.log(oldVal);
			$div.find('.template-value').html(newVal);
		}
		if (data.oid) {
			vis.states.bind(data.oid + '.val', onChange);
			//remember bound state that vis can release if didnt needed
			$div.data('bound', [data.oid + '.val']);
			//remember onchange handler to release bound states
			$div.data('bindHandler', onChange);
		}
	},
};

vis.binds['jarvis-extensions'].showVersion();
