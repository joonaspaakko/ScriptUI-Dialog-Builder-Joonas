# Helper functions

## Selector/data hooks

Each SDB item has a few handy data attributes you can latch onto. Listbox items don't have any of these and Treeview items use `data-tree-item-id`, which are only unique within each treeview item.

Data-attribute| Description
------|---
<div style="width: 120px;">**data-item-id**</div> | IDs are unique, so this is likely your best when selecting items: `[data-item-id="1"]`. "Dialog" is always 0.
**data-item-parent-id** | Parent items have a single child container `.padding-box`, that holds the children.
**data-item-type** | Typenames are straight from SUI, if possible. "Divider" for example is not a standard item, so it has an improvised name. All of these are case sensitive.
**data-item-name** | this is either automatically assigned on export and you can also override it using the properties panel's "Custom variable name" option.

To easily check what these are for each item, you can use the SDB inspector to snoop around by hovering over items. More about SDB Inspector [here](#sdb-inspector).

!!! Error "Warning!"
		Item elements, which is to say any element that has the attribute `data-item-id`, contain the spacing in the form of a padding. So you may want to target a child element inside that in some cases.
		
		For example; if you attach a click event listener to the item element, the user could then click an empty to trigger the event.

## Selector methods

To make selecting elements just a tiny bit easier, I added two helper functions for fetching one element or all matching elements.

### select()

Selects first match. Same functionality as `#!js document.querySelector()`.

```Javascript
select('div')
```

### selectAll()

Selects an array of elements. Same functionality as `#!js [...document.querySelectorAll()]`.

```Javascript
selectAll('div')
```

You can also use `element`, `elementAll` and `pick`, `pickAll`.

> Note that there are also [SDB centric selector methods](#sbd-specific-selector-methods), which shorten the syntax a bit. More on those right after the usage examples below.

### Real world examples

```Javascript
var dialog = select('#dialog');
var item1 = select('[data-item-id="1"]');
```

Get all child items inside a parent.

> If you're doing something like this, you probably need to consider nesting and the fact that `.padding-box` is always between parent and its children. The [SDB centric selector methods](#sbd-specific-selector-methods) make it more simple though.

```Javascript
var items = selectAll('[data-item-id="1"] > .padding-box > [data-item-id]');
```

Since every SDB item, which is to say element that has `[data-item-id]` also has `[data-item-parent-id]`, you could also fetch all children like this:

```Javascript
var items = pickAll('[data-item-parent-id="31"][data-item-id]');
```

If you already have the parent stored as a variable, you may want to use `:scope`. You can't start `querySelector` with a child selector `>`, but you can pad that with `:scope`.

```Javascript
var parent = select('[data-item-id="1"]');
var items = selectAll(':scope > .padding-box > [data-item-id]', parent);
```

This snippet selects all elements where the `data-item-name` attribute starts with `button`.

```Javascript
selectAll('[data-item-name^="button"]');
```

## SBD specific selector methods

I added these methods too, since data-attributes can be a bit beefy to type. I wanted to keep these short so the method names might not be super descriptive...

!!! error ""
    At the moment these methods will not select a `tree-item-id`. For those, use the longer `select('[data-item-name="myTreeView"] > .padding-box > [data-tree-item-id="5"]');`. Same thing applies to the parentID parameter with these methods. Use something like: `select('[data-tree-item-id="2"] > .padding-box > [data-tree-item-id="3"]');`.
		
### id()

Returns an item with the given id

```Javascript
SDB.id(childId, 'parentName')
SDB.id(childId, parentId)
```

### name()

Returns an item with the given name

```Javascript
SDB.name('cildName', 'parentName')
SDB.name('cildName', parentId)
```

### typeAll()

Returns all items with the given type.

```Javascript
SDB.typeAll('childType', 'parentName')
SDB.typeAll('childType', parentId)
```

!!! Warning ""
    With these methods, parent is always the direct parent. This is the same as doing `document.selector('[data-item-id="1"] > .padding-box > [data-item-id="2"]')`. If you want to find other nested child items, you might want to use `select('[data-item-id="2"]', parent);`.

!!! Info ""
    If these selector methods don't give you what you want, you can always fall back to using `#!js select()` and `#!js selectAll()` or even `document.querySelector`.

### Real world examples

Just like with the general selector functions, you can define a parent like this:

```Javascript
var item1insideItem2 = SDB.id(2, 1);
```
```Javascript
// Verbose version of the same thing:
var parentID = 1;
var childID = 2;
var checkbox = SDB.id(childID, parentID);
```

Get all `StaticText` items inside parent with the id `1`.

```Javascript
var statictexts = SDB.typeAll('StaticText', 1);
```

The name is automatically assigned by SDB, unless you give it in the item properties panel → Custom Variable Name

```Javascript
var panelBtns = SDB.typeAll('Button', 'rightSidePanel');
```

Get element `George` inside parent `rightSidePanel`.


```Javascript
var george = SDB.name('George', 'rightSidePanel');
```

## Disabling and enabling items

The disabled element will be grayed out and most interactivity is disabled. For example, a button can't be clicked and edittext can't be edited but static items, such as Statictext are simply grayed out.

!!! Warning
    Should be worth a mention that the disabling method is kinda crude. The workhorse here is just an invisible overlay that stops users from clicking the items. Though, in addition to that, Edittext items are made readonly as well. Another thing to note is that the overlay goes inside the element that has all the data-attributes, so if an element has `data-item-id`, for instance, you'll probably want to target the child item(s).

### disable()

```Javascript
SDB.disable.id( 1 );
SDB.disable.name( 'itemName' ); // The custom variable name of an item
SDB.disable.element( element );
```

!!! Protip ""
    All of these methods take the same type of values as an array as well.

### enable()
```Javascript
SDB.enable.id( 1 );
SDB.enable.name( 'itemName' ); // The custom variable name of an item
SDB.enable.item( element );
```

!!! Protip ""
    All of these methods take the same type of values as an array as well.

### Real world examples

> Didn't include any examples for enabling items since it works exactly the same as disable.

Disable one element (different methods).

```Javascript
SDB.disable.id( 1 );
SDB.disable.name( 'name1' );
SDB.disable.element( SDB.id(1) );
```

Disable all items with these names (names are unique).

```Javascript
SDB.disable.name( ['name16', 'name17', 'name18'] );
```

Disable all items with these ids (ids are unique).

```Javascript
SDB.disable.id( [1, 2, 3] );
```

Disable all items with the type "statictext".

> Type names are case sensitive...

```Javascript
SDB.disable.element( SDB.typeAll('statictext') );
```

Disable all items where the name starts with 'button'.

```Javascript
SDB.disable.element( selectAll('[data-item-name^="button"]') );
```

## SDB Inspector

SDB Inspector is a small info window that shows useful data when you hover over items. Use `#!js SDB.inspector();`  
**Caveats**

- You can't inspect nested items if the parent item is disabled.
- Groups can be a elusive, but at least you can inspect their child items, that will show what the parent id is. There's always the good old Chromedev tools inspection too, if you want to find out more.


!!! warning
    Remember to comment out `#!js SDB.inspector();` when you are ready to deploy!


<!-- https://www.tablesgenerator.com/markdown_tables -->

| Inspector properties | Data-attribute          | Suggested usage             | More info                                                                                                                                                                                                              |
|----------------------|-------------------------|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Type                 | <div style="width: 150px">`[data-item-type]`</div>      | <div style="width: 170px">`SDB.typeAll('checkbox');`</div>  | All types are lowercase. These type names primarily come from SUI, but there are exceptions, like `divider`, which is not a SUI item. Incidentally they are the same as the item names in the SDB’s “Add items“ panel. |
| ID                   | `[data-item-id]`        | `SDB.id(1);`                | With a few exceptions, generally all items have an ID given by SDB. There are also generally unique. There is also `data-tree-item-id`, which is only unique in the scope of it’s parent treeview.                     |
| Parent ID            | `[data-item-parent-id]` | `SDB.parentId('checkbox');` | Same idea as above. Dialog item doesn’t have a parent.                                                                                                                                                                 |
| Name                 | `[data-item-name]`      | `SDB.name('Charles');`      | Automatically generated by SDB on export. You can give a custom name using the `Custom Variable Name` input in the `Properties panel` in SDB.                                                                          |

### Suggested usage?
These are all just shorthand methods. Read more here if you skipped that section: [SDB specific selector methods](#sbd-specific-selector-methods). If these methods don’t do what you need, you can fallback to the provided: [Selector methods](#selector-methods) or their vanilla JS equivalent methods  `document.querySelector()` or `[...document.querySelectorAll()]`.
