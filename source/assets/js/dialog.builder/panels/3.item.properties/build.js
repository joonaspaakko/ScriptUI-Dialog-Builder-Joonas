
// @codekit-append "html.js";

var edit_style_panel = {};

edit_style_panel.build = function( style, source ) {
	
	var edit_style_container = $('#edit-style-inner-container');
	edit_style_container.html(
		'<span class="target-varName"></span>' +
		'<span class="target-image"></span>' +
		'<span class="target-iconButtonStroke"></span>' +
		'<span class="target-text"></span>' +
		'<span class="target-listItems"></span>' +
		'<span class="target-justify"></span>' +
		'<span class="target-preferredSize"></span>' +
		'<span class="target-margins"></span>' +
		'<span class="target-orientation"></span>' +
		'<span class="target-spacing"></span>' +
		'<span class="target-alignChildren"></span>' +
		'<span class="target-alignment"></span>'
	);
	
	var active = $('#panel-tree-view-wrap .active');
	var lType = active.data('item-type').toLowerCase();
	var typeData = item.list[ lType ](false);
	if ( style === false ) {
		$("<div class='no-properties'>"+ typeData.stylePropInfo +"</div>").appendTo( edit_style_container );
	}
	else {
		
		// Generate edit panel structure
		$.each( style, function( key, val ) {
			var html = panel_edit_style_html.init( key, val );
			if ( html !== undefined ) {
				html.appendTo( edit_style_container.find( '.target-' + key ) );
			}
		
		});
		
		// Style number inputs
		numberInputs();
		
		var hasDefaultText = item.list[ lType ](false).defaultStyle.text;
		var multilineItem  = item.list[ lType ](false).multiline;
		var editText       = $('#panel-edit-style-wrap [data-edit="text"]');
		var editTextParent = editText.parent();
		
		// Icon on the text container telling the user they can't add linebreaks to current item
		if ( hasDefaultText && !multilineItem && !editTextParent.hasClass('is-not-multiline') ) {
			editTextParent.addClass('is-not-multiline');
		}
		
		// Style dropdowns
		$('.pretty-classic').prettyDropdown({
			classic: true,
			customClass: 'arrow triangle',
			selectedMarker: '<i class="fas fa-check"></i>'
		});
		
		$('#panel-edit-style-wrap textarea').each(function(){
			/*global autosize*/
			/*eslint no-undef: ["error", { "typeof": true }] */
  		autosize(this);
		});
		
	  // SELECT TEXT INPUT IN THE ITEM PROPERTIES PANEL
		// If the item has default text, then try to select it. If it doesn't have default text, it never will.
		// This check is used because when the textarea doesn't exist, there's nothing to focus in so it just basically does a site wide Cmd+A, which is not cool...
	  if ( source !== "dialog" && hasDefaultText ) {
	    editText.focus();
			editText.select();
	  }
		
	}
	
	var editInfo = typeData.editInfo;
	if ( editInfo ) {
		$('<div class="edit-info">'+ editInfo +'</div>').appendTo( edit_style_container );
	}
	
};
