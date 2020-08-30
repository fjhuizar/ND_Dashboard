/*!
 * Load ND icons
 */
!function(e,t){"use strict";if(!t.createElementNS||!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect)return!0;var n,a,s="localStorage"in e&&null!==e.localStorage,o=function(){t.body.insertAdjacentHTML("afterbegin",a)},i=function(){t.body?o():t.addEventListener("DOMContentLoaded",o)};if(s&&1==localStorage.getItem("inlineSVGrev")&&(a=localStorage.getItem("inlineSVGdata")))return i(),!0;try{(n=new XMLHttpRequest).open("GET","/stylesheets/themes/ndt/v3/images/icons-nd-base.svg",!0),n.onload=function(){n.status>=200&&n.status<400&&(a=n.responseText,i(),s&&(localStorage.setItem("inlineSVGdata",a),localStorage.setItem("inlineSVGrev",1)))},n.send()}catch(e){}}(window,document);var icons=document.querySelectorAll("span.icon");for(i=0;i<icons.length;i++){var el=icons[i],className=el.getAttribute("class"),dataIcon=el.getAttribute("data-icon"),svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),use=document.createElementNS("http://www.w3.org/2000/svg","use");use.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#icon-"+dataIcon),svg.setAttribute("class",className),svg.setAttribute("data-icon",dataIcon),svg.appendChild(use),el.parentNode.replaceChild(svg,el)}

// IE safe forEach method
var forEach = function(array, callback, scope){
  for (var i = 0; i < array.length; i++){
    callback.call(scope, i, array[i]);
  }
};

/*!
 * Responsive wrapper embeds, iframes, etc
 * @author Erik Runyon
 * Updated 2016-06-03
 * Requires site.css
 * Inspired by https://gist.github.com/davatron5000/e9ef20f1d2ba4d9099711064c644d155
 */
function fitEmbed(embeds){
  for(var i=0; i<embeds.length; i++) {
    var embed = embeds[i],
        width = embed.getAttribute('width'),
        height = embed.getAttribute('height'),
        aspectRatio = height/width,
        parentDiv = embed.parentNode,
        divOuter = document.createElement('div'),
        divInner = document.createElement('div')
    ;

    embed.removeAttribute('height');
    embed.removeAttribute('width');

    // Prevents the embed from exceeding the intial width
    divOuter.className = 'embed-outer';
    divOuter.style.maxWidth = width + 'px';
    divInner.className = 'embed-inner';
    divInner.style.paddingBottom = aspectRatio * 100 + '%';
    divOuter.appendChild(divInner);

    embed.parentNode.replaceChild(divOuter, embed);
    parentDiv.style.width = width + 'px';
    divInner.appendChild(embed);
  }
}
var sources = [
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="vimeo.com"]'
    ],
    embeds = document.querySelectorAll(sources.join(','))
;
if(embeds.length) {
  fitEmbed(embeds);
}

/*!
 * Video Placeholder
 * @author Erik Runyon
 * Updated 2020-01-24 SMM
 */

document.addEventListener('DOMContentLoaded', function(){
  forEach(document.body.querySelectorAll('.video'), function(index, item) {
    var video = item,
        play_button = document.createElement('div')
    ;
    play_button.setAttribute('class', 'play');

    video.appendChild(play_button);
    video.addEventListener('click', loadVideo, false);
  });

  function loadVideo(e){
    e.preventDefault();

    var el = this,
        ww = window.innerWidth,
        img = el.getElementsByTagName('img')[0],
        ratio = img.height / img.width,
        w = img.width,
        h = Math.floor(w * ratio),
        href = el.getAttribute('href'),
        service = (href.indexOf('vimeo') >= 0) ? 'vimeo' : 'youtube',
        baseurl = (service == 'youtube') ? 'https://www.youtube.com/embed/' : 'https://player.vimeo.com/video/',
        id = (service == 'youtube') ? getURLParameter('v', href) : href.split('/').pop()
    ;

    if (el.classList.contains('lightbox')) return;

    try { ga('send', 'event', 'Play Video', href); } catch(err) {}
    el.parentNode.innerHTML = '<iframe data-init="false" width="' + w + '" height="' + h + '" frameborder="0" src="' + baseurl + id + '?autoplay=1&amp;rel=0&amp;wmode=transparent&amp;vq=hd720" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

    fitEmbed(document.querySelectorAll('iframe[data-init="false"]'));
    document.querySelectorAll('iframe[data-init="false"]')[0].setAttribute('data-init', true);
  }
});

