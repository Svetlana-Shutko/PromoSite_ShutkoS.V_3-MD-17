(function(){
  var DESIGN_WIDTH = 1920;
  var DESIGN_HEIGHT = 8244;
  var outer = document.getElementById('stageOuter');
  var stage = document.getElementById('stage');
  stage.style.width = DESIGN_WIDTH + 'px';
  stage.style.height = DESIGN_HEIGHT + 'px';

  function resize(){
    var scale = outer.clientWidth / DESIGN_WIDTH;
    stage.style.transform = 'scale(' + scale + ')';
    outer.style.height = (DESIGN_HEIGHT * scale) + 'px';
  }
  window.addEventListener('resize', resize);
  resize();
})();

(function(){
  var win = document.getElementById('cardsWindow');
  var track = document.getElementById('cardsTrack');
  var bar = document.getElementById('progressBar');
  var fill = document.getElementById('progressFill');

  function maxTrackOffset(){
    return Math.max(0, track.offsetWidth - win.offsetWidth);
  }

  function setRatio(ratio, smooth){
    if (ratio < 0) ratio = 0;
    if (ratio > 1) ratio = 1;

    track.style.transition = smooth ? 'transform 0.35s ease' : 'none';
    fill.style.transition = smooth ? 'transform 0.35s ease' : 'none';

    var trackOffset = ratio * maxTrackOffset();
    var fillOffset = ratio * (bar.offsetWidth - fill.offsetWidth);

    track.style.transform = 'translateX(-' + trackOffset + 'px)';
    fill.style.transform = 'translateX(' + fillOffset + 'px)';
  }

  setRatio(0, false);
  window.addEventListener('resize', function(){ setRatio(0, false); });

  function ratioFromEvent(e){
    var rect = bar.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return (clientX - rect.left) / rect.width;
  }

  bar.addEventListener('click', function(e){
    setRatio(ratioFromEvent(e), true);
  });

  var dragging = false;

  fill.addEventListener('mousedown', function(e){ dragging = true; e.preventDefault(); });
  fill.addEventListener('touchstart', function(){ dragging = true; });

  window.addEventListener('mousemove', function(e){
    if (dragging) setRatio(ratioFromEvent(e), false);
  });
  window.addEventListener('touchmove', function(e){
    if (dragging) setRatio(ratioFromEvent(e), false);
  });
  window.addEventListener('mouseup', function(){ dragging = false; });
  window.addEventListener('touchend', function(){ dragging = false; });
})();
