# SplitLines jQuery Plugin

SplitLines (`$.splitLines()`) is a jQuery plugin that splits new lines of wrapped
text into their own HTML elements, allowing you to animate or operate on each
line individually. Works with nested HTML tags.

## Requirements

- jQuery 1.4.2 or later

## Usage

### HTML

    <div id="mytext">
        This is an <strong>example</strong> of some long text 
        that we want to split into lines.
    </div>

### Javascript

    $('#mytext').splitLines({
        tag: '<div><span class="someClass">',
        width: 200,
        keepHtml: true
    });

### Result

    <div id="mytext">
        <div><span class="someClass">This is an</span></div>
        <div><span class="someClass"><strong>example</strong> of</span></div>
        <div><span class="someClass">some long</span></div>
        <div><span class="someClass">text that we</span></div>
        <div><span class="someClass">want to split</span></div>
        <div><span class="someClass">into lines.</span></div>
    </div>

Now go forth, and animate!

For more demos, take a look at the `demos.html` file in this repo. There are
some animated use cases in there as well.

## License 

Copyright (c) 2012 Jeremy Harris

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