document.addEventListener('DOMContentLoaded', function(){
  // Add lock to nav items
  var lockString = '<svg class="icon" data-icon="lock"><use xlink:href="#icon-lock"></use></svg>';
  forEach(document.querySelectorAll('.nav-site .protected > a'), function(i, item){
    span = document.createElement('span');
    span.innerHTML = lockString;
    item.insertBefore(span, item.firstChild);
  });

  // Analytics

  // Home: Big 4
  forEach(document.querySelectorAll('.home .home-icn-card a[data-ga-title]'), function(index, item) {
    item.addEventListener('click', function(e){
      e.preventDefault();
      try{ ga('send','event','UserAction','HomepageIcons', e.target.getAttribute('data-ga-title')) } catch(err){}
      setTimeout(function() {
        document.location.href = e.target.href;
      }, 100);
    }, false);
  });

  // Home: Buttons
  forEach(document.querySelectorAll('.home .btn:not(.lightbox)[data-ga-title]'), function(index, item) {
    item.addEventListener('click', function(e){
      e.preventDefault();
      try{ ga('send','event','UserAction','HomepageButtons', e.target.getAttribute('data-ga-title')) } catch(err){}
      setTimeout(function() {
        document.location.href = e.target.href;
      }, 100);
    }, false);
  });

  // Downloads
  forEach(document.querySelectorAll('.download-section a'), function(index, item) {
    item.addEventListener('click', function(e){
      e.preventDefault();
      try{ ga('send','event','UserAction','PosterDownload', e.target.href) } catch(err){}
      setTimeout(function() {
        document.location.href = e.target.href;
      }, 100);
    }, false);
  });
}, false);

/*!
 * simpleLightbox
 * https://github.com/dbrekalo/simpleLightbox
 * Copyright (c) 2018 Damir Brekalo
 */
