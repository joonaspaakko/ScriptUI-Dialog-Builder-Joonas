
var customVar = {
	
	init: function() {
		var data = local_storage.get('dialog');
		customVar.counters = {};
		customVar.names = {};
		customVar.customNames = {};
		this.populate.counters( data );
		this.populate.names( data );
	},
	
	populate: {
		counters: function( data ) {
			
			$.each(data.items, function( k, itemData ) {
				if ( itemData.style.varName ) {
					customVar.counters[ itemData.style.varName ] = -1;
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
					customVar.names[ id ] = customVar.incrementNumbering( varName, varNameCounter );
					// The reason why this gets a prefix is to make sure the list stays
					// in the loop order, rather than sorted based on the id...
					// Custom names are used by reference list. This is also why this list contains named items only.
					customVar.customNames[ 'item-' + id ] = customVar.names[ id ];
				}
				else {
					var typeNameCounter = itemData.id == 0 ? '' : customVar.counters[ itemData.type ];
					var typeName = customVar.customType( itemData.type, itemData ).toLowerCase();
					customVar.names[ id ] = typeName + typeNameCounter;
				}
				
			});
			
		}
	},
	
	incrementNumbering: function( varName, varNameCounter ) {
		
		var newName = '';
		var regex = varName.match(/\d+$/);
		if ( regex ) {
			var numberStr = regex[0];
		  var numberStrLength = numberStr.length;
		  var number = parseFloat( numberStr );
			newName = varName.replace(/\d+$/, '') + pad( number + varNameCounter, numberStrLength );
		}
		else {
			newName = varName + (varNameCounter > 0 ? varNameCounter : '');
		}
		
		return newName;

		function pad(n, width, z) {
		  z = z || '0';
		  n = n + '';
		  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
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
