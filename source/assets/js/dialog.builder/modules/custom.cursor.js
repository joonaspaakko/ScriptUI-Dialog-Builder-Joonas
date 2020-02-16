
// Not really sure why this is hecking laggy in anything but chrome
// and even then on an older machine it's a little on the slow
// side. It was fun idea for a while, but in the end I didn't care
// enough to try and figure out the most optimal way to do this.

// (function() {
//
// var isChrome = $('#dialog-overlay-wrap > .custom-cursor-ping').is(':visible');
//
// if ( isChrome ) {
// 	customCursor();
// }
//
// function customCursor() {
//
// 	var dialogSection = $('#dialog-section');
//
// 	dialogSection.on("mousemove", function( e ) {
// 		event = e;
// 		move = true;
// 	})
// 	.on("mousemoveend", function() {
// 		$('.custom-cursor').addClass('fade-out');
// 	});
//
// 	setInterval(function() {
// 		if ( move ) {
//
// 			move = false;
// 			var customCursor = $('<div class="custom-cursor"><div><div></div></div></div>');
// 			var currentCursor = customCursor.prependTo( dialogSection );
// 			currentCursor.css({ top: event.pageY - 50, left: event.pageX - 50 - $( dialogSection ).offset().left }); // 50 is the .custom-cursor width/height divided by 2
//
// 			setTimeout(function() {
// 				$('.custom-cursor:last').remove();
// 			}, 1000);
//
// 		}
// 	}, 45);
//
// }
//
// })( jQuery );
