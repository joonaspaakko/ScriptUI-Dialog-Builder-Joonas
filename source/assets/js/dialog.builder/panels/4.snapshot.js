
// The point of this loading screen is to make it more understandable that something changed.
// It's really just a transition, rather than an actual loading screen.
var snapshot = {

	init: function() {
		
		snapshot.fetch_items_length();
		
	},
	
	openPanel: function() {
		
		var panel = $('[data-panel="snapshots"]');
		
		// Once the page is loaded, the lock stays open
		var lock = panel.data('lock');
		if ( lock ) {
			
			panel.data({ 'lock': false });
			
			var items = snapshot.fetch_all_items();
			$( items ).prependTo( panel.find('.snapshots') );
			
			panel.find('.take-snapshot').on('click', snapshot.capture);
			
			panel.on("click", ".image", function() {
				
				var snapshot = $(this).closest('.snapshot');
				var id = snapshot.data('id');
				var ssData = local_storage.get('dialog-snapshots');
				var ssDataItem = ssData.storage[ 'dialog-' + id ];
				modal.init( '<img src="'+ ssDataItem.image +'" alt="" />' );
				$('#modal-window-content').addClass('snapshot-preview');
				
			});
			
			panel.on("click", ".remove", function() {
				snapshot.remove( $(this).closest('.snapshot') );
			});
			
			panel.on("click", ".ss-label", function() {
				snapshot.replace( $(this).closest('.snapshot') );
			});
			
		}
		
	},
	
	replace: function( snapshotElement ) {
		
		var id = snapshotElement.data('id');
		var ssData = local_storage.get('dialog-snapshots');
		var ssDataItem = ssData.storage[ 'dialog-' + id ];
		
		// var currentSnap = $('[data-panel="snapshots"] .snapshot[data-id="'+ id +'"]');
		
		var content =
			// '<div id="reset-box">' +
			'<div id="snapshot-replace-box">' +
				// '<h2>Replace Dialog With A Snapshot ('+ id +').jsx</h2>' +
				// '<span class="text">Are you sure you want to <strong>replace</strong> <br>the current dialog with this snapshot?</span>' +
				'<img src="'+ ssDataItem.image +'" alt="" />' +
				'<div class="info-wrap" data-id="'+ ssDataItem.id +'">' +
					'<span><strong>ID: </strong>'+ ssDataItem.id +'</span>' +
					'<span><strong>Date: </strong>'+ new Date( ssDataItem.date ).toLocaleString() +'</span>' +
					'<br><div>Use left and right arrow keys to navigate between snapshots.</div>' +
					'<div>When you load a snapshot it overwrites your current dialog, so you should take a new snapshot first if it has changes you want to keep.</div>' +
					"<div>Sometimes these preview images have some weird clipping errors and such. Just wanted to acknowledge that it can happen, but it doesn't carry over to the loaded snapshot.</div>" +
				'</div>' +
				'<div class="btn-wrap">' +
					'<span class="remove">Delete</span>' +
					'<span class="yes" data-enter>Load this snapshot</span>' +
					'<span class="no">Close</span>' +
				'</div>' +
			'</div>';
			
		modal.init( content, 'snapshot-replace' );
		var replaceBox = $('#snapshot-replace-box');
		
		replaceBox.find('.yes').on('click', function() {
			
			modal.remove();
			setTimeout( function() {
				
				local_storage.remove('dialog');
				local_storage.set('dialog', ssDataItem.json );
				modal.remove();
				loadingScreen.init( null, function() {
					location.reload();
				});
				
			}, 300);
		
		});
		
		replaceBox.find('.no').on('click', function() {
			modal.remove();
		});
		
		replaceBox.find('.remove').on('click', function() {
			var id = $('#modal-window.snapshot-replace .info-wrap').data('id');
			var currentSnap = $('[data-panel="snapshots"] .snapshot[data-id="'+ id +'"]');
			
			modal.remove(function() {
				var prevNext = currentSnap.prev().length < 1 ? currentSnap.next(): currentSnap.prev();
				prevNext.find('.ss-label').trigger("click");
				snapshot.remove( currentSnap );
			});
			
		});
		
	},
	
	remove: function( snapshotElement ) {
		
		var id = snapshotElement.data('id');
		
		// var content =
		// 	'<div id="reset-box">' +
		// 		'<h2>Remove snapshot ('+ id +').jsx</h2>' +
		// 		'<span class="text">Are you sure you want to remove this snapshot?</span>' +
		// 		'<span class="yes" data-enter>Remove</span>' +
		// 		'<span class="no">Cancel</span>' +
		// 	'</div>';
		//
		// modal.init( content );
		//
		// var resetBox = $('#reset-box');
		//
		// resetBox.find('.yes').on('click', function() {
			
			var ssData = local_storage.get('dialog-snapshots');
			
			delete ssData.storage[ 'dialog-' + id ];
			snapshotElement.remove();
			
			var ids = [];
			$('[data-panel="snapshots"] .snapshots').children().each(function() {
				ids.push( $(this).data('id') );
			});
			
			ssData.ids = ids.reverse();
			
			local_storage.set('dialog-snapshots', ssData);
			
			snapshot.fetch_items_length();
			
		//
		// 	modal.remove();
		//
		// });
		// resetBox.find('.no').on('click', function() {
		// 	modal.remove();
		// });
		
	},
	
	fetch_items_length: function() {
		
		var snapshots = local_storage.get('dialog-snapshots');
		var itemsLength = null;
		if ( snapshots ) {
			if ( snapshots.ids ) {
				itemsLength = snapshots.ids.length;
			}
		}
		
		if ( itemsLength !== null ) {
			var snapshotsLabel = $('[data-panel="snapshots"] .label .ss-number');
			if ( snapshots.ids.length > 0 ) {
				snapshotsLabel.html( '<div style="display: inline-block; padding: 0 7px;">|</div>' + snapshots.ids.length );
			}
			else {
				snapshotsLabel.html('');
			}
		}
		
	},

	fetch_all_items: function() {
		
		// local_storage.remove('dialog-snapshots');
		
		var snapshots = local_storage.get('dialog-snapshots');

		if ( snapshots === null ) {
			snapshots = {
				ids: [],
				storage: {}
			};
			local_storage.set('dialog-snapshots', snapshots);
		}
		
		var collector = '';
		for ( var i = snapshots.ids.length; i--; ) { // Reverse loop (newest at the top)
			
			var ssData = snapshots.storage[ 'dialog-' + snapshots.ids[ i ] ];
			collector += snapshot.make_html( ssData );
			
		}
		
		return collector;

	},

	capture: function() {
		
		var tempSnapshot = $('<div class="snapshot temp"><img src="assets/images/snapshot-load.gif" alt="" /></div>').prependTo( '[data-panel="snapshots"] .snapshots' );
		
		var snapshots     = local_storage.get('dialog-snapshots');
		var currentDialog = local_storage.get('dialog');
		
		// Maybe I was using "width" and "height" wrong... They kept
		// cropping instead of resizing, but since it has a scale option, I
		// decided to use that and calculate the size outside of the plugin.
		// - Max width and height is 300
		var dlgCont = $("#dialog-container");
		// var dlgWidth = dlgCont.width();
		// var dlgHeight = dlgCont.height();
		// var longEdge = dlgWidth > dlgHeight ? ['width', dlgWidth] : ['height', dlgHeight];
		// var percentage = (300 / longEdge[1]) * 100;
		// var canvasScale = percentage / 100;
		
		/*global html2canvas*/
		/*eslint no-undef: ["error", { "typeof": true }] */
		html2canvas( dlgCont[0], {
		  // scale: canvasScale,
			backgroundColor: null,
			logging: false
		}).then(function( canvas ) {
			
			var panel = $('[data-panel="snapshots"]');
			
			tempSnapshot.remove();
			
			// Place current dialog in snapshot storage
			var id = snapshots.ids.length > 0 ? Math.max.apply(null, snapshots.ids ) + 1 : 1;
			var newSnapshot = snapshots.storage['dialog-' + id ] = {};
			
			newSnapshot.id    = id; // Find the largest id and add 1 to it
			newSnapshot.date  = new Date().getTime();
			newSnapshot.image = canvas.toDataURL("image/png");
			newSnapshot.json  = currentDialog;
			snapshots.ids.push( newSnapshot.id );
			
			local_storage.set('dialog-snapshots', snapshots );
			
			var item_html = snapshot.make_html( newSnapshot );
			
			if ( panel.find('[data-id="'+ id +'"]').length <= 0 ) {
				$( item_html ).prependTo( panel.find('.snapshots') );
			}
			
			snapshot.fetch_items_length();
			
		});
		
	},

	make_html: function( snapshot ) {
		
		var date = new Date( snapshot.date );
		
		var html =
		'<div class="snapshot" data-id="'+ snapshot.id +'">' +
			'<div class="ss-label"><span title="'+ date +'">'+ snapshot.id +'</span><div class="text">Snapshot</div></div>' +
			'<div class="icons-wrap animated fadeIn">'+
				'<div class="remove" title="Remove snapshot..."><i class="fas fa-trash"></i></div>' +
			'</div>' +
		'</div>';

		return html;

	}
	
};


snapshot.init();


$(document).on("keydown", function( e ) {
	
	if ( $('#modal-window.snapshot-replace').length > 0 ) {
		
		var keycode = e.keyCode ? e.keyCode : e.which;
		var arrowLeft  = (keycode === 37);
		var arrowRight = (keycode === 39);
		
		var id = $('#modal-window.snapshot-replace .info-wrap').data('id');
		
		if ( arrowLeft || arrowRight ) {
			
			modal.remove(function() {
				var currentSnap = $('[data-panel="snapshots"] .snapshot[data-id="'+ id +'"]');
				
				var prevNext;
				if ( arrowLeft ) {
					prevNext = currentSnap.next().length < 1 ? currentSnap.siblings().first() : currentSnap.next();
				}
				else if ( arrowRight ) {
					prevNext = currentSnap.prev().length < 1 ? currentSnap.siblings().last()  : currentSnap.prev();
				}
				
				if ( prevNext.length < 1 ) {
					prevNext = currentSnap;
				}
				
				prevNext.find('.ss-label').trigger("click");
			});
		}
	
		
	}
	
});
