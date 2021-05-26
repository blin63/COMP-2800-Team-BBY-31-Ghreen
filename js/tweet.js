/* 
* Twitter JavaScript API start
* I found these from the Twitter Developer Platform
* Source: https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites 
*/
window.twttr = (function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

/* 
* Twitter JavaScript API end
* *Source: https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites 
*/

/* function tweet() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("users").doc(user.uid)
        .get()
        .then(function (doc) {
          var score = doc.data().scoreCurrent;
          var tweet = "Check out this awesome app called Ghreen! My Carbon Footprint score is " + score + "! Can you beat it?"
          var link = "https://twitter.com/intent/tweet?text=" + tweet + ""
          $("#tweet-post a").href = link;
        })
    }
  })
}
tweet() */