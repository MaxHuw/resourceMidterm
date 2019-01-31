//fetches new comments from comments page
function loadComments() {
  $('.posted-comments').empty();
  $.ajax({
    method: "GET",
    url: "/comments",
    dataType: "json"
  })
    .done(function (commentData) {
      rendercomments(commentData);
    })
}

//Displays all comments
function renderComments(comments) {
  // loops through comments
  for (let comment = 0; comment < comments.length; comment++) {
    // calls createCommentElement for each comment
    // takes return value and appends it to the comments container
    $('.container .posted-comments').prepend(createCommentElement(comments[comment]))
  }
}

//Creates individual comment container (usernamename, avatar, comment, rating) after comment is submitted
function createCommentElement(comment) {
  var $commentPassed = `
  <article class="posted-comment">
      <header>
          <img src=${comment.user.avatars}>
          <h2>${comment.user.name}</h2>
      </header >
          <div class="comment-space">
              <p>${escape(comment.content.text)}</p>
          </div>
          <footer>
              ${moment(comment.created_at).fromNow()}
          </footer >
  </article >`
  return $commentPassed;
}

$(document).ready(function () {

  loadComments();


  // Ajax post request to submit comments
  $('.new-tweet form').on('submit', function (event) {
    var counter = +$(this).children('.counter')['0'].textContent
    event.preventDefault()
    if (counter === 140) {
      $('.container .new-tweet .error-msg').text("You didn't type anything!");
    }
    else if (counter < 0) {

      $('.container .new-tweet .error-msg').text("Your tweet is over the 140 characters!");
    }
    else {
      $('.container .new-tweet .error-msg').text("");
      //once a form is submitted loadedTweets only prepends the most recent post
      firstLoad = false;
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      })
        .done(function () {
          loadTweets()
          $('.new-tweet form textarea').val('');
        })
    }
  });

});