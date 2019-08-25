
var customVar = {
	
	init: function() {
		var data = local_storage.get('dialog');
		customVar.counters = {};
		customVar.names = {};
		this.populate.counters( data );
		this.populate.names( data );
	},
	
	populate: {
		counters: function( data ) {
			
			$.each(data.items, function( k, itemData ) {
				if ( itemData.style.varName ) {
					customVar.counters[ itemData.style.varName ] = -1
				}
				else {
					customVar.counters[ itemData.type ] = 0;
				}
			});
			
		},
		names: function( data ) {
			$.each(data.order, function( i, id ) {
				
				var itemData = data.items['item-' + id];
				customVar.update( itemData );
				
				var varName = itemData.style.varName;
				var varNameCounter = customVar.counters[ varName ];
				if ( varName ) {
					customVar.names[ id ] = varName + (varNameCounter > 0 ? varNameCounter : '');
				}
				else {
					var typeNameCounter = itemData.id == 0 ? '' : customVar.counters[ itemData.type ];
					var typeName = customVar.customType( itemData.type, itemData ).toLowerCase();
					customVar.names[ id ] = typeName + typeNameCounter;
				}
				
			});
			
		}
	},
	
	// Automatic naming is based on item types.
	// Some types could be better (shorter), so here's the chance to customize them.
	customType: function( type, itemData ) {
		var lowerCaseType = type.toLowerCase();
		var result;
		switch ( lowerCaseType ) {
			case "dropdownlist":
				result = 'dropdown';
				break;
			case "tabbedpanel":
				result = 'tpanel';
				break;
			case "dialog":
				var typeName = itemData.style.windowType.toLowerCase();
				result = (typeName == 'window' ? 'win' : typeName);
				break;
			default:
				result = lowerCaseType;
		}
		return result;
		
	},
	
	update: function( itemData ) {
		if ( itemData.style.varName ) {
			++customVar.counters[ itemData.style.varName ];
		}
		else {
			++customVar.counters[ itemData.type ];
		}
	}
	
};
