/* redirect start (this code will redirect to index if no user is signed in)
 * This welcome block of code was adapted from Carly's code found here: 
 * source: https://www.notion.so/Demo-5-tech-gems-0201151b6cd64230adc213c617887c5f */

function redirect() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    console.log(doc.data().name);
                })
        } else {
            window.location.assign("index.html");
        }
    });
}
redirect();

/* redirect end 
 * source: https://www.notion.so/Demo-5-tech-gems-0201151b6cd64230adc213c617887c5f */