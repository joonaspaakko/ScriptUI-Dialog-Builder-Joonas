# Treeview

## Methods

### add()

The element can be either `.tree-view` or `.tree-view-item`. Target element = `.tree-view` or `.tree-view-item`.

```Javascript
SDB.Treeview.add( element, 'string' ); // returns the added element.
```

You can also feed it an array, in which case it adds multiple items. Target element = `.tree-view` or `.tree-view-item`.
```Javascript
SDB.Treeview.add( element, ['string 1', 'string 2'] ); // returns the added element.
```

> Exported `.tree-view-item` elements will have all kinds of `data-attributes` but this method doesn't add any of them.

!!! note
    Each item is given a new: `data-tree-item-id` attribute so you can hook into that if necessary. This is is unique in the scope of the `.tree-view`. Meaning that you can have any number of `.tree-view` items with identical amount of items and they all contains the same ids. So be sure to target the specific `.tree-view` when using these IDs.

### remove()

Target element = `.tree-view-item`.

```Javascript
SDB.Treeview.remove( element );
```

### expand()

Show child elements. Target element = `.tree-view-item`.

```Javascript
SDB.Treeview.expand( element );
```

### collapse()

Hide child elements. Target element = `.tree-view-item`.

```Javascript
SDB.Treeview.collapse( element );
```

### text()

Retrieve text from the specified item. Target element = `.tree-view-item`.

```Javascript
SDB.Treeview.collapse( element );
```

### empty()

Empties the whole treeview or node, so the target element can be either `.tree-view` or `.tree-node`.

```Javascript
SDB.Treeview.empty( element );
```

### expandAll()

Target element can be `.tree-view` or `.tree-view-item`;

```Javascript
SDB.TreeView.expandAll( element ); // Returns an array with the expanded nodes
```

### collapseAll()

Target element can be `.tree-view` or `.tree-view-item`;

```Javascript
SDB.TreeView.collapseAll( element ); // Returns an array with the collapsed nodes
```

### onClick eventListener

Always attached to the `.tree-view` element. Never to `.tree-view-item`.

```Javascript
element.addEventListener('onClick', function( e ) {
  console.log( e.detail );
});
```

----

## Real world examples

### Add new item & expand
Tree view items can be expanded before any child items are added...

```Javascript
var treeview = SDB.id(1);
var node = SDB.Treeview.add( treeview, 'New item');
SDB.Treeview.expand( node );
```

---

### Add new item inside another
In this case, since the `add()` method returns the added item, we are using the variable defined in the previous code block above. To make an item a parent (node), you don't need to prepare it in any way. Just add a new item.

> Also in this example I added a new class...

