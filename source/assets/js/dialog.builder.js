
// CORE
// ****
// @codekit-prepend "dialog.builder/modules/local.storage.js";
// @codekit-prepend "dialog.builder/item.factory/items.js";
// @codekit-prepend "dialog.builder/item.factory/_funnel.js";
// @codekit-prepend "dialog.builder/item.factory/create.js";
// @codekit-prepend "dialog.builder/item.factory/activate.js";
// @codekit-prepend "dialog.builder/item.factory/remove.js";
// @codekit-prepend "dialog.builder/item.factory/sort.js";
// @codekit-prepend "dialog.builder/item.factory/update/update.js";


// ITEMS THAT NEED SOME EXTRA ATTENTION
// ************************************
// @codekit-prepend "dialog.builder/item.factory/special.items/tabbed.panel.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tab.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tree.view.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/tree.view.item.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/list.box.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/drop.list.js";
// @codekit-prepend "dialog.builder/item.factory/special.items/radiocheck.js";

// PANELS
// ******
// @codekit-prepend "dialog.builder/panels/1.add.items.js";
// @codekit-append  "dialog.builder/panels/2.structure.treeview.js";
// @codekit-prepend "dialog.builder/panels/3.item.properties/build.js";
// @codekit-prepend "dialog.builder/panels/3.item.properties/events.js";
// @codekit-prepend "dialog.builder/panels/4.snapshot.js";
// @codekit-append  "dialog.builder/panels/5.dialog.preview.js";

// MISCELLANEOUS
// *************
// @codekit-prepend "dialog.builder/modules/loading.screen.js";
// @codekit-prepend "dialog.builder/modules/clipboard.js";
// @codekit-prepend "dialog.builder/modules/number.input.js";
// @codekit-prepend "dialog.builder/modules/modal.window.js";
// @codekit-prepend "dialog.builder/modules/legend.js";
// @codekit-prepend "dialog.builder/modules/toolbar/export/custom.var.names.js";
// @codekit-prepend "dialog.builder/modules/toolbar/export/image.duplicate.check.js";
// @codekit-prepend "dialog.builder/modules/toolbar/export.js";
// @codekit-prepend "dialog.builder/modules/settings.js";
// @codekit-prepend "dialog.builder/modules/toolbar/import.js";
// @codekit-prepend "dialog.builder/modules/toolbar/reset.js";
// @codekit-prepend "dialog.builder/modules/toolbar/sample.dialog.js";
// @codekit-prepend "dialog.builder/modules/custom.cursor.js";
// @codekit-prepend "dialog.builder/modules/toggle.active.visibility.js";
// @codekit-prepend "dialog.builder/modules/notifications.js";
// @codekit-prepend "dialog.builder/modules/context.menu.js";
// @codekit-prepend "dialog.builder/modules/panels.collapse.js";
// @codekit-prepend "dialog.builder/item.factory/special.logic/danger.zone.js";
// @codekit-prepend "dialog.builder/item.factory/special.logic/force.size.js";

var data = local_storage.get('dialog');