!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.SimpleLightbox=e()}(this,function(){function e(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];if(n)for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i])}return t}function i(t,e){t&&e&&(t.className+=" "+e)}function s(t,e){t&&e&&(t.className=t.className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)")," ").trim())}function o(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.childNodes[0]}function l(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector).call(t,e)}function r(t){this.init.apply(this,arguments)}return r.defaults={elementClass:"",elementLoadingClass:"slbLoading",htmlClass:"slbActive",closeBtnClass:"",nextBtnClass:"",prevBtnClass:"",loadingTextClass:"",closeBtnCaption:"Close",nextBtnCaption:"Next",prevBtnCaption:"Previous",loadingCaption:"Loading...",bindToItems:!0,closeOnOverlayClick:!0,closeOnEscapeKey:!0,nextOnImageClick:!0,showCaptions:!0,captionAttribute:"title",urlAttribute:"href",startAt:0,loadingTimeout:100,appendTarget:"body",beforeSetContent:null,beforeClose:null,afterClose:null,beforeDestroy:null,afterDestroy:null,videoRegex:new RegExp(/youtube.com|vimeo.com/)},e(r.prototype,{init:function(n){n=this.options=e({},r.defaults,n);var t,i=this;n.$items&&(t=n.$items.get()),n.elements&&(t=[].slice.call("string"==typeof n.elements?document.querySelectorAll(n.elements):n.elements)),this.eventRegistry={lightbox:[],thumbnails:[]},this.items=[],this.captions=[],t&&t.forEach(function(t,e){i.items.push(t.getAttribute(n.urlAttribute)),i.captions.push(t.getAttribute(n.captionAttribute)),n.bindToItems&&i.addEvent(t,"click",function(t){t.preventDefault(),i.showPosition(e)},"thumbnails")}),n.items&&(this.items=n.items),n.captions&&(this.captions=n.captions)},addEvent:function(t,e,n,i){return this.eventRegistry[i||"lightbox"].push({element:t,eventName:e,callback:n}),t.addEventListener(e,n),this},removeEvents:function(t){return this.eventRegistry[t].forEach(function(t){t.element.removeEventListener(t.eventName,t.callback)}),this.eventRegistry[t]=[],this},next:function(){return this.showPosition(this.currentPosition+1)},prev:function(){return this.showPosition(this.currentPosition-1)},normalizePosition:function(t){return t>=this.items.length?t=0:t<0&&(t=this.items.length-1),t},showPosition:function(t){var e=this.normalizePosition(t);return void 0!==this.currentPosition&&(this.direction=e>this.currentPosition?"next":"prev"),this.currentPosition=e,this.setupLightboxHtml().prepareItem(this.currentPosition,this.setContent).show()},loading:function(t){var e=this,n=this.options;t?this.loadingTimeout=setTimeout(function(){i(e.$el,n.elementLoadingClass),e.$content.innerHTML='<p class="slbLoadingText '+n.loadingTextClass+'">'+n.loadingCaption+"</p>",e.show()},n.loadingTimeout):(s(this.$el,n.elementLoadingClass),clearTimeout(this.loadingTimeout))},prepareItem:function(t,e){var n=this,i=this.items[t];if(this.loading(!0),this.options.videoRegex.test(i))e.call(n,o('<div class="slbIframeCont"><iframe class="slbIframe" frameborder="0" allow="autoplay; fullscreen"src="'+i+'"></iframe></div>'));else{var s=o('<div class="slbImageWrap"><img class="slbImage" src="'+i+'" /></div>');this.$currentImage=s.querySelector(".slbImage"),this.options.showCaptions&&this.captions[t]&&s.appendChild(o('<div class="slbCaption">'+this.captions[t]+"</div>")),this.loadImage(i,function(){n.setImageDimensions(),e.call(n,s),n.loadImage(n.items[n.normalizePosition(n.currentPosition+1)])})}return this},loadImage:function(t,e){if(!this.options.videoRegex.test(t)){var n=new Image;e&&(n.onload=e),n.src=t}},setupLightboxHtml:function(){var t=this.options;return this.$el||(this.$el=o('<div class="slbElement '+t.elementClass+'"><div class="slbOverlay"></div><div class="slbWrapOuter"><div class="slbWrap"><div class="slbContentOuter"><div class="slbContent"></div><button type="button" title="'+t.closeBtnCaption+'" class="slbCloseBtn '+t.closeBtnClass+'">×</button>'+(1<this.items.length?'<div class="slbArrows"><button type="button" title="'+t.prevBtnCaption+'" class="prev slbArrow'+t.prevBtnClass+'">'+t.prevBtnCaption+'</button><button type="button" title="'+t.nextBtnCaption+'" class="next slbArrow'+t.nextBtnClass+'">'+t.nextBtnCaption+"</button></div>":"")+"</div></div></div></div>"),this.$content=this.$el.querySelector(".slbContent")),this.$content.innerHTML="",this},show:function(){return this.modalInDom||(document.querySelector(this.options.appendTarget).appendChild(this.$el),i(document.documentElement,this.options.htmlClass),this.setupLightboxEvents(),this.modalInDom=!0),this},setContent:function(t){var e="string"==typeof t?o(t):t;return this.loading(!1),this.setupLightboxHtml(),s(this.$content,"slbDirectionNext"),s(this.$content,"slbDirectionPrev"),this.direction&&i(this.$content,"next"===this.direction?"slbDirectionNext":"slbDirectionPrev"),this.options.beforeSetContent&&this.options.beforeSetContent(e,this),this.$content.appendChild(e),this},setImageDimensions:function(){this.$currentImage&&(this.$currentImage.style.maxHeight=("innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight)+"px")},setupLightboxEvents:function(){var n=this;return this.eventRegistry.lightbox.length||this.addEvent(this.$el,"click",function(t){var e=t.target;l(e,".slbCloseBtn")||n.options.closeOnOverlayClick&&l(e,".slbWrap")?n.close():l(e,".slbArrow")?l(e,".next")?n.next():n.prev():n.options.nextOnImageClick&&1<n.items.length&&l(e,".slbImage")&&n.next()}).addEvent(document,"keyup",function(t){n.options.closeOnEscapeKey&&27===t.keyCode&&n.close(),1<n.items.length&&((39===t.keyCode||68===t.keyCode)&&n.next(),(37===t.keyCode||65===t.keyCode)&&n.prev())}).addEvent(window,"resize",function(){n.setImageDimensions()}),this},close:function(){this.modalInDom&&(this.runHook("beforeClose"),this.removeEvents("lightbox"),this.$el&&this.$el.parentNode.removeChild(this.$el),s(document.documentElement,this.options.htmlClass),this.modalInDom=!1,this.runHook("afterClose")),this.direction=void 0,this.currentPosition=this.options.startAt},destroy:function(){this.close(),this.runHook("beforeDestroy"),this.removeEvents("thumbnails"),this.runHook("afterDestroy")},runHook:function(t){this.options[t]&&this.options[t](this)}}),r.open=function(t){var e=new r(t);return t.content?e.setContent(t.content).show():e.showPosition(e.options.startAt)},r.registerAsJqueryPlugin=function(i){i.fn.simpleLightbox=function(t){var e,n=this;return this.each(function(){i.data(this,"simpleLightbox")||(e=e||new r(i.extend({},t,{$items:n})),i.data(this,"simpleLightbox",e))})},i.SimpleLightbox=r},"undefined"!=typeof window&&window.jQuery&&r.registerAsJqueryPlugin(window.jQuery),r});

