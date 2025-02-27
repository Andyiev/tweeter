/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // submits a new tweet
  $(".new-tweet form").submit(function (event) {
    event.preventDefault();
    $(".errorMessages").slideUp("slow");
    if ($("#tweet-text").val().length < 1) {
      $(".errorMessages").text("Sorry, this field cannot be empty! Please type.");
      $(".errorMessages").slideDown("slow");
      //console.log(" Empty field!");
    } else if ($("#tweet-text").val().length > 140) {
      $(".errorMessages").text("There are to many characters. It should not be more then 140.");
      $(".errorMessages").slideDown("slow");
      //console.log(" Too much!");
    } else {
      //alert("Submitted");
      ///console.log($("#tweet-text").val());
      $.post("/tweets", $(".new-tweet form").serialize())
        .then(() => {
          loadtweets();
        })
        .catch((err) => {
          console.log(`err loading articles: ${err}`);
        });
      $("form")[0].reset();
      $(".counter").html("140");
    }
  });

  // calls to show the submitted tweet
  const loadtweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: "json" })
      .then(function (data) {
        //console.log('Success: ',data);
        renderTweets(data);
      });
  };

  // protects from xss when submitting a new tweet
  const escape = function(str) {
    //console.log(" this inside of escape - INPUT ", str);
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // cals the rendering tweets to the screen with a new one just submitted
  const renderTweets = function(tweets) {
    $(".tweet-container").empty();
    for (let oneTweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container at the begginng of it
      $('.tweet-container').prepend(createTweetElement(oneTweet));
    }
  };
  
  // renders tweets on the screen
  const createTweetElement = function(tweet) {
    const html = ` 
    <article class="tweet">
    <div class=username> 
    <span><img src="${tweet.user.avatars}">"${tweet.user.name}"</span>
    <span>"${tweet.user.handle}"</span>
    </div>
    <div class=text-in></div>
    <p>"${escape(tweet.content.text)}"</p>
    </div>
    <dev class="tweet-bottom"></dev>
    <footer class="tweet-footer">
    <span id="footer-date">${timeago.format(tweet.created_at)}</span>
    <dev class="tweet-emoji">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </dev>
    </footer>
    </article>`;
    return html;
  };
  
  // loads tweet samples from initial-tweets.json when app starts
  loadtweets();

});