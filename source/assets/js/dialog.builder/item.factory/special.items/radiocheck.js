
var radiocheck = {
	
	init: function( active, id, type ) {
		
		
		var rc = this;
		var btn = active.find('.radiocheck');
		
		rc.restore( active, id, type, btn );
		
		btn.on('click', function(){
			var _this = $(this);
			var data = local_storage.get('dialog');
			var item = data.items[ 'item-' + id ];
			
			var isOn = _this.hasClass('on');
			_this[ isOn ? 'removeClass' : 'addClass' ]('on');
			var state = !isOn ? true : false;
			
			// RADIOBUTTON
			if ( _this.is('.radiobutton') ) {
				rc.radio.clearSiblings( data, _this );
				item.style.checked = state;
			}
			// CHECKBOX
			else {
				item.style.checked = state;
			}
			
			local_storage.set('dialog', data );
			
		});
		
	},
	
	restore: function( active, id, type, btn ) {
		
		var data = local_storage.get('dialog');
		var item = data.items[ 'item-' + id ];
		
		if ( item.style.checked === true ) {
			btn.addClass('on');
		}
		
	},
	
	radio: {
		clearSiblings: function( data, _this ) {
			
			var parent = _this.parent();
			var notRadioBtn = ':not([data-item-type="RadioButton"],.spacing)';
			var adjacentSiblings = parent.nextUntil( notRadioBtn ).add( parent.prevUntil( notRadioBtn ) );
			
			// Clear all adjacent sibling radiobuttons...
			adjacentSiblings.each(function() {
				
				var _this = $(this),
						id = _this.data('item-id'),
						radiocheck = _this.find('.radiocheck');
				if ( _this.hasClass('radiobutton') ) {
					radiocheck.removeClass('on');
					data.items[ 'item-' + id ].style.checked = false;
				}
				
			});
		}
		
	}
	
};
