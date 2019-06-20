# Listbox

## Methods

### add()

Added items are returned. Check the "real world example": [Populate with an array](#populate-with-an-array)

```Javascript
SDB.Listbox.add( element, 'string' ); // Or an array of strings
```

### remove()

Remove item using indexes. This one doesn't take in arrays.

```Javascript
SDB.Listbox.remove( element, 1 );
```

### empty()

Target element should be the `.list-box` item and not its child items.

```Javascript
SDB.Listbox.empty( element );
```

### toggle()

Toggles the selection of an item with the specified index or text content.

```Javascript
SDB.Listbox.toggle( element, 1 );
SDB.Listbox.toggle( element, 'string' );
```

### select()

Selects an item with the specified index or text content.

```Javascript
SDB.Listbox.select( element, 1 );
SDB.Listbox.select( element, 'string' );
```

### deselect()

Deselects an item with the specified index or text content.

```Javascript
SDB.Listbox.deselect( element, 1 );
SDB.Listbox.deselect( element, 'string' );
```

### deselectAll()

Deselects all items. Target element `.list-box`.

```Javascript
SDB.Listbox.deselectAll( element );
```

### selection()

Returns an array of indexes or item text content.

```Javascript
SDB.Listbox.selection.index( element);
SDB.Listbox.selection.text( element );
```

### onSelect eventlistener
```Javascript
element.addEventListener("onSelect", function(e) {
  console.log( e.detail );
});
```

----


## Real world examples

### Add an item

```Javascript
var listbox = SDB.id(1);
var addedItems = SDB.Listbox.add( listbox, ['Item 1', 'Item 2', 'Item 3'] );
console.log( addedItems );
```

----

### Populate with an array

```Javascript
var listbox = SDB.id(1);
var addedItems = SDB.Listbox.add( listbox, ['Item 1', 'Item 2', 'Item 3'] );
console.log( addedItems );
```

----

### Select item if text is equal to

```Javascript
SDB.Listbox.select( SDB.id(1), 'Item 2' );
```

----

### Fetch all selected items

```Javascript
SDB.Listbox.selection.text( SDB.id(1) );
```

----

### Deselect all

```Javascript
var listbox = SDB.id(1);
SDB.Listbox.deselectAll( listbox );
```

----

### Select all items with the click of a button

```Javascript
var listbox = SDB.id(1);
var listboxItems = pickAll('li', listbox);
var button = SDB.id(2);

button.addEventListener("click", function() {
  for( var item of listboxItems ) {
    item.classList.add('selected');
  }
});
```

----

## How to disable listbox items?

To disable listbox items, you need to get a bit tricky. You can't use `SDB.disable.id` or `SDB.disable.name` because Listbox items don't have either. Also there is no method for disabling with index. The only thing left is the `SDB.disable.element()`, which may also be difficult since they don't have any distinct hooks you can latch onto. The snippet below gets the element based on its index.

If you're populating the listbox yourself, you could easily scatter around classes and/or data-attributes that you can target later on for disabling purposes or something else.

> This snippet disables the second item in the specified list.

```Javascript
var listBox = SDB.id(1);
var listItem2 = selectAll('li', listBox)[1];
SDB.disable.element( listItem2 );
```

----

## HTML structure

_The HTML might be slightly cleaned up to make it easier to to read._

```HTML
<div class="list-box" data-item-type="listbox" data-item-id="1" data-item-parent-id="0">
  <div class="inner-wrap">
    <ul>
      <li class="selected"><span>Item 1</span></li>
      <li><span>Item 2</span></li>
    </ul>
  </div>
</div>
```
