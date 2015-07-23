$(function() {

  var navController = {

    // compile underscore template for nav links
    navTemplate: _.template($('#nav-template').html()),

    // get current (logged-in) user
    showCurrentUser: function() {
      // AJAX call to server to GET /api/users/current
      $.get('/api/users/current', function(user) {

        // pass current user through template for nav links
        $navHtml = $(navController.navTemplate({currentUser: user}));

        // append nav links HTML to page
        $('#nav-links').append($navHtml);
      });
    }
  };

  navController.showCurrentUser();

});