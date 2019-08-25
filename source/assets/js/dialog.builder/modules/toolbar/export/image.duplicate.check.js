
var imageDuplicateCheck = {
	
	init: function( inputVar, inputString ) {
		
		var dupeResult = false;
		$.each( this.images, function( i, storedImage ) {
			var storedVar = storedImage[0];
			var storedString = storedImage[1];
			// It's a duplicate → ABORT! ABORT!!
			if ( inputString === storedString ) {
				dupeResult = [storedVar];
				return false;
			}
		});
		
		// It's a duplicate → ABORT! ABORT!!
		if ( dupeResult !== false ) {
			return dupeResult;
		}
		// Not a duplicate → Store
		else {
			this.images.push( [inputVar, inputString] );
			return [inputVar, inputString];
		}
		
		
	},
	
	images: []
	
};
