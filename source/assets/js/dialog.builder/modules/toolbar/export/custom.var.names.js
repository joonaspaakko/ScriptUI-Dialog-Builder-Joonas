
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
					var typeNameCounter = customVar.counters[ itemData.type ];
					customVar.names[ id ] = customVar.customType( itemData.type ).toLowerCase() + (itemData.id == 0 ? '' : typeNameCounter);
				}
				
			});
			
		}
	},
	
	// Automatic naming is based on item types.
	// Some types could be better (shorter), so here's the chance to customize them.
	customType: function( type) {
		
		var result;
		switch ( type ) {
			case "dropdownlist":
				result = 'dropdown';
				break;
			case "tabbedpanel":
				result = 'tpanel';
				break;
			default:
				result = type;
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