/**
 * Videos
**/
(function () {

  /* Instantiate Lightbox */
  var lightbox = new SimpleLightbox({
    elements: '.lightbox',
    nextOnImageClick: false,
    appendTarget: ".lightbox-wrapper",
    beforeSetContent: function(a, b) { showLightbox(); },
    beforeDestroy: function() { hideLightbox(); },
    beforeClose: function() { hideLightbox(); }
  });

  var lightboxWrapper = document.querySelector('.lightbox-wrapper');
  var headerBgVideo = document.querySelector('.header-bg-video');

  var showLightbox = function () {
    lightboxWrapper.classList.add('visible');
    if (headerBgVideo) headerBgVideo.pause();
  };

  var hideLightbox = function () {
    lightboxWrapper.classList.remove('visible');
    if (headerBgVideo) headerBgVideo.play();
  };
  var videos = Array.prototype.slice.call(document.querySelectorAll('.lightbox[href^="https://www.youtube.com"]'));
  var lightboxShare = document.querySelector("#lighbox-share");

  if (!videos || !lightboxShare) return;

  /* Video handlers */
  videos.forEach(function(item) {
    item.addEventListener('click', function() {

      var youtubeID = item.getAttribute('data-youtube-id');
      var url = encodeURIComponent("https://www.youtube.com/watch?v=" + youtubeID);
      var title = encodeURIComponent(item.getAttribute('data-title'));

      // GA
      try{
        var gaTitle = title;
        if (item.hasAttribute('data-ga-title'))
          gaTitle = item.getAttribute('data-ga-title');

        ga('send','event','UserAction','VideoPlay', gaTitle)
      } catch(err){}

      // Customize sharing in lightbox to video currently being played
      var shareList = document.createElement('ul');
      var shareListContent = '';
      var services = [
        {
          service: 'Facebook',
          url: 'https://www.facebook.com/dialog/share?app_id=135465433914446&display=popup&href='+ url +'&title='+ title,
          html: '<svg class="icon" data-icon="facebook"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-facebook"></use></svg>'
        },
        {
          service: 'Twitter',
          url: 'https://twitter.com/intent/tweet?text='+ title +'&url='+ url,
          html: '<svg class="icon" data-icon="twitter"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-twitter"></use></svg>'
        },
      ];

      for(var i=0; i<services.length; i++){
        shareListContent += '<li><a title="'+ services[i].service +'" class="share-'+ services[i].service.toLowerCase() +'" href="'+ services[i].url +'">'+ services[i].html +'</a></li>';
      }

      shareList.classList = 'no-bullets';
      shareList.innerHTML = shareListContent;
      shareList.addEventListener('click', function(e){
        if(e.target && e.target.tagName.toLowerCase() === 'a'){
          var service = e.target.protocol.indexOf('mailto') !== -1 ? 'email' : e.target.host;
          try{ ga('send', 'event', 'Social Share', service, title); } catch(err){}
          e.preventDefault();
          window.open(e.target.href, "_blank", "toolbar=no,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,width=600,height=400,modal=yes,alwaysRaised=yes");
        }
      }, false);

      var prevShareList = lightboxShare.querySelector('ul');
      prevShareList.remove(); // Removes previous listeners
      lightboxShare.append(shareList)
    });
  });

  /* Home - Change header video button text after play */
  headerVideoPlay = document.querySelector('.header-play a');
  if (!headerVideoPlay) return;

  headerVideoPlay.addEventListener('click', function() {
    headerVideoPlay.innerText = 'Replay video';
    headerVideoPlay.parentElement.classList.add('has-played');
  });

})();

