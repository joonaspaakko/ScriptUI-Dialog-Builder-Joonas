# Dropdownlist

## Methods

### select()
```Javascript
SDB.Dropdownlist.select( element, index );  // Selects an item using its index
SDB.Dropdownlist.select( element, string ); // Selects an item using a string
```

### selection()
```Javascript
SDB.Dropdownlist.selection.index( element ); // returns select items index
SDB.Dropdownlist.selection.text( element );  // returns selected items text
SDB.Dropdownlist.selection.value( element ); // Same as the function above
```

### add()
```Javascript
SDB.Dropdownlist.add( element, text ); // Appends a new item
```

### remove()
```Javascript
SDB.Dropdownlist.remove( element, index );  // Removes an item using its index
SDB.Dropdownlist.remove( element, string ); // Removes an item using a string
```

### empty()
```Javascript
SDB.Dropdownlist.empty( element ); // Empties the whole dropdownlist
```

### onSelect eventListener
```Javascript
element.addEventListener("onSelect", function(e) {
  console.log( e.target );
  console.log( e.detail );
});
```

----

## Real world examples

### Append a new item

```Javascript
SDB.Dropdownlist.add( SDB.id(1), "New item");
```

----

### Select an item

```Javascript
SDB.Dropdownlist.select( SDB.id(1), 2);
```

----

### Remove item with a specific text

```Javascript
SDB.Dropdownlist.select( SDB.id(1), "Example string");
```

----

### Get text from the selected item

```Javascript
var selectedString = SDB.Dropdownlist.selection.text( SDB.id(1) );
```

----

### Empty and repopulate

```Javascript
var targetDropdown = SDB.id(1);
var newItems = ['New item 1', 'New item 2', 'New item 3'];
SDB.Dropdownlist.empty( targetDropdown );

for ( var i=0; i < newItems.length; i++ ) {
  SDB.Dropdownlist.add( targetDropdown, newItems[i] );
}
```

----

### Event listener fun

Example where we wait for the user to select dropdownlist item with the text `Center` and then check a radio button in response and stop listening for more.

```Javascript
var dropdown1 = SDB.id(1);
var uncheckRadio2 = function( e ) {
  if ( e.detail.selection.text === 'Center' ) {
    SDB.Radiocheck.check( SDB.id(2) );
    dropdown.removeEventListener("onSelect", uncheckRadio2 );

  }
};
dropdown.addEventListener("onSelect", uncheckRadio2);
```

----

### Mirror dropdowns

Mirror the selection of `dropdown1` with `dropdown2`

```Javascript
var dropdown1 = SDB.id(1);
var dropdown2 = SDB.id(2);
var mirrorDropdowns = function( e ) {
  var target = e.target === dropdown1 ? dropdown2 : dropdown1;
  SDB.Dropdownlist.select( target, e.detail.selection.index );
}
dropdown1.addEventListener("onSelect", mirrorDropdowns);
dropdown2.addEventListener("onSelect", mirrorDropdowns);
```

----

### Disable if conditions are met

Disable a specific element if item number 2 (index 1) is selected in a dropdownlist

```Javascript
var dropdown = SDB.id(1);
var disableThis = SDB.id(2);

dropdown.addEventListener("onSelect", function( e ) {
  var changeState = (e.detail.selection.index === 1) ? 'disable' : 'enable';
  SDB[ changeState ].element( disableThis );
});
```

----

## Dropdownlist HTML structure:

_The HTML might be slightly cleaned up to make it easier to to read._

```HTML
<div class="dropdownlist" data-item-type="dropdownlist" data-item-id="23" data-item-parent-id="21">
  <label>Droplist text</label>
  <div class="drop-list-wrap">
    <div class="items">
      <div class="selected">Top Left</div>
      <div class="horizontal-line">-</div>
    </div>
    <div class="arrow"><svg></svg></div>
  </div>
</div>
```
