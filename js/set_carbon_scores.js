/* welcome start
* This welcome block of code was adapted from Carly's tech-mini #3, the link to that is no longer 
* available but I have the link to the source she used here: 
* source: https://firebase.google.com/docs/web/setup#from-the-cdn 
*
* Extract data start
* I also used another source from Carly:
* source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7

*/

function setCarbonScores() {
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

                    db.collection("users").doc(user.uid).update({
                        scoreOld: doc.data().scoreCurrent,
                        scoreCurrent: score,
                        scoreChange: 100 * (doc.data().scoreCurrent - doc.data().scoreOld) / (doc.data().scoreCurrent + doc.data().scoreOld)
                    }).then(function () {
                        console.log("Old Score: " + doc.data().scoreOld 
                        + "\n" + "New Score: " + doc.data().scoreCurrent 
                        + "\n" + "Change: " + doc.data().scoreChange);
                    })
                        .catch(function (error) {
                            console.log("Error updating data: " + error);
                        });
                })
        }
    });
}
setCarbonScores();

/* welcome end
* source: https://firebase.google.com/docs/web/setup#from-the-cdn
*
* Extract data end
* source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7
*/
