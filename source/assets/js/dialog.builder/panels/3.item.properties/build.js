
// @codekit-append "html.js";

var edit_style_panel = {};

edit_style_panel.build = function( style, source ) {
	
	var edit_style_container = $('#edit-style-inner-container');
	
	var treeActive = $('#panel-tree-view-wrap .active');
	var type = treeActive.data('item-type');
	var lowerCaseType = type.toLowerCase();
	
	var iconClass = item.list[ lowerCaseType ](false).addPanelIconClass;
	var itemPropHeadingIcon = $('[data-panel="edit"] .item-prop-icon');
	itemPropHeadingIcon.html('');
	$('<i class="'+ iconClass +'"></i>').appendTo( itemPropHeadingIcon );
	
	var styleContainer = [
		'varName',
		'image',
		'iconButtonStroke',
		'softWrap',
		'text',
		'listItems',
		'justify',
		'typeName',
		'tabNavWidth',
		'preferredSize',
		'margins',
		'orientation',
		'spacing',
		'alignChildren',
		'alignment',
		'helpTip',
		'windowType',
		'enabled',
		'creationProps'
	];
	var styleTargetContainers = '';
	
	styleTargetContainers += '<span class="target-item-type">'+ lowerCaseType +'</span>';
	
	$.each( styleContainer, function( key, value ) {
		styleTargetContainers += '<span class="target-'+ value +'"></span>';
	});
	
	edit_style_container.html( styleTargetContainers );
	
	var typeData = item.list[ lowerCaseType ](false);
	
	if ( style === false ) {
		$("<div class='no-properties'>"+ typeData.stylePropInfo +"</div>").appendTo( edit_style_container );
	}
	else {
		// Generate edit panel structure
		$.each( style, function( key, val ) {
			
			var html = panel_edit_style_html.init( key, val, source, treeActive, lowerCaseType, typeData  );
			if ( html !== undefined ) {
				var targetContainer = edit_style_container.find( '.target-' + key );
				html.appendTo( targetContainer );
			}
		
		});
		
		// Style number inputs
		numberInputs();
		
		var hasDefaultText = item.list[ lowerCaseType ](false).defaultStyle.text;
		var multilineItem  = item.list[ lowerCaseType ](false).multiline;
		var editText       = $('#panel-edit-style-wrap [data-edit="text"]');
		var editTextParent = editText.parent();
		
		// Icon on the text container telling the user they can't add linebreaks to current item
		if ( hasDefaultText && !multilineItem && !editTextParent.hasClass('is-not-multiline') ) {
			editTextParent.addClass('is-not-multiline');
		}
		
		// Style dropdowns
		$('.pretty-classic').prettyDropdown({
			hoverIntent: 1000,
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
	
	droplist.onActivate( treeActive, style );
	
};
