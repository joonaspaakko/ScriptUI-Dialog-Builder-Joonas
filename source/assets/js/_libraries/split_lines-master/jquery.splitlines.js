/**
 * Splits new lines of text into separate divs
 *
 * ### Options:
 * - `width` string The width of the box. By default, it tries to use the
 *	 element's width. If you don't define a width, there's no way to split it
 *	 by lines!
 *	- `tag` string The tag to wrap the lines in
 *	- `keepHtml` boolean Whether or not to try and preserve the html within
 *	 the element. Default is true
 *
 *	@param options object The options object
 *	@license MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
(function($){

/**
 * Creates a temporary clone
 *
 * @param element element The element to clone
 */
	function _createTemp(element) {
		return element.clone().css({position: 'absolute'});
	};

/**
 * Splits contents into words, keeping their original Html tag. Note that this
 * tags *each* word with the tag it was found in, so when the wrapping begins
 * the tags stay intact. This may have an effect on your styles (say, if you have
 * margin, each word will inherit those styles).
 *
 * @param node contents The contents
 */
	function _splitHtmlWords(contents) {
		var words = [];
		var splitContent;
		for (var c=0; c<contents.length; c++) {
			// alert( contents[c].nodeName );
			if (contents[c].nodeName === 'BR') {
				words.push('<br>');
				continue;
			}
			if (contents[c].nodeType == 3) {
				splitContent = _splitWords(contents[c].textContent || contents[c].toString());
			} else {
				var tag = $(contents[c]).clone();
				splitContent = _splitHtmlWords(tag.contents());
				for (var t=0; t<splitContent.length; t++) {
					tag.empty();
					splitContent[t] = tag.html(splitContent[t]).wrap('<p></p>').parent().html();
				}
			}
			for (var w=0; w<splitContent.length; w++) {
				if (splitContent[w] === '') {
					continue;
				}
				words.push(splitContent[w]);
			}
		}
		return words;
	};

/**
 * Splits words by spaces
 *
 * @param string text The text to split
 */
	function _splitWords(text) {
		return text.split(/\s+/);
	}

/**
 * Formats html with tags and wrappers.
 *
 * @param tag
 * @param html content wrapped by the tag
 */
	function _markupContent(tag, html) {
		// wrap in a temp div so .html() gives us the tags we specify
		tag = '<div>' + tag;
		// find the deepest child, add html, then find the parent
		return $(tag)
			.find('*:not(:has("*"))')
			.html(html)
			.parentsUntil()
			.slice(-1)
			.html();
	}

/**
 * The jQuery plugin function. See the top of this file for information on the
 * options
 */
	$.fn.splitLines = function(options) {
		var settings = {
			width: 'auto',
			tag: '<div>',
			wrap: '',
			keepHtml: true
		};
		if (options) {
			$.extend(settings, options);
		}
		var newHtml = _createTemp(this);
		var contents = this.contents();
		var text = this.text();
		this.append(newHtml);
		newHtml.text('42');
		var maxHeight = newHtml.height()+2;
		newHtml.empty();

		var tempLine = _createTemp(newHtml);
		var width = settings.width;
		if (settings.width === 'auto') {
			width = this[0].offsetWidth;
		}
		tempLine.width(width);
		this.append(tempLine);
		var words = settings.keepHtml ? _splitHtmlWords(contents) : _splitWords(text);
		var prev;
		for (var w=0; w<words.length; w++) {
			var html = tempLine.html();
			tempLine.html(html+words[w]+' ');
			if (tempLine.html() == prev) {
				// repeating word, it will never fit so just use it instead of failing
				prev = '';
				newHtml.append(_markupContent(settings.tag, tempLine.html()));
				tempLine.html('');
				continue;
			}
			if (tempLine.height() > maxHeight) {
				prev = tempLine.html();
				tempLine.html(html);
				newHtml.append(_markupContent(settings.tag, tempLine.html()));
				tempLine.html('');
				w--;
			}
		}
		newHtml.append(_markupContent(settings.tag, tempLine.html()));

		this.html(newHtml.html());

	};
})(jQuery);
