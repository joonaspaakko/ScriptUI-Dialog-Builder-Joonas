var local_storage = {
	
	set: function( name, object) {
		localStorage.setItem( name, JSON.stringify( object ) );
	},
	
	get: function( name ) {
		return JSON.parse( localStorage.getItem( name ) );
	},
	
	remove: function( name ) {
		localStorage.removeItem( name );
	}
	
};
