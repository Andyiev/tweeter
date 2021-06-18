/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461116232227
    }
  ]

  const renderTweets = function (tweets) {
    //console.log("=====tweets====", tweets);
    // loops through tweets
    for (let oneTweet of tweets) {
      //  console.log("oneTweet - ",oneTweet);
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('.tweet-container').append(createTweetElement(oneTweet));
    }
  }

  const createTweetElement = function (tweet) {
    const $tweet = $(".tweet-container");
    //  console.log($tweet);
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
  //const $tweet = createTweetElement(tweetData);
  // Test / driver code (temporary)
  //console.log($tweet); // to see what it looks like
  //$('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  renderTweets(data);
});