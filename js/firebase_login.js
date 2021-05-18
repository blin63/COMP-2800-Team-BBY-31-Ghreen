/* welcome start
* This welcome block of code was adapted from Carly's tech-mini #3, the link to that is no longer available but I
* have the link to the source she used here: 
* source: https://firebase.google.com/docs/web/setup#from-the-cdn */

var login = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;
      if (authResult.additionalUserInfo.isNewUser) {         //if new user
        db.collection("users").doc(user.uid).set({         //write to firestore
          name: user.displayName,                    //"users" collection
          email: user.email,                          //with authenticated user's ID (user.uid)
          baseline: {
            'number of people': 0,
            'size of home': 'none',
            'types of meals': [],
            'dishwasher usage': 'none',
            'purchases': 0,
            'garbage bags': 0,
            'type of garbage': [],
            'personal vehicle': 0,
            'public transit': 0,
            'flights': 'none'
          }
        }).then(function () {
          console.log("New user added to firestore");
          window.location.assign("beginQuestionnaire.html");
        })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'main.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

login.start('#firebaseui-auth-container', uiConfig);

/* welcome end
* source: https://firebase.google.com/docs/web/setup#from-the-cdn */
