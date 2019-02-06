
// The point of this loading screen is to make it more understandable that something changed.
// It's really just a transition, rather than an actual loading screen.
var loadingScreen = {
  
	init: function( delay, onComplete ) {
		
    delay = delay || 0.1;
    
		$('body').addClass('loading');
		
		var html =
      '<div id="loader-bg">' +
				'<div class="loader">Loading...</div>' +
			'</div>';
		
    $( html ).appendTo('body');
		
		$('#loader-bg').backstretch([{
			url: './assets/images/bg.jpg',
			alignX: 'center'
	 	}]);
	 
    setTimeout(function() {
      onComplete();
    }, this.secondsToMilliseconds( delay ) );
    
  },
  
  secondsToMilliseconds: function( s ) {
    return s * 1000;
  }

};
