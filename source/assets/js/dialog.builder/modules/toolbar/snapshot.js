//
// // The point of this loading screen is to make it more understandable that something changed.
// // It's really just a transition, rather than an actual loading screen.
// var snapshot = {
//
// 	init: function() {
//
// 		$('#toolbar .snapshot').on("click", function() {
//
// 			var items = snapshot.fetch_items();
//
// 			console.log( items );
//
// 			var content =
// 				'<div id="snapshot-box">' +
// 					'<h2>Snapshots.jsx</h2>' +
// 					'<div class="container">' +
// 						'<div class="snapshots">' +
// 							items +
// 						'</div>' +
// 						'<div class="take-snapshot">Take a snapshot <i class="far fa-plus-square"></i></div>' +
// 					'</div>' +
// 				'</div>'
// 			;
//
// 			modal.init( content );
//
// 			$('#snapshot-box .take-snapshot').on('click', snapshot.capture);
//
// 		});
// 	},
//
// 	fetch_items: function() {
//
// 		var snapshots = local_storage.get('dialog-snapshots');
//
// 		if ( snapshots === null ) {
// 			snapshots = {
// 				number: 0,
// 				storage: {}
// 			};
// 		}
//
// 		var collector = '';
// 		for (var i = 0; i < snapshots.number; i++) {
//
// 			var ssData = snapshots.storage[ 'dialog-' + (i+1) ];
// 			collector += snapshot.make_html( ssData.image, ssData.json );
//
// 		}
// 		console.log( collector );
// 		return collector;
//
// 	},
//
// 	make_html: function( base64, id ) {
//
// 		var html =
// 		'<div class="snapshot">' +
// 			'<img src="'+ base64 +'" data-snapshot-id="'+ id +'" alt="" />' +
// 			'<div class="close"><i class="fas fa-times-circle"></i></div>' +
// 			'<div class="duplicate"><i class="far fa-clone"></i></div>' +
// 		'</div>';
//
// 		return html;
//
// 	},
//
// 	capture: function() {
//
// 		var snapshots      = local_storage.get('dialog-snapshots');
// 		var currentDialog = local_storage.get('dialog');
//
// 		// Place current dialog in snapshot storage
// 		var number        = snapshots.number + 1;
// 		var newSnapshot   = snapshots.storage['dialog-' + number ];
// 		newSnapshot.image = snapshot.thumbnail;
// 		newSnapshot.json  = currentDialog;
// 		snapshots.number   = number;
//
// 		local_storage.set('dialog-snapshots', snapshots );
//
// 		snapshot.make_html( ssData.image, ssData.json );
//
// 	},
//
// 	thumbnail: function() {
//
//
// 		// // Maybe I was using "width" and "height" wrong... They kept
// 		// // cropping instead of resizing, but since it has a scale option, I
// 		// // decided to use that and calculate the size outside of the plugin.
// 		// // - Max width and height is 300
// 		// var dlgCont = $("#dialog-container");
// 		// var dlgWidth = dlgCont.width();
// 		// var dlgHeight = dlgCont.height();
// 		// var longSide = dlgWidth > dlgHeight ? ['width', dlgWidth] : ['height', dlgHeight];
// 		// var percentage = (300 / longSide[1]) * 100;
// 		// var canvasScale = percentage / 100;
// 		// html2canvas( dlgCont[0], {
// 		//   scale: canvasScale
// 		// }).then(function( canvas ) {
// 		//
// 		// 	return canvas.toDataURL("image/png");
// 		//
// 		//   // var snapshot_base64 = canvas.toDataURL("image/png");
// 		//   // $('<img class="longside-'+ longSide[0] +'" style="position:absolute; top:0px; right:0px;" src="'+ snapshot_base64 +'" alt="" />').appendTo('body');
// 		//
// 		// });
//
//
// 	}
//
// };
//
//
// snapshot.init();