/**
 * Animation triggers
**/
(function () {
  if (!'IntersectionObserver' in window) return;

  const homeIcons = document.querySelectorAll('.home .home-icn-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  });
  homeIcons.forEach(item => { observer.observe(item); });
})();

/**
 * Video Loader
 * Load correct video based on url params
 * Updated: 2020-07-09
 * @author Shawn Maust
**/
(function () {
  if (!getURLParameter('video')) return;

  var target = document.querySelector('#video-' + getURLParameter('video'));
  if (!target) return;

  target.click();
})();

/**
 * Video Loader
 * Load correct video based on url params
 * Updated: 2020-07-09
 * @author Shawn Maust
**/
(function () {
  if (!getURLParameter('play')) return;

  var target = document.querySelector('a[href*="' + getURLParameter('play')  + '"]');
  if (!target) return;

  target.click();
})();

/**
 * Well-Being Resource Filters
 * Shawn Maust
 * Updated 2020-08-04
**/
(function() {
  if (!document.querySelector('#form-resources')) return;

  var form = document.querySelector('#form-resources');
  var filters = Array.prototype.slice.call(document.querySelectorAll('.filter-group_checkbox'));
  var filterSets = {
    'topic': filters.filter(function(item) { return item.name == "topic" }),
    'type': filters.filter(function(item) { return item.name == "type" }),
    'audience': filters.filter(function(item) { return item.name == "audience" }),
    'source': filters.filter(function(item) { return item.name == "source" }),
  };
  var selectedFilters = { 'topic': [], 'type': [], 'audience': [], 'source': [] };
  var query = document.querySelector('#input-q');
  var reset = document.querySelector('#form-reset');
  var toggle = document.querySelector('#form-toggle');
  var toggleIcon = toggle.querySelector('span');
  var advanced = document.querySelector('#form-advanced');
  var results = Array.prototype.slice.call(document.querySelectorAll('.result-item'));
  var resultCount = Array.prototype.slice.call(document.querySelectorAll('.result-count'));
  var queryEventID = null;

  var updateSelectedFilters = function() {
    for (var key in filterSets) {
      selectedFilters[key] = [];
      filterSets[key].forEach(function(item) {
        if (item.checked) { selectedFilters[key].push(item.value); }
      });
    }
  };

  var foundDataMatch = function(item, attr, array){
    var n = array.length;
    for (var i = 0; i < n; i++) {
      if (item.getAttribute(attr).indexOf(array[i]) > -1) return true;
    }
    return false;
  };

  var foundQueryMatch = function(item, query){
    var queryParts = query.split(' ');
    for (var i = 0; i < queryParts.length; i++) {
      if (item.getAttribute('data-keywords').toLowerCase().indexOf(queryParts[i].toLowerCase()) == -1) return false;
    }
    return true;
  };

  var toggleAllFilter = function(group, allFilterPressed) {
    var hasOtherActiveFilters = false;
    var allFilter = null;

    for (var i=0; i < group.length; i++) {
      var item = group[i];

      // All options
      if (item.value == '') {
        allFilter = item;
        continue;
      }

      // Other options
      if (item.checked) {
        item.checked = !allFilterPressed;
        hasOtherActiveFilters = true;
      }
    }

    allFilter.checked = allFilterPressed || !hasOtherActiveFilters;
  }

  var clickFilterHandler = function(e) {
    var item = e.target;

    if (item.checked) {
      var filterAction = 'Filter by ' + item.name.charAt(0).toUpperCase() + item.name.slice(1); // capitalize
      var label = item.getAttribute('data-label');
      // console.log('GA send....', 'event', 'Resources Page', filterAction, label);
      try{ ga('send','event','Resource Page', filterAction, label) } catch(err){ }
    }

    toggleAllFilter(filterSets[item.name], (item.value == ''));
    filterItems();
  }

  var queryEventHandler = function(e) {
    var input = e.target;
    if (queryEventID) window.clearTimeout(queryEventID);
    if (input.value === '') return;

    queryEventID = window.setTimeout(function() {
      // console.log('GA send....', 'event', 'Resources Page', 'Keyword Search', input.value );
      try{ ga('send','event','Resource Page','Keyword Search', input.value) } catch(err){ }
      queryEventID = null;
    }, 2000)

    filterItems();
  }

  var filterItems = function(e) {
    updateSelectedFilters();
    results.forEach(function(item) {
      var show = true;

      for (var key in selectedFilters) {
        if (show && selectedFilters[key].length) {
          show = foundDataMatch(item, 'data-' + key , selectedFilters[key]);
        }
      }
      if (show && query.value.length) show = foundQueryMatch(item, query.value);

      (show) ? item.removeAttribute('hidden') : item.setAttribute('hidden','hidden');
    })
    updateCount();
  }

  var updateCount = function() {
    var count = results.filter(function(item) { return !item.hasAttribute('hidden') }).length;
    var resultsMsg = "Currently displaying " + count + " resource" + (count !== 1 ? "s" : "");
    resultCount.forEach(function(item) { item.innerHTML = resultsMsg; });
  }

  var toggleAdvanced = function(e) {
    e.preventDefault();
    if (advanced.hasAttribute('hidden')) {
      advanced.removeAttribute('hidden');
      toggleIcon.innerHTML = '[-]';
      query.focus();
    } else {
      advanced.setAttribute('hidden','hidden');
      toggleIcon.innerHTML = '[+]';
    }
  }

  var resetHandler = function(e) {
    filters.forEach(function(item) { item.checked = (item.value == ''); });
    query.value = '';
    // console.log('GA send....', 'event', 'Resources Page', 'Reset Form');
    try{ ga('send','event','Resource Page', 'Reset Form') } catch(err){ }
    window.setTimeout(filterItems, 400)
  }

  query.addEventListener('keyup', queryEventHandler);
  form.addEventListener("keydown", function(e) { if (e.key === "Enter") { e.preventDefault(); } });
  toggle.addEventListener('click', toggleAdvanced);
  reset.addEventListener('click', resetHandler);
  filters.forEach(function(item) { item.addEventListener('click', clickFilterHandler); });

  form.removeAttribute('hidden');
  toggle.removeAttribute('hidden');
  filterItems();
})();

/* Map */
(function() {
  if (typeof(LOCATIONS) === "undefined" || typeof(google) === "undefined" || !document.getElementById('map')) return;

  var latlng = new google.maps.LatLng(41.701623664539326, -86.23934424669649);
  var myOptions = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.querySelector("#map"), myOptions);
  var infowindow = new google.maps.InfoWindow({});
  var locationMarkers = {};
  var locationLinks = document.querySelectorAll('.locations-list button');
  var bounds = new google.maps.LatLngBounds();
  var greenIcon = "/stylesheets/images/map-pin-green.svg";
  var goldIcon = "/stylesheets/images/map-pin-gold.svg";

  for (var i=0; i < LOCATIONS.length; i++) {
    var location = LOCATIONS[i];
    var icon = {
        url: (location.type == "Tent") ? goldIcon : greenIcon,
    };
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.lat,location.lng),
      id: location.id,
      map: map,
      link: location.link,
      title: location.name,
      icon: icon
    });
    google.maps.event.addListener(marker, 'click', function() {
      var link = "";
      if (this.link.length) link = "<p><a href='" + this.link + "' class='btn btn-sm btn btn-inline'>Hours</a></p>";

      var html = [
        "<div class='infowindow'>",
          "<h4>"+this.title+"</h4>",
          link,
        "</div>"
      ].join("");
      infowindow.setContent(html);
      infowindow.open(map, this);
      targetID = this.id;
      window.history.replaceState(null, null, "?id="+targetID );
    });
    locationMarkers[location.id] = {"overlay":marker};
    bounds.extend(marker.position);
    map.fitBounds(bounds);
  }

  for (var i=0; i < locationLinks.length; i++) {
    locationLinks[i].addEventListener('click', (function(e){
      e.preventDefault();
      targetID = e.target.getAttribute('data-id');
      google.maps.event.trigger(locationMarkers[targetID].overlay, "click");
      window.scrollTo(0, document.querySelector("#map").offsetTop);
    }));
  }

  google.maps.event.addListener(infowindow,'closeclick',function(){
    window.history.replaceState(null, null, "?");
  });

  if(typeof getURLParameter('id') != "undefined") {
    targetID = getURLParameter('id');
    google.maps.event.trigger(locationMarkers[targetID].overlay, "click");
  }
})();