// START FROM NOTHING...
if ( data === null ) {
  
  var params = {
    id: 0,
    type: 'Dialog',
    parentId: false,
    target: $('#panel-tree-view-wrap .contents'),
    event: 'load'
  };
  item.funnel.create( params );
  
}
// REBUILD FROM EXISTING LOCAL STORAGE DATA...
else {
  
  // Don't mind me adding a little duct tape...
  // Saw this weird error where I came back to a built dialog after
  // a day and somehow the last id was missing in the order array.
  // That id was the active id and it was also in the list of items,
  // so hopefully this puts it back without creating more issues...
  if ( $.inArray( data.activeId, data.order ) < 0 ) {
    data.order.push( data.activeId );
  }
	
  var oldActiveId = data.activeId;
  
	$.each( data.order, function( i, currentId ) {
    
		var currentItem = data.items[ 'item-' + currentId ];
    var treeView = $('#panel-tree-view-wrap');
    var params = {
      id: currentId,
      type: currentItem.type,
      parentId: currentItem.parentId,
      target: currentId === 0 ? treeView.find('.contents') : treeView.find('[data-item-id="'+ currentItem.parentId +'"] > ul'),
      event: 'loadFromLocalStorage'
    };
    item.funnel.create( params );
    
    // Makes sure collapsed items are actually collapsed
		if ( currentItem.collapsed ) {
			$('[data-panel="treeview"] [data-item-id="'+ currentId +'"]').addClass('collapsed');
      $('<img class="collapsed-icon" src="assets/images/parent-collapsed.svg">').appendTo('[data-panel="treeview"] [data-item-id="'+ currentId +'"]');
		}
    
	});
  
	// Update preferred size now that all items/elements are created
	$.each( data.order, function( i, currentId ) {
		var currentItem = data.items[ 'item-' + currentId ];
    if ( currentItem.style.preferredSize !== undefined ) {
      item.activate( currentId );
      item.update.style.dialogPreview( 'preferredSize', data, data.items['item-'+currentId], 'loadFromLocalStorage' );
    }
	});
	
  // Reactivate the ye olde active item
  item.activate( oldActiveId );
  // Build Item Properties panel
	data = local_storage.get('dialog');
  var oldItem = data.items[ 'item-' + oldActiveId ];
  edit_style_panel.build( oldItem.style, "loadFromLocalStorage" );
  
}

settings.setDefaults( data );


// Warning for people not using chrome
if ( window.navigator.vendor !== "Google Inc." ) {
  setTimeout(function() {
    notification( 'failure',
    "<strong>WARNING</strong>: Please use Chrome to avoid potential errors.", 10 );
  }, 200);
}

// Something something no ragrets 2019
var cep = {
  fetch: {
    dependencies: function() {
      
      var ajaxOpt = {
        version: 2.1,
        cache: true
      };
      var lsname = 'sdb-cep-dependencies';
      
      var data = local_storage.get( lsname ) || {};
      
      cep.fetch.css( ajaxOpt, function( css ) {
        cep.fetch.js( ajaxOpt, function( js ) {
          
          data.css = css;
          data.js = js;
          
          local_storage.set( lsname, data );
          
        });
      });
      
    },
    // CSS
    css: function( ajaxOpt, callback ) {
      
      var output = '';
      jQuery.ajax({
        // async: false,
        cache: ajaxOpt.cache,
        url: 'https://scriptui.joonas.me/assets/css/sdb.cep.css?v=' + ajaxOpt.version,
        success: function( css ) {
          
          var styleElement = $('<style/>');
          styleElement.text( getFonts() + css );
          output += styleElement.prop('outerHTML').replace('\n','');
          styleElement.remove();
          callback( output );
          
        },
        error: function() {
          
          var linkElement = $('<link/>');
          linkElement.attr('href', 'ScriptUI-Dialog-Builder-Joonas-master/build/assets/css/sdb.cep.css');
          output += linkElement.prop('outerHTML');
          linkElement.remove();
          callback( output );
          
        }
      });
    },
    // JAVASCRIPT
    js: function( ajaxOpt, callback ) {
      var scriptElement = $('<script/>');
      var outputJS = '';
      jQuery.ajax({
        // async: false,
        cache: ajaxOpt.cache,
        url: 'https://scriptui.joonas.me/assets/js/sdb.cep.js?v=' + ajaxOpt.version,
        success: function( js ) {
          
          scriptElement.text( js );
          outputJS += scriptElement.prop('outerHTML');
          scriptElement.remove();
          callback( outputJS );
          
        },
        error: function() {
          
          scriptElement.attr('src', 'ScriptUI-Dialog-Builder-Joonas-master/build/assets/js/sdb.cep.js');
          outputJS += scriptElement.prop('outerHTML');
          scriptElement.remove();
          callback( outputJS );
          
        }
      });
    }
  }
};

cep.fetch.dependencies();
