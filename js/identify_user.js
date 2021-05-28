/* welcome start
 * This welcome block of code was adapted from Carly's code found here: 
 * source: https://www.notion.so/Demo-5-tech-gems-0201151b6cd64230adc213c617887c5f */

function welcome() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var a = doc.data().name;
                    $("#user").text(a);
                })
        }
    });
}
welcome();

/* welcome end 
 * source: https://www.notion.so/Demo-5-tech-gems-0201151b6cd64230adc213c617887c5f */