The `node` variable is defined in the first example under the heading: [Add new item & expand](#add-new-item-expand).

```Javascript
SDB.Treeview.add( node, 'Another item)').classList.add('remove-on-click');
```

---

### Custom `onClick` event
This can only be attached to the treeview element: `.tree-view`. _It can't be attached to `.tree-view-item` elements._ Continuing from the last 2 examples, we check if the clicked item has a class `remove-on-click` and if it does, the item is removed when clicked.

> Here I'm using `#!js item.remove();` instead of `#!js SDB.Treeview.remove( item );`. Either one will work just fine. The latter method has an added check to see it is a `.tree-view-item`, but otherwise it's the same.

The `treeview` is defined in the first example under the heading: [Add new item & expand](#add-new-item-expand).

```Javascript
treeview.addEventListener('onClick', function( e ) {
  var item =  e.detail.element;
  if ( item.classList.contains('remove-on-click') ) {
    item.remove();
  }
});
```

---

###  Remove item

Each tree item has a unique id `data-tree-item-id` within the scope of its parent treeview. This probably your best bet if you need to target a specific node and you didn't get a chance to store it in a variable when added.

```Javascript
pick('[data-tree-item-id="1"]', treeview).remove();
```

---

### Data-attribute

Each tree item has a unique id `data-tree-item-id` within the scope of its parent treeview. This probably your best bet if you need to target a specific node and you didn't get a chance to store it in a variable when added.

```Javascript
SDB.Treeview.add( pick('[data-tree-item-id="3"]', treeview), 'New item');
```

---

### Populating with an array
First item of each array becomes a parent (tree-node). This is [the output](img/treeview-regular-array.png){: data-lity data-lity-desc='First level of the array is highlighted in green'}.

```Javascript
var itemList = [
  'List (A)', // This becomes a node
  'List (A1)',
  [
    'List (A2)',  // This becomes a node
    'List (B1)',
    'List (B2)',
    [
      'List (B3)',  // This becomes a node
      'List (C1)',
      'List (C2)',
      'List (C3)',
      'List (C4)',
      'List (C5)',
      'List (C6)',
      'List (C7)',
      'List (C8)'
    ]
  ],
  'List (A3)'
];

var treeview = SDB.id(1);
SDB.Treeview.add( treeview, itemList);
```

---

### Populating with an array #2
Same thing as before except to preserve the first level, each item of that first level is added separately using for loop. First item of each array becomes a parent (tree-node), but doing it this way makes an exception for the first level. This is [the output](img/treeview-ignore-1st-lvl-array.png){: data-lity data-lity-desc='First level of the array is highlighted in green'}.

```Javascript
var itemList = [
  'List (A1)',
  'List (A2)',
  [
    'List (A3)', // This becomes a node
    'List (B1)',
    'List (B2)',
    [
      'List (B3)', // This becomes a node
      'List (C1)',
      'List (C2)',
      'List (C3)',
      'List (C4)',
      'List (C5)',
      'List (C6)',
      'List (C7)',
      'List (C8)'
    ]
  ],
  'List (A4)'
];

var treeview = SDB.id(1);
for ( var text of itemList ) {
  SDB.Treeview.add( treeview, text);
}
```

----

### Expand Everything

Target element can be `.tree-view` or `.tree-view-item`;

```Javascript
var treeview = SDB.id(1);
var expandedNodes = SDB.Treeview.expandAll( treeview );
```

----

### Collapse at a specific node

```Javascript
var treeview = SDB.id(1);
var node = pick('[data-tree-item-id="1"]', treeview);
var collapsedNodes = SDB.Treeview.collapseAll( node );
```

----

### Empty a node

When a node is emptied, it loses the little chevron.

```Javascript
SDB.Treeview.empty( pick('[data-tree-item-id="2"]') );
```

----

## HTML structure

I made some manual changes to the HTML to make it more readable. All parent tree items are marked with `(node)` in the comments.

Classes | Description
---|---
<div style="width: 80px;">`.tree-node`</div> | Every time `#!css .tree-view-item` has the class `#!css .tree-node` it has at least one child item.
`.expanded` | Children are hidden by default. This class makes them visible.

### Simplified HTML

> Where it says `#!text Item text lives here`, there's actually two child `span` elements  there.

```Html
<div class="panel tree-view">
  <div class="padding-box">

    <!-- Item 1 -->
    <div class="tree-view-item">
      <div class="item-wrap"><!-- Item text lives here --></div>
      <div class="padding-box"></div>
    </div>

    <!-- Item 2 (node)-->
    <div class="tree-view-item tree-node expanded">
      <div class="item-wrap"><!-- Item text lives here --></div>
      <div class="padding-box">

        <!-- Item 3-->
        <div class="tree-view-item">
          <div class="item-wrap"><!-- Item text lives here --></div>
          <div class="padding-box"></div>
        </div>

      </div> <!-- / .padding-box-->
    </div> <!-- / Item 2 (node)-->

  </div> <!-- / .padding-box-->
</div> <!-- / Treeview-->
```

### Full HTML

??? "Expand code here"
	```Html
	<div class="panel tree-view" data-parent="true" data-item-type="treeview" data-item-name="treeView1" data-item-id="1" data-item-parent-id="0">
	  <div class="padding-box">

	    <!-- Tree item 1 (node)-->
	    <div class="tree-view-item tree-node expanded" data-parent="true" data-item-type="treeitem" data-item-name="tvItem1" data-item-id="2" data-item-parent-id="1">
	      <div class="item-wrap">
	        <span class="tree-view-arrow"><svg></svg></span>
	        <span class="text-container" contenteditable="false">TreeItem</span>
	      </div>
	      <div class="padding-box">

	        <!-- Tree item 2 (node)-->
	        <div class="tree-view-item tree-node" data-parent="true" data-item-type="treeitem" data-item-name="tvItem2" data-item-id="4" data-item-parent-id="2">
	          <div class="item-wrap">
	            <span class="tree-view-arrow"><svg></svg></span>
	            <span class="text-container" contenteditable="false">TreeItem</span></div>
	          <div class="padding-box">

	            <!-- Tree item 3 -->
	            <div class="tree-view-item" data-parent="true" data-item-type="treeitem" data-item-name="tvItem3" data-item-id="5" data-item-parent-id="4">
	              <div class="item-wrap">
	                <span class="tree-view-arrow"><svg></svg></span>
	                <span class="text-container" contenteditable="false">TreeItem</span>
	              </div>
	              <div class="padding-box"></div>
	            </div>
	            <!-- Tree item 4 (node)-->
	            <div class="tree-view-item tree-node expanded" data-parent="true" data-item-type="treeitem" data-item-name="tvItem4" data-item-id="6" data-item-parent-id="4">
	              <div class="item-wrap">
	                <span class="tree-view-arrow"><svg></svg></span>
	                <span class="text-container" contenteditable="false">TreeItem</span>
	              </div>
	              <div class="padding-box">

	                <!-- Tree item 5 -->
	                <div class="tree-view-item active" data-parent="true" data-item-type="treeitem" data-item-name="tvItem5" data-item-id="9" data-item-parent-id="4">
	                  <div class="item-wrap">
	                    <span class="tree-view-arrow"><svg></svg></span>
	                    <span class="text-container" contenteditable="false">TreeItem</span>
	                  </div>
	                  <div class="padding-box"></div>
	                </div>

	              </div> <!-- / .padding-box-->
	            </div> <!-- / Tree item 4 (node)-->

	          </div> <!-- / .padding-box-->
	        </div> <!-- / Tree item 2 (node)-->

	      </div> <!-- / .padding-box-->
	    </div> <!-- / Tree item 1 (node)-->

	    <!-- Tree item 6 (node)-->
	    <div class="tree-view-item tree-node expanded" data-parent="true" data-item-type="treeitem" data-item-name="tvItem6" data-item-id="3" data-item-parent-id="1">
	      <div class="item-wrap">
	        <span class="tree-view-arrow"><svg></svg></span>
	        <span class="text-container" contenteditable="false">TreeItem</span>
	      </div>
	      <div class="padding-box">

	        <!-- Tree item 7 -->
	        <div class="tree-view-item" data-parent="true" data-item-type="treeitem" data-item-name="tvItem7" data-item-id="7" data-item-parent-id="3">
	          <div class="item-wrap">
	            <span class="tree-view-arrow"><svg></svg></span>
	            <span class="text-container" contenteditable="false">TreeItem</span>
	          </div>
	          <div class="padding-box"></div>
	        </div>
	        <!-- Tree item 8 -->
	        <div class="tree-view-item" data-parent="true" data-item-type="treeitem" data-item-name="tvItem8" data-item-id="8" data-item-parent-id="7">
	          <div class="item-wrap">
	            <span class="tree-view-arrow"><svg></svg></span>
	            <span class="text-container" contenteditable="false">TreeItem</span>
	          </div>
	          <div class="padding-box"></div>
	        </div>

	      </div> <!-- / .padding-box-->
	    </div> <!-- / Tree item 6 (node) -->

	  </div> <!-- / .padding-box-->
	</div> <!-- / Treeview -->
	```
