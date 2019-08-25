
// Very sophisticated notification system.
// Check out our kickaster at verysophisticatednotificationsystem.gov
// Press that like button and subscribe...

// Make parent container
$('<div id="notifications-wrap"></div>').appendTo('#dialog-overlay-wrap');

/* exported notification */
function notification( type, message, hangtime ) {
	
	// HTML
	var msg = $(
		'<div class="notification '+ type +' animated">' +
			'<div>' +
				get_icon() +
				'<div class="msg">'+ message +'<div>' +
			'</div>' +
		'</div>'
	).appendTo('#notifications-wrap');
	
	// Crowd control - GET BACK YOU MONSTERS!!!! *hoses the crap out of the crowd while frantically digging for the pepper spray*
	var max = 1;
	var notification_length = $('#notifications-wrap .notification').length;
	if ( notification_length >= max ) {
		destroy_notification( $('#notifications-wrap .notification').slice( 0, notification_length-max ) );
	}
	
	var nHeight = msg.height();
	
	msg.css({
		height: 0,
		visibility: 'visible'
	});
	
	msg.animate({
		height: nHeight
	}, 300, "easeInOutBack");
	
	// Bananas - B - A - N - A - N - A - S !!
	$('#notifications-wrap .notification:last').addClass('last').prev().removeClass('last');
	
	// Ain't nobody got time to close notifications manually.
	// But would you be interested in our newsletter?
	setTimeout(function() {
		destroy_notification( msg );
	}, ( secToMs( hangtime ) || 5000) );
	
	// "I think that padding makes you look fat..."
	function destroy_notification( msg ) {
		msg.addClass('fadeOut');
		setTimeout(function() {
			msg.remove();
		}, 300);
	}

	function secToMs( seconds ) {
	    return seconds * 1000;
	}

	function get_icon() {
		
		var result = '';
		switch (type) {
			case 'clipboard':
				result = '<i class="fas fa-clipboard icon"></i>';
				break;
			default:
			result = '<i class="fas fa-info-circle icon"></i>';
		}
		return result;
		
	}
	
}
