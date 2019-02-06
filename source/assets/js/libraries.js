
// @codekit-prepend "_libraries/jquery.min.js";
// @codekit-prepend "_libraries/jquery.easing.1.3.js";
// @codekit-prepend "_libraries/jquery-sortable.min.js";
// @codekit-prepend "_libraries/pretty-dropdowns/js/jquery.prettydropdowns.min.js";
// @codekit-prepend "_libraries/autosize-master/dist/autosize.min.js";
// @codekit-prepend "_libraries/jquery.backstretch.min.js";
$("#dialog-section").backstretch([{ url: './assets/images/bg.jpg', alignX: 'center' }]);
// @codekit-prepend "_libraries/codemirror-5.39.2/lib/codemirror.min.js";
// @codekit-prepend "_libraries/codemirror-5.39.2/mode/javascript/javascript.min.js";
// @codekit-prepend "_libraries/flexibility.min.js";
// @codekit-prepend "_libraries/download.js";
// @codekit-prepend "_libraries/clipboard.min.js";
// @codekit-prepend "_libraries/OverlayScrollbars-master/js/jquery.overlayScrollbars.min.js";
// @codekit-prepend "_libraries/html2canvas.min.js";

OverlayScrollbars.defaultOptions({
	className: "os-theme-thin-light",
	sizeAutoCapable: true,
	autoUpdate: true,
	autoUpdateInterval: 0,
	// clipAlways: true,
	paddingAbsolute: true,
	scrollbars: {
		visibility: 'auto',
		// autoHide: "leave",
		autoHide: "scroll",
		autoHideDelay: 100
	}
});
