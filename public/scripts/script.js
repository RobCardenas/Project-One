$(function() {

      // init Masonry after all images have loaded
  var $grid = $('.newly-added').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.art-images',
      columnWidth: '.art-images',
      gutter: '.gutter-sizer',
      percentPosition: true,
      isAnimated: !Modernizr.csstransitions
    });
  });

  $('#signUpForm').validate({
       errorClass: "my-error-class",
       validClass: "my-valid-class"
    });
  $('#loginForm').validate({
       errorClass: "my-error-class",
       validClass: "my-valid-class"
    });


  // postsController holds functionality
  var postsController = {
    
    // compile underscore template
    template: _.template($('#submission-template').html()),

    // get all posts
    all: function() {
      // AJAX call to server to GET /api/posts
      $.get('/api/posts', function(allPosts) {
        
        // iterate through all posts
        _.each(allPosts, function(post, index) {
          
          // underscore template
          var $postHtml = $(postsController.template(post));
          
          // prepend newly added post to HTML to page
          $('.newly-added').prepend($postHtml);
        });
      });
    },

    // create new art post
    create: function(artistData, designData, imgData) {
      // define new object with postData
      var postData = {artist: artistData, design: designData, artFile: imgData};
      
      // POST AJAX call
      $.post('/api/posts', postData, function(newPost) {
        
        // underscore template
        var $postHtml = $(postsController.template(newPost));

        // prepends new artpost to the view
        $('.newly-added').prepend($postHtml);
      });
    },

    setupView: function() {
      // render all the art posts to page
      postsController.all();

      // prevent default on submit
      $('#new-submission').on('submit', function(event) {
        event.preventDefault();
        
        // grab values from post form
        var artistName = $('#artist-name').val();
        var artTitle = $('#art-title').val();
        var imgUrl = $('#img-url').val();

        // create new post
        postsController.create(artistName, artTitle, imgUrl);

        // reset the form
        $(this)[0].reset();
        $('#artist-name').focus();
      });
    }
  };

  postsController.setupView();

});

(function ($) {
    "use strict";
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
        offset       = ($(window).height() - $dialog.height()) / 2,
        bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if(offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });
})(jQuery);









