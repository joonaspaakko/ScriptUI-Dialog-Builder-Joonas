
// TEXT INFO THAT IS USED FOR MULTIPLE ITEMS
var reText = {
	tabs: " <br><br>You can nest VerticalTabbedPanels and TabbedPanels by inserting them inside a Tab item. <br><br>Visible tabs are selected on export (WYSIWYG).",
  images: "Image formats: <code>jpg, png</code><br><br> Images are never uploaded to any server, they are stored locally in your browser.<br><br> Resize images before adding them to the dialog.<br><br> I would recommend small icon sizes. Any number of images will bump up the script file size quite a bit so you should use minimal amount of images. <br><br><strong class='warning'><span>Warning:</span> Photoshop CC 2015-219</strong> For some reason JPEG files don't work in some PS versions. PNG files seem to work fine.<br>"
}

var item = {};
item.list = {};

item.list.dialog = function( params ) {
	
	var obj = {
		type: 'Dialog',
		parent: true,
		addPanelIconClass: 'fas fa-comment-alt',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			windowType: 'Dialog',
			creationProps: {
				su1PanelCoordinates: false,
				maximizeButton: false,
				minimizeButton: false,
				independent: false,
				closeButton: true,
				borderless: false,
				resizeable: false
			},
			text: 'Dialog',
			preferredSize: [0,0],
			margins: 16,
			orientation: 'column',
			spacing: 10,
			alignChildren: ['center','top']
		},
		previewHtml:
			'<div id="dialog-container" data-parent="true" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
			'<div id="dialog-title-bar"><div contenteditable="true">'+ params.type +'</div></div>' +
				'<div class="padding-box">' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.group = function( params ) {
	
	var obj = {
		type: 'Group',
		parent: true,
		addPanelIconClass: 'fas fa-object-group',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			preferredSize: [0,0],
			margins: 0,
			orientation: 'row',
			spacing: 10,
			alignChildren: ['left','center'],
			alignment: null
		},
		previewHtml:
			'<div class="group" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="padding-box">' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.panel = function( params ) {
	
	var obj = {
		type: 'Panel',
		parent: true,
		addPanelDivider: 'below',
		addPanelIconClass: 'fas fa-columns',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			creationProps: {
				borderStyle: 'etched', // black, etched, gray, raised, sunken
				su1PanelCoordinates: false
			},
			text: 'Panel',
			preferredSize: [0,0],
			margins: 10,
			orientation: 'column',
			spacing: 10,
			alignChildren: ['left','top'],
			alignment: null
		},
		previewHtml:
			'<div class="panel" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<span class="title" contenteditable="true">'+ params.type +'</span>' +
				'<div class="padding-box">'+
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.statictext = function( params ) {

	var obj = {
		type: 'StaticText',
		addPanelIconClass: 'fas fa-font',
		multiline: true,
		editInfo: 'This item supports multiline text. <br><br>Due to issues with ScriptUI multiline text, the code export will not output "true" multiline. <br><br>Instead, multiline <code>statictext</code> will be sliced and diced into several <code>statictext</code> and put inside a <code>group</code>.',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			creationProps: {
				truncate: 'none', // 'middle', 'end'
				multiline: false,
				scrolling: false
			},
      softWrap: false,
			text: 'StaticText',
			justify: 'left',
			preferredSize: [0,0],
			alignment: null,
			helpTip: null
		},
		previewHtml:
			'<div class="static-text disable-soft-wrap" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<span class="text-container" contenteditable="true">'+ params.type +'</span>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.edittext = function( params ) {
	
	var obj = {
		type: 'EditText',
		addPanelIconClass: 'fas fa-i-cursor',
		multiline: true,
		editInfo: "This item supports multiline text. <br><br>Multiline text flow may differ drastically from ScriptUI.",
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			creationProps: {
				noecho: false,
				readonly: false,
				multiline: false,
				scrollable: false,
				borderless: false,
				enterKeySignalsOnChange: false
			},
      softWrap: false,
			text: 'EditText',
			justify: 'left',
			preferredSize: [0,0],
			alignment: null,
			helpTip: null
		},
		previewHtml:
			'<div class="edit-text disable-soft-wrap" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<span class="edit-text-inner-wrap"><span class="text-container edittext-text-cont" contenteditable="true">'+ params.type +'</span></span>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.button = function( params ) {
	
	var obj = {
		type: 'Button',
		addPanelIconClass: 'fas fa-toggle-on',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			text: 'Button',
			justify: 'center',
			preferredSize: [0,0],
			alignment: null,
			helpTip: null
		},
		previewHtml:
			'<div class="button" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="button-border">' +
					'<span class="text-container" contenteditable="true">'+
						params.type +
					'</span>' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.divider = function( params ) {
	
	var obj = {
		type: 'Divider',
		addPanelIconClass: 'fas fa-strikethrough',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null
		},
		stylePropInfo: "This item doesn't have any adjustable properties.",
		editInfo: "Divider orientation is locked to the parent item orientation.",
		previewHtml:
			'<div class="panel divider-line" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="padding-box">'+
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.checkbox = function( params ) {
	
	var obj = {
		type: 'Checkbox',
		addPanelIconClass: 'fas fa-check-square',
		editInfo: 'You can check the checkbox in the dialog preview.',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			text: 'Checkbox',
			preferredSize: [0,0],
			alignment: null,
			helpTip: null
		},
		previewHtml:
			'<div class="checkbox" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="radiocheck checkbox">' +
					'\n<svg class="font-awesome-check" enable-background="new 0 0 512 381.8" viewBox="0 0 512 381.8" xmlns="http://www.w3.org/2000/svg"><path d="m173.9 374.3-166.4-166.4c-10-10-10-26.2 0-36.2l36.2-36.2c10-10 26.2-10 36.2 0l112.1 112.1 240.1-240.1c10-10 26.2-10 36.2 0l36.2 36.2c10 10 10 26.2 0 36.2l-294.4 294.4c-10 10-26.2 10-36.2 0z" fill="#535353"/></svg>\n' +
				'</div>' +
				'\n<label contenteditable="true">'+ params.type +'</label>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.radiobutton = function( params ) {
	
	var obj = {
		type: 'RadioButton',
		addPanelIconClass: 'fas fa-dot-circle',
		editInfo: "You can check the radiobutton in the dialog preview. <br><br> Radiobuttons are split into different groups if there is a different type of item between them.",
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			text: 'RadioButton',
			preferredSize: [0,0],
			alignment: null,
			helpTip: null
		},
		previewHtml:
			'<div class="radiobutton" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="radiocheck radiobutton">' +
					'\n<svg class="font-awesome-circle" enable-background="new 0 0 496 496" viewBox="0 0 496 496" xmlns="http://www.w3.org/2000/svg"><path d="m248 0c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248z" fill="#535353"/></svg>\n' +
				'</div>' +
				'\n<label contenteditable="true">'+ params.type +'</label>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.dropdownlist = function( params ) {
	
	var obj = {
		type: 'DropDownList',
		addPanelIconClass: 'fas fa-caret-square-down',
		editInfo: 'You can select a dropdown item in the dialog preview. <br><br>You can make a divider by adding an item that is a single dash character: <code>-</code>.',
		defaultStyle: {
			// exportItems: true,
			// visible: true,
			enabled: true,
			varName: null,
			text: 'DropDownList',
			listItems: "Item 1, -, Item 2",
			preferredSize: [0,0],
			alignment: null,
			selection: 0,
			helpTip: null
		},
		previewHtml:
			'<div class="dropdownlist" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="drop-list-wrap">' +
					'<div class="items">' +
						'<div class="selected">Item 1</div>' +
						'<div>-</div>' +
						'<div>Item 2</div>' +
					'</div>' +
					'<div class="arrow">' +
						'\n<svg class="font-awesome-chevron-down" enable-background="new 0 0 436.7 265" viewBox="0 0 436.7 265" xmlns="http://www.w3.org/2000/svg"><path d="m201.4 258-194.4-194.4c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0l154.7 154 154.8-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9l-194.4 194.4c-9.4 9.4-24.6 9.4-33.9 0z" fill="#d6d6d6"/></svg>\n' +
					'</div>' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.slider = function( params ) {
	
	var obj = {
		type: 'Slider',
		addPanelIconClass: 'fas fa-sliders-h',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			preferredSize: [0,0],
			alignment: null,
			helpTip: null
		},
		stylePropInfo: "This item doesn't have any adjustable properties.",
		editInfo: "Export outputs a static range from 0 to 100 with current value of 50 every single time.",
		previewHtml:
			'<div class="slider" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<input type="range" min="0" max="100" value="" />' +
			'</div>'
	};
	
	return obj;
	
};

item.list.listbox = function( params ) {
	
	var obj = {
		type: 'ListBox',
		addPanelIconClass: 'fas fa-list-alt',
		editInfo: 'You can select item(s) in the dialog preview. <br><br> If you select multiple items, <code>multiline</code> property will be added on export.',
		defaultStyle: {
			// exportItems: true,
			// visible: true,
			enabled: true,
			varName: null,
			creationProps: {
				multiselect: false,
				numberOfColumns: 1,
				columnWidths: '[]',
				columnTitles: '[]',
				showHeaders: false
			},
			listItems: "Item 1, Item 2",
			preferredSize: [0,0],
			alignment: null,
			helpTip: null
		},
		previewHtml:
			'<div class="list-box" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="inner-wrap">' +
					'<ul>' +
						'<li>'+
							'<span>Item 1</span>' +
						'</li>' +
						'<li>'+
							'<span>Item 2</span>' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};


item.list.image = function( params ) {
	var obj = {
		type: 'Image',
		addPanelIconClass: 'fas fa-image',
		editInfo: reText.images,
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			image: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQdJREFUeNrslv0NgyAQxcV0AEZwBEdoN3AEu0E7iSN0hW6gG9gRuoFuQB8NtGg9QSL4R33JixcUf3zcEZiAkg2UJhvpYMRX+BGYl8PVOxJfHV164rsc5j5UydCwdEGnAu4QtnCH+OY7AOcZ410moeJXVegZFzAn2jfJah4afF/Yvg6YMfbE4wz3RnOjSjBcchnfcpUgWbRyUjPv4UatgDmYWtZ3tORSdVzDcrUWwVPLjyu4tEBzI8Pd4dQeq5NJq5zY61ZMq6Pg5h5PgkfQAdwCnYXPggmo1sUBSsJJsAXqowGcArcijD5wE8wiXX3kiXfSmR/z6jMuvYT93WVvB+/gHbyaXgIMAHWCmD3KjfSwAAAAAElFTkSuQmCC"
			],
			alignment: null,
			helpTip: null
		},
		previewHtml:
			'<div class="image-item" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<img src="" alt="" />' +
			'</div>'
	};
	
	return obj;
	
};

item.list.iconbutton = function( params ) {
	var obj = {
		type: 'IconButton',
		addPanelIconClass: 'fas fa-times-circle',
    editInfo: reText.images,
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			text: 'IconButton',
			preferredSize: [0,0],
			creationProps: {
				style: 'toolbutton', // 'button'
				toggle: false
			},
			iconButtonStroke: false,
			image: [
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAwRDg1RUYzRkFBMTFFOTk3MzFGMDEyRjUzNjA4NTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjAwRDg1RjAzRkFBMTFFOTk3MzFGMDEyRjUzNjA4NTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDBEODVFRDNGQUExMUU5OTczMUYwMTJGNTM2MDg1MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MDBEODVFRTNGQUExMUU5OTczMUYwMTJGNTM2MDg1MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhJ5d1kAAAIwSURBVHjarJQ9S1tRGMefnHvJktxC5TZxCVTikKUWYjpUY7+AFFpw76QObhbrN2h0qEPdmqlUnDqUFjcdNNS5taGTYjAmaBrsNYaCIUn7/1/OCZcQh4IP/OCc87zc87ycG5qbn5cB4oARMAqG9NkFOATH4Krfwe7b3wEPwTSYAck+/RH4CLbAd9AYFOgueApWbdsenpyYkAdjY3LPdX3lr3pdfhwcJL/u7y+32+0XOFoGX8Bv6kM6Nd7kGXifSCRkbnZWYrHYoJSlVqvJu3xeyuUytwz4iTdTWs90Vhnk1dLSjUEo1NGGtvTRvqJ0YaeZDm8SDod7X64jHSNcn+OMQhva0kfX01G6OzOsibkJg7zO5SS3siLVatWH6xzOTDDa0kc3ZcTWLU6ysEaUUmJZljSbTXmztuafcR2NRsVSqmdHn929PXZ2VJk5Md2huFi/XFz0HRGgRLjmmRuwC/gMKbklUXpi/TkJFpYp6XTuE5NmsAEBnwulx/4Iw9Yz6Ha70ul0xKRj0uRZBzoj2ofTfmiNZzJ/WJZKpZJ9lMlIJBLxSafT8mRqSuLxuDiOI+PYT2azEg909sPGBj+ax/az0g9wC2N/xolttVq99rp9DTBBaENb+uh3d8UbUeeB00aj8bxYLEoqlfJvddMTebu+bp7IAtgF1ybQNTgBPxHscaFQiF56iB0KyV/UhIU+LpVkZ3vbT8fzvDMdhI/2Mvhob/U3IlpRAN/A5v/82P4JMAC5N/hnHN2zDwAAAABJRU5ErkJggg=="
			],
			alignment: null,
			helpTip: null
		},
		previewHtml:
			'<div class="icon-button" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="inner-wrap">' +
					'<span class="text-container" contenteditable="true">'+
						params.type +
					'</span>' +
					'<img src="" alt="" />' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.progressbar = function( params ) {
	
	var obj = {
		type: 'Progressbar',
		addPanelIconClass: 'fas fa-percentage',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			preferredSize: [50,4],
			alignment: null,
			helpTip: null
		},
		stylePropInfo: "This item doesn't have any adjustable properties.",
		editInfo: "Export outputs a static value.",
		previewHtml:
			'<div class="progress-bar" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div>' +
					'<div class="progress-indicator"></div>' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.verticaltabbedpanel = function( params ) {
	
	var obj = {
		type: 'VerticalTabbedPanel',
		parent: true,
		addPanelDivider: 'above',
		addPanelIconClass: 'fas fa-bars',
		editInfo: '<strong>Valid child item:</strong> <br><i class="far fa-folder"></i> Tab.' + reText.tabs,
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			preferredSize: [0,0],
			tabNavWidth: 0,
			margins: 0,
			alignment: null
		},
		previewHtml:
			'<div class="group vertical-tabbed-panel orientation-row align-children-horizontal-left align-children-vertical-top" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="tab-container">' +
						'<div class="inner-wrap">' +
							'<ul></ul>' +
						'</div>' +
				'</div>' +
				'<div class="padding-box">' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.tabbedpanel = function( params ) {
	
	var obj = {
		type: 'TabbedPanel',
		parent: true,
		addPanelIconClass: 'fas fa-folder',
		editInfo: '<strong>Valid child item:</strong> <br><i class="far fa-folder"></i> Tab.' + reText.tabs,
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			preferredSize: [0,0],
			margins: 10,
			alignment: null
		},
		previewHtml:
			'<div class="panel tabbed-panel" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="tab-container"></div>' +
				'<div class="padding-box">' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.tab = function( params ) {
	
	var obj = {
		type: 'Tab',
		parent: true,
		addPanelDivider: 'below',
		addPanelIconClass: 'far fa-folder',
		editInfo: "Can be placed inside: <br><i class='fas fa-folder'></i> TabbedPanel, <br><i class='fas fa-bars'></i> VerticalTabbedPanel" + reText.tabs,
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			text: 'Tab',
			orientation: 'column',
			spacing: 10,
			alignChildren: ['left','top']
		},
		previewHtml:
			'<div class="panel tab" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="padding-box">' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.treeview = function( params ) {
	
	var obj = {
		type: 'TreeView',
		parent: true,
		addPanelIconClass: 'fas fa-tree',
		editInfo: '<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem.',
		defaultStyle: {
			// exportItems: true,
			// visible: true,
			enabled: true,
			varName: null,
			preferredSize: [0,0],
			alignment: null
		},
		previewHtml:
			'<div class="panel tree-view" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="padding-box">' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.treeitem = function( params ) {
	
	var obj = {
		type: 'TreeItem',
		parent: true,
		addPanelDivider: 'below',
		addPanelIconClass: 'fas fa-leaf',
		editInfo: '<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem. <br><br>You can expand or collapse these items in the dialog preview by clicking the arrows. <br><br> This item doesn&apos;t have creation properties, so unfortunately the variable name can&apos;t be used to find this item in the dialog object.',
		defaultStyle: {
			// visible: true,
			enabled: true,
			varName: null,
			text: 'TreeItem'
		},
		previewHtml:
			'<div class="tree-view-item" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="item-wrap">' +
					'\n<span class="tree-view-arrow">' +
						'\n<svg class="font-awesome-chevron-right" enable-background="new 0 0 265 436.7" viewBox="0 0 265 436.7" xmlns="http://www.w3.org/2000/svg"><path d="m258 235.3-194.4 194.4c-9.4 9.4-24.6 9.4-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.5 0-33.9l154-154.7-154-154.8c-9.3-9.4-9.3-24.5 0-33.9l22.7-22.7c9.4-9.4 24.6-9.4 33.9 0l194.4 194.4c9.4 9.3 9.4 24.5 0 33.9z" fill="#dadada"/></svg>' +
					'\n</span>' +
					'\n<span class="text-container" contenteditable="true">' +
						params.type +
					'</span>' +
				'\n</div>' +
				'<div class="padding-box">' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};
