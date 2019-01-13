
// TEXT INFO THAT IS USED FOR MULTIPLE ITEMS
var reText = {
	tabs: " <br><br>You can nest TabbedPanels by inserting them inside a Tab item. <br><br>Visible tabs are selected on export (WYSIWYG)."
}

var item = {};
item.list = {};

item.list.dialog = function( params ) {
	
	var obj = {
		type: 'Dialog',
		parent: true,
		defaultStyle: {
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
			text: 'StaticText',
			justify: 'left',
			preferredSize: [0,0],
			alignment: null
		},
		previewHtml:
			'<div class="static-text" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
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
			text: 'EditText',
			// justify: 'left',
			preferredSize: [0,0],
			alignment: null
		},
		previewHtml:
			'<div class="edit-text" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<span class="edit-text-inner-wrap"><span class="text-container" contenteditable="true">'+ params.type +'</span></span>' +
			'</div>'
	};
	
	return obj;
	
};

item.list.button = function( params ) {
	
	var obj = {
		type: 'Button',
		addPanelIconClass: 'fas fa-toggle-on',
		defaultStyle: {
			text: 'Button',
			justify: 'center',
			preferredSize: [0,0],
			alignment: null
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
		defaultStyle: false,
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
			text: 'Checkbox',
			preferredSize: [0,0],
			alignment: null
		},
		previewHtml:
			'<div class="checkbox" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="radiocheck checkbox"><i class="fas fa-check"></i></i></div>' +
				'<label contenteditable="true">'+ params.type +'</label>' +
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
			text: 'RadioButton',
			preferredSize: [0,0],
			alignment: null
		},
		previewHtml:
			'<div class="radiobutton" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="radiocheck radiobutton"><i class="fas fa-circle"></i></div>' +
				'<label contenteditable="true">'+ params.type +'</label>' +
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
			text: 'DropDownList',
			listItems: "Item 1, -, Item 2",
			preferredSize: [0,0],
			alignment: null,
			selection: 0
		},
		previewHtml:
			'<div class="dropdownlist" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<label contenteditable="true">'+ params.type +'</label>' +
				'<div class="drop-list-wrap">' +
					'<div class="items">' +
						'<div class="selected">Item 1</div>' +
						'<div>-</div>' +
						'<div>Item 2</div>' +
					'</div>' +
					'<div class="arrow">' +
						'<i class="fas fa-chevron-down"></i>' +
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
		defaultStyle: false,
		stylePropInfo: "This item doesn't have any adjustable properties.",
		editInfo: "Export outputs a static range from 0 to 100 with current value of 50 every single time.",
		previewHtml: '<div class="slider"><input type="range" min="0" max="100" value="" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'"  data-item-parent-id="'+ params.parentId +'"></div>'
	};
	
	return obj;
	
};

item.list.listbox = function( params ) {
	
	var obj = {
		type: 'ListBox',
		addPanelIconClass: 'fas fa-list-alt',
		editInfo: 'You can select item(s) in the dialog preview. <br><br> If you select multiple items, <code>multiline</code> property will be added on export.',
		defaultStyle: {
			listItems: "Item 1, Item 2",
			preferredSize: [0,0],
			alignment: null
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

item.list.tabbedpanel = function( params ) {
	
	var obj = {
		type: 'TabbedPanel',
		parent: true,
		addPanelDivider: 'above',
		addPanelIconClass: 'fas fa-folder',
		editInfo: '<strong>Valid child item:</strong> <br><i class="far fa-folder"></i> Tab.' + reText.tabs,
		defaultStyle: {
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
		editInfo: "Can only be placed inside <br><i class='fas fa-folder'></i> TabbedPanel." + reText.tabs,
		defaultStyle: {
			text: 'Tab',
			preferredSize: [0,0],
			margins: 10,
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
		editInfo: '<strong>Valid child item:</strong> <br> <i class="fas fa-leaf"></i> TreeItem. <br><br>You can expand or collapse these items in the dialog preview by clicking the arrows.',
		defaultStyle: {
			text: 'TreeItem'
		},
		previewHtml:
			'<div class="tree-view-item" data-parent="true" data-item-type="'+ params.type +'" data-item-id="'+ params.id +'" data-item-parent-id="'+ params.parentId +'">' +
				'<div class="item-wrap">' +
					'<span class="tree-view-arrow"><i class="fas fa-chevron-right"></i></span>' +
					'<span class="text-container" contenteditable="true">' +
						params.type +
					'</span>' +
				'</div>' +
				'<div class="padding-box">' +
				'</div>' +
			'</div>'
	};
	
	return obj;
	
};
