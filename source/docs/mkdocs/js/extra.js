document.addEventListener("DOMContentLoaded", function() {
  // removeEditButton();
  load_navpane();
  scrollPast();
  lityCustomization();
});

function load_navpane() {
    var width = window.innerWidth;
    if (width <= 1200) {
        return;
    }

    var nav = document.getElementsByClassName("md-nav");
    for(var i = 0; i < nav.length; i++) {
        if (typeof nav.item(i).style === "undefined") {
            continue;
        }

        if (nav.item(i).getAttribute("data-md-level") && nav.item(i).getAttribute("data-md-component")) {
            nav.item(i).style.display = 'block';
            nav.item(i).style.overflow = 'visible';
        }
    }

    var nav = document.getElementsByClassName("md-nav__toggle");
    for(var i = 0; i < nav.length; i++) {
      nav.item(i).checked = true;
    }
}

function removeEditButton() {
  var editBtn = document.querySelector('a[title="Edit this page"]');
  if ( editBtn !== null ) editBtn.remove();
}

function scrollPast() {
  document.querySelector('.md-content__inner').style.marginBottom = window.innerHeight/2 + 'px';
}

function lityCustomization() {
  $(document).on('lity:ready', function(e, instance) {
    var desc = (instance.opener() && instance.opener().data('lity-desc')) || '';

    if (desc !== '') {
        instance.element().find('.lity-wrap').append('<div class="lity-description">' + desc + '</div>');
    }
  });
}
