
// @codekit-append "get.values.js";
// @codekit-append "set.values.js";

item.update = {};
item.update.style = {};

item.update.style.localStorage = function( prop, data ) {
	
	var val = item.update.get_values( data.items['item-' + data.activeId], prop );
	
	// Not super proud of how I handled this...
	var editPanel = $('#panel-edit-style-wrap');
	var _this = editPanel.find('[data-edit^="'+ prop +'"]');
	if ( _this.closest('.creation-props-inner-wrap').length > 0 ) {
		data.items[ 'item-' + data.activeId ].style.creationProps[ prop ] = val[ prop ];
	}
	else {
		data.items[ 'item-' + data.activeId ].style[ prop ] = val[ prop ];
	}
		
	local_storage.set('dialog', data );
	return data; // Changed data is force fed to the two functions below
	
};

item.update.style.treeView = function( prop, data, dataItem ) {
	
	if ( prop === 'varName' || prop === 'text' || prop === 'all' ) {
		var text   = dataItem.style.text;
		var textItem = $('#panel-tree-view-wrap [data-item-id="'+ dataItem.id +'"] > .item-text');
		var type = dataItem.type;
		var trimmedText = text === undefined ? type : text.trim();
		customVar.init();
		
		var customName = customVar.names[ dataItem.id ];
		if ( customName ) {
			var customCompare = customName.toLowerCase();
			if ( !customName ) {
				customCompare = customCompare.replace(/\d+$/, '');
			}
			textItem.html( (customCompare === trimmedText.toLowerCase() ) ? customName : '<span class="type">' + customName + (text ? ':' : '') + '</span> ' + (text ? '<span class="txt">' + text + '</span>' : '') );
		}
		else {
			textItem.html( (type.toLowerCase() === trimmedText.toLowerCase() ) ? type : '<span class="type">' + type + ':</span> ' + '<span class="txt">' + text + '</span>' );
		}
		
		// Structure panel item icons
		// var iconClass = item.list[ type.toLowerCase() ](false).addPanelIconClass;
		// $('<i class="structure-item-icon '+ iconClass +'"></i>').prependTo( textItem );
		
	}
		
};

item.update.style.treeViewAll = function( data ) {
	
	$.each(data.order, function( i, id ) {
		item.update.style.treeView( 'varName', data, data.items[ 'item-' + id ] );
	});
	
};

item.update.style.dialogPreview = function( prop, data, dataItem, event ) {
	
	var params = {
		property: prop,
		value: dataItem.style[ prop ],
		data: data,
		dataItem: dataItem,
		event: event
	};
	
	// prop: 'all' is used when items are first created. After that the properties are edited individually.
	if ( prop === 'all' ) {
		$.each( dataItem.style, function(key, val) {
			params.property = key;
			params.value = val;
			item.update.set_values( params );
		});
	}
	else {
		item.update.set_values( params );
	}
	
};

item.update.order = function() {
	
	// Read old data from local storage....
	var data = local_storage.get('dialog');
	// Update order by re-recoding the id's of every single item currently in the tree view
	data.order = item.get.order();
	// Write back to local storage...
	local_storage.set('dialog', data );
	
};
