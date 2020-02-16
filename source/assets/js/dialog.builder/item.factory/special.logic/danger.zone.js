
// The orange text in Preferred Size number inputs
var dangerZone = {
	
	set: function( params, active, specialSelector ) {
		
		var dataItem      = params.dataItem,
				// id         = dataItem.id,
				type          = dataItem.type,
				value         = params.value,
				width         = value[0] || value,
				height        = value[1],
				widthSet      = width > 0,
				heightSet     = height > 0,
				element       = active,
				actualWidth   = Math.round( element.width() ),
				actualHeight  = Math.round( element.height() ) - (type === 'Dialog' ? Math.round( $('#dialog-title-bar').outerHeight() ) : 0),
				itemPropPanel = $('#panel-edit-style-wrap'),
				numberWidth   = specialSelector ? itemPropPanel.find( specialSelector ) : itemPropPanel.find('.number.width'),
				numberHeight  = itemPropPanel.find('.number.height');
				
		var dangerZone = 'danger-zone';
		if ( widthSet && !numberWidth.hasClass( dangerZone ) && width < actualWidth ) {
			numberWidth.addClass( dangerZone );
		}
		else if ( numberWidth.hasClass( dangerZone ) && !widthSet || numberWidth.hasClass( dangerZone ) && width >= actualWidth ) {
			numberWidth.removeClass( dangerZone );
		}
		
		if ( heightSet && !numberHeight.hasClass( dangerZone ) && height < actualHeight ) {
			numberHeight.addClass( dangerZone );
		}
		else if ( numberHeight.hasClass( dangerZone ) && !heightSet || numberHeight.hasClass( dangerZone ) && height >= actualHeight ) {
			numberHeight.removeClass( dangerZone );
		}
		
	}
	
};
