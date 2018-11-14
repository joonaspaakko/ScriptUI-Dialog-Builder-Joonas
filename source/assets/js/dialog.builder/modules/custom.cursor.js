
// Not really sure why this is hecking laggy in anything but chrome
// and even then on an older machine it's a little on the slow
// side. It was fun idea for a while, but in the end I didn't care
// enough to try and figure out the most optimal way to do this.

// (function() {
//
// // Opera 8.0+
// var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// // Firefox 1.0+
// var isFirefox = typeof InstallTrigger !== 'undefined';
// // Safari 3.0+ "[object HTMLElementConstructor]"
// var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
// // Internet Explorer 6-11
// var isIE = /*@cc_on!@*/false || !!document.documentMode;
// // Edge 20+
// var isEdge = !isIE && !!window.StyleMedia;
// // Chrome 1+
// var isChrome = !!window.chrome && !!window.chrome.webstore;
// // Blink engine detection
// var isBlink = (isChrome || isOpera) && !!window.CSS;
//
// var move = false,
// 		event = null;
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
