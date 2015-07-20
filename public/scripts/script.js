$(function() {

    $('.newly-added').masonry({
    // options
    itemSelector: '.art-images',
    columnWidth: 200
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
        $('#newly-added').prepend($postHtml);
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



