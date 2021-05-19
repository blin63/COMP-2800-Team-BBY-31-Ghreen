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


/* Extract data start
* This block of code was adapted from Carly's code found here: 
* source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7 
*/
function calculateCarbonFootprintScore() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var score = doc.data().Q0
                              + doc.data().Q1
                              + doc.data().Q2
                              + doc.data().Q3
                              + doc.data().Q4
                              + doc.data().Q5
                              + doc.data().Q6
                              + doc.data().Q7
                              + doc.data().Q8
                              + doc.data().Q9;
                    $("#user-score").text(score);
                })
        }
    });
}
calculateCarbonFootprintScore();

/* Extract data end 
* source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7 */