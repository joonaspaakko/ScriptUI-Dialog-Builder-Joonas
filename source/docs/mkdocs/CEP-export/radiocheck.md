# Radiobutton & Checkbox

## Methods

For convenience sake these methods work with any of these 3 namespaces: `Radiocheck`, `Radiobutton` and `Checkbox`. It doesn't matter to me, but for your own sanity, you'll likely want to use `Radiobutton` for radiobuttons and `Checkbox` for checkboxes... or the more neutral `Radiocheck` for either. Choice is yours.

### toggle()
```Javascript
SDB.Radiocheck.toggle( element );  // Toggles a radiobutton/checkbox
```

### check()
```Javascript
SDB.Radiocheck.check( element );   // Checks a radiobutton/checkbox
```

### uncheck()
```Javascript
SDB.Radiocheck.uncheck( element ); // Unchecks a radiobutton/checkbox
```

### checked()
```Javascript
SDB.Radiocheck.checked( element ); // Returns a radiobutton/checkbox state (boolean)
```

### value()
```Javascript
SDB.Radiocheck.value( element );   // Exactly the same as the method above
```

### onCheck eventListener

> Despite the name, it's not just for "checking" but for "unchecking" too.

```Javascript
element.addEventListener("onCheck", function(e) {
  console.log( e.target );
  console.log( e.detail );
});
```

----

## Real world examples

### Check it real good

Check a radiobutton or checkbox. It doesn't matter which of these you use.

```Javascript
SDB.Radiocheck.check( SDB.id(1) );
SDB.Radiobutton.check( SDB.id(1) );
SDB.Checkbox.check( SDB.id(1) );
```

----

### Fetch all checked checkboxes.

> No need for `> .padding-box >` if you're not worried of nesting.

```Javascript
selectAll('[data-item-name="panelOfJudges"] > .padding-box > [data-item-type="checkbox"] .radiocheck.checked');
```

----

### Check another item onCheck

Toggle another checkbox when `onCheck` event is triggered

```Javascript
SDB.id(1).addEventListener("onCheck", function() {
  SDB.Radiocheck.toggle( SDB.id(2) );
});
```

----

### Disable checkbox

```Javascript
SDB.disable( 1 );
```

----

## HTML structure

Radiobuttons and Checkboxes have a child element with the class `.radiocheck` + `.checkbox` or `.radiobutton`. So don't try to select either with just the class `.radiobutton` or `.checkbox`. Use `[data-item-id]` or `[data-item-type]` with or without the class.

### Checkbox

_The HTML might be slightly cleaned up to make it easier to to read._

```HTML
<div class="checkbox" data-item-type="checkbox" data-item-id="8" data-item-parent-id="1">
  <div class="radiocheck checkbox on checked"><svg></svg></div>
  <label>Reverse Page Order</label>
</div>
```

### Radiobutton

_The HTML might be slightly cleaned up to make it easier to to read._

```HTML
<div class="radiobutton" data-item-type="radiobutton" data-item-id="22" data-item-parent-id="0">
  <div class="radiocheck radiobutton on checked"><svg></svg></div>
  <label>RadioButton</label>
</div>
```
