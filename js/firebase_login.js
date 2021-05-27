/* welcome start
* This welcome block of code was adapted from Carly's tech-mini #3, the link to that is no longer available but I
* have the link to the source she used here: 
* source: https://firebase.google.com/docs/web/setup#from-the-cdn */

var login = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;
      if (authResult.additionalUserInfo.isNewUser) {
        db.collection("users").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          Q0: 0,
          Q1: 0,
          Q2: 0,
          Q3: 0,
          Q4: 0,
          Q5: 0,
          Q6: 0,
          Q7: 0,
          Q8: 0,
          Q9: 0,
          scoreCurrent: 0,
          scoreOld: 0,
          scoreChange: 0,
          progressBar: 0,
          userTasks: [],
          rewards: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          rewardCount: 0
        }).then(function () {
          console.log("New user added to firestore");
          window.location.assign("survey_page_0.html");
        })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
        return true;
      }
      if (user) {
        return true
      } else {
        return false;
      }
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
    firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'tos.html',
  privacyPolicyUrl: 'privacy_policy.html'
};

login.start('#firebaseui-auth-container', uiConfig);


/* welcome end
* source: https://firebase.google.com/docs/web/setup#from-the-cdn */
