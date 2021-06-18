/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  $(".new-tweet form").submit(function (event) {
    event.preventDefault()
    if ($("#tweet-text").val().length < 1) {
      alert("The field cannot be empty!");
      console.log(" Empty field!");
    } else if ($("#tweet-text").val().length > 140) {
      alert("There are to many characters. Please do not type!");
      console.log(" Too much!");
    } else {
      alert("Submitted");
    $.post("/tweets", $(".new-tweet form").serialize())
      .then(() => {
        loadtweets();
      })
      .catch((err) => {
        console.log(`err loading articles: ${err}`)
      })
    }
  });

  const loadtweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: "json" })
      .then(function (data) {
        console.log('Success: ',data);
        renderTweets(data);
    });
  };
  
  loadtweets();

  const renderTweets = function (tweets) {
    // loops through tweets
    $(".tweet-container").empty();
    for (let oneTweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('.tweet-container').append(createTweetElement(oneTweet));
    }
  }

  const createTweetElement = function (tweet) {
    //const $tweet = $(".tweet-container");
    const html = ` 
  <article class="tweet">
  <div class=username> 
    <span><img src="${tweet.user.avatars}">"${tweet.user.name}"</span>
    <span>"${tweet.user.handle}"</span>
  </div>
  <div class=text-in></div>
    <p>"${tweet.content.text}"</p>
  </div>
    <dev class="tweet-bottom"></dev>
    <footer class="tweet-footer">
      <span id="footer-date">"${tweet.created_at}"</span>
      <dev class="tweet-emoji">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </dev>
    </footer>
  </article>`;
    return html;
    //return $tweet.append(html); Was for one element for previouse task
  };
});