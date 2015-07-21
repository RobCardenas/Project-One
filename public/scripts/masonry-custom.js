$(function() {
  // init Masonry after all images have loaded
  var $grid = $('.newly-added').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.art-images',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    }); 
  });
});