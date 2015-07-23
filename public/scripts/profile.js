// profile JS
// $(function() {

//     var artistsController = {

//         // userTemplate: _.template($('#user-template').html()),
//         postTemplate: _.template($('#user-submission-template').html()),

//     show: function() {
//         // get current user (logged in)
//         $.get('/api/users/current', function(user) {
//             $artistHtml = $(artistsController.userTemplate({currentUser: user}));
//             $('#show-user').append($artistHtml);
//             _.each(user.posts, function(post, index) {
//                 $postHtml = $(artistsController.postTemplate(post));
//             $('#user-post-list').prepend($postHtml);
//             });
//         });
//     },

//     // create post for logged in user
//     createPost: function(artistData, designData, imgData) {
//       // define new object with postData
//       var postData = {design: designData, artFile: imgData};
      
//       // POST AJAX call
//       $.post('/api/users/current/posts', postData, function(newPost) {
        
//         // underscore template
//         var $postHtml = $(artistsController.postTemplate(newPost));

//         // prepends new artpost to the view
//         $('.newly-added').prepend($postHtml);
//       });
//     },

//     setupView: function() {
//       // render all the art posts to page
//       artistsController.show();

//       // prevent default on submit
//       $('#new-submission').on('submit', function(event) {
//         event.preventDefault();
        
//         // grab values from post form
//         var artTitle = $('#art-title').val();
//         var imgUrl = $('#img-url').val();

//         // create new post
//         artistsController.createPost(artistName, artTitle, imgUrl);

//         // reset the form
//         $(this)[0].reset();
//         $('#artist-name').focus();
//       });
//     }
//   };

//   postsController.setupView();

// });

