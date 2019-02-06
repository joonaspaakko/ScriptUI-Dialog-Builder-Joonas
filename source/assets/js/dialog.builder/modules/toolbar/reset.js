
// RESET EVENT
$('#toolbar .reset').on("click", resetDialog);

function resetDialog() {
	
	var content =
		'<div id="reset-box">' +
			'<h2>Delete Dialog.jsx</h2>' +
			'<span class="text">This will delete the dialog, <br /> allowing you to start over from a clean slate.</span>' +
			'<span class="yes" data-enter>Delete</span>' +
			'<span class="no">Cancel</span>' +
		'</div>';
	
	modal.init( content );
	
	var resetBox = $('#reset-box');
	
	resetBox.find('.yes').on('click', function() {
		
		modal.remove();
		setTimeout(function() {
			
			local_storage.remove('dialog');
			
			loadingScreen.init( null, function() {
				location.reload();
			});
			
		},300);
		
	});
	resetBox.find('.no').on('click', function() {
		modal.remove();
	});
}
