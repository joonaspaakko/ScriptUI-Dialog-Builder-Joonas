
// The point of this loading screen is to make it more understandable that something changed.
// It's really just a transition, rather than an actual loading screen.
var snapshot = {
  
	panel: {
		html: function() {
			
			var html = '<div id="snap-shot-wrapper">'
			
		},
		make: function() {
			
		}
	},
	
	write: function() {
		
		var snapshot = {
			length: 0,
			storage: {}
		};
		local_storage.set('dialog-snapshots', snapshot );
		
	},
	
	capture: function() {
		
		
		var snapshot      = local_storage.get('dialog-snapshots');
		var currentDialog = local_storage.get('dialog');
		
		// Place current dialog in snapshot storage
		var number        = snapshot.length + 1;
		newSnapshot       = snapshot.storage['dialog-' number ];
		newSnapshot.image = snapshot.thumbnail;
		newSnapshot.json  = currentDialog;
		snapshot.length   = number;
		
		local_storage.set('dialog-snapshots', snapshot );
		
	},
	
	thumbnail: function() {
		

		// Maybe I was using "width" and "height" wrong... They kept
		// cropping instead of resizing, but since it has a scale option, I
		// decided to use that and calculate the size outside of the plugin.
		// - Max width and height is 300
		var dlgCont = $("#dialog-container");
		var dlgWidth = dlgCont.width();
		var dlgHeight = dlgCont.height();
		var longSide = dlgWidth > dlgHeight ? ['width', dlgWidth] : ['height', dlgHeight];
		var percentage = (300 / longSide[1]) * 100;
		var canvasScale = percentage / 100;
		html2canvas( dlgCont[0], {
		  scale: canvasScale
		}).then(function( canvas ) {
		  
			return canvas.toDataURL("image/png");
			
		  // var snapshot_base64 = canvas.toDataURL("image/png");
		  // $('<img class="longside-'+ longSide[0] +'" style="position:absolute; top:0px; right:0px;" src="'+ snapshot_base64 +'" alt="" />').appendTo('body');
		  
		});


	}

};
