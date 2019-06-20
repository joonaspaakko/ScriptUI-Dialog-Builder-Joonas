
SDB.Dropdownlist = {

	init: function() {
		var dropdowns = selectAll('.drop-list-wrap');
		for (var i = 0; i < dropdowns.length; i++) {
			var dropdown = dropdowns[i];
			dropdown.addEventListener("click", function() {
        
				var isOpen = this.classList.contains('open');
        
				var addRemove = isOpen ? 'remove' : 'add';
				this.classList[addRemove]('open');
        
        var droplist = document.querySelector('#drop-list');
        if ( droplist !== null ) droplist.remove();
				if ( !isOpen ) SDB.Dropdownlist.show(this);
        
			});
		}
	},

	show: function(dropdown) {

		var rect = dropdown.getBoundingClientRect();
		var offset = {
			top: rect.top + pick('html').scrollTop,
			left: rect.left + pick('html').scrollLeft
		};

		var listWrapOffsetTop = offset.top,
			  listWrapOffsetleft = offset.left,
			  listWrapWidth = dropdown.offsetWidth,
			  listWrapHeight = dropdown.offsetHeight;

		var items = SDB.Dropdownlist.collect(dropdown);
		var itemsList = document.createElement('div');
		itemsList.setAttribute("id", "drop-list");
		itemsList.appendChild(items);
		var droplist = select('#dialog').appendChild(itemsList);
    
		droplist.style.top = listWrapOffsetTop + listWrapHeight + "px";
		droplist.style.left = listWrapOffsetleft + "px";
		droplist.style.width = listWrapWidth - 5 + "px";
    
		var droplistItems = selectAll('ul > li', droplist);
		for (var i = 0; i < droplistItems.length; i++) {
			var droplistItem = droplistItems[i];
			droplistItem.addEventListener("click", function() {

				var item = this;
				if (this.innerHTML !== '-') {
					var selectedIndex = droplistItems.indexOf(item);
					SDB.Dropdownlist.select(dropdown, selectedIndex);
				}
        
        var customEvent = new CustomEvent('onSelect', { detail: {
          selection: {
            index: selectedIndex,
            text: item.textContent,
            value: item.textContent
          }
        }});
        dropdown.parentNode.dispatchEvent( customEvent );
			});
		}

	},

	collect: function(dropdown) {

		var items = selectAll('.items > div', dropdown);
		var ul = document.createElement('ul');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var li = document.createElement('li');
			var text = item.innerHTML;
			li.classList.add('option');
			if (text === '-') li.classList.add('horizontal-line');
      var selectedIndex = SDB.Dropdownlist.selection.index( dropdown );
      if ( selectedIndex === i ) li.classList.add('selected');
			li.textContent = text;
			ul.appendChild(li);
		}
		return ul

	},
  
	select: function(dropdown, target) {
    
    var selected = dropdown.querySelector('.selected');
		if ( selected !== null ) {
			selected.classList.remove('selected');
		}
    if ( typeof target == "string" ) {
      for ( var element of selectAll('.items > div', dropdown) ) {
        if ( element.textContent.includes(target) ) element.classList.add('selected');
      }
    }
    else if ( typeof target == "number" ) {
      selectAll('.items > div', dropdown)[target].classList.add('selected');
    }
		
    SDB.Dropdownlist.close(dropdown);

	},
  
  selection: {
    index: function(dropdown) {
      var droplistItems = pickAll('.items > div', dropdown);
      var selected = pick('.selected', dropdown);
      var selectionIndex = droplistItems.indexOf(selected);
      return selectionIndex;
    },
    text: function(dropdown) {
      var selected = pick('.selected', dropdown);
      return selected.textContent;
    },
    value: function(dropdown) {
      var selected = pick('.selected', dropdown);
      return selected.textContent;
    }
  },

	add: function(dropdown, textString) {
    
		var newItem = document.createElement('div');
		if (textString === '-') newItem.classList.add('horizontal-line');
		newItem.textContent = textString;
		var itemsElement = pick('.items', dropdown);
		itemsElement.appendChild(newItem);
		
		SDB.Dropdownlist.setSize( itemsElement );
		
		if ( pickAll('.items > div', dropdown).length === 1 ) {
			SDB.Dropdownlist.select(dropdown, 0);
		}

	},
	
	setSize: function( itemsElement ) {
    itemsElement.classList.add('getSize');
    var width = itemsElement.clientWidth;
    itemsElement.style.minWidth = (width + 13) + 'px';
    itemsElement.classList.remove('getSize');
	},

	remove: function(dropdown, target) {

		var item = pickAll('.items > div', dropdown)[target];
		var itemIsSelected = item.classList.contains('selected');
    
    if ( typeof target == "string" ) {
      for ( var element of selectAll('.items > div', dropdown) ) {
        if ( element.textContent.includes(target) ) {
          itemIsSelected = element.classList.contains('selected');
          element.remove();
        }
      }
    }
    else if ( typeof target == "number" ) {
      item.remove();
    }
    
		if ( itemIsSelected ) {
      pickAll('.items > div', dropdown)[0].classList.add('selected');
		}

	},

	empty: function(dropdown) {
    
		pick('.items', dropdown).innerHTML = '';

	},

	close: function(dropdown) {
    
		try {
			document.querySelector('#drop-list').remove();
			dropdown.classList.remove('open');
		} catch (e) {}
    
	}

};

SDB.Dropdownlist.init();
