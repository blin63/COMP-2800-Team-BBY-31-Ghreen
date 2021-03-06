document.getElementById("confirm").addEventListener('click', function () {
    console.log("confirm clicked");
    getUserChoice();

    if (value == -1) {
        alert("Please select an option");
        return;

    } else {
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("Value = " + value);

            /* Found this code from the official firebase guide on how to handle promises
             * using return and .then =>
             * source: https://firebase.google.com/docs/functions/terminate-functions
             */
            return db.collection("users").doc(user.uid).update({
                'Q9': value
            }).then(() => {
                return db.collection("users").doc(user.uid)
                    .get()
                    .then(function (doc) {
                        var score = doc.data().Q0 +
                            doc.data().Q1 +
                            doc.data().Q2 +
                            doc.data().Q3 +
                            doc.data().Q4 +
                            doc.data().Q5 +
                            doc.data().Q6 +
                            doc.data().Q7 +
                            doc.data().Q8 +
                            doc.data().Q9;
                        db.collection("users").doc(user.uid).update({
                                scoreOld: doc.data().scoreCurrent,
                                scoreCurrent: score,
                                scoreChange: 100 * ((doc.data().scoreCurrent - doc.data().scoreOld) / doc.data().scoreOld)
                            }).then(function () {
                                console.log("Old Score: " + doc.data().scoreOld +
                                    "\n" + "New Score: " + doc.data().scoreCurrent +
                                    "\n" + "Change: " + doc.data().scoreChange);
                            })
                            .catch(function (error) {
                                console.log("Error updating data: " + error);
                            });
                        document.location.href = 'survey_page_complete.html'
                    })
            });
            /* promise end 
             * source: https://firebase.google.com/docs/functions/terminate-functions
             */
        })
    }
});

var value = -1;
/* getUserChoice start
 * I modified Carly's original code which was can be found here: 
 * source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7 
 * */
function getUserChoice() {
    console.log("getUserChoice() called");

    if (document.getElementById("b1").checked == true) {
        console.log("button 1 clicked");
        value = 20;
    }

    if (document.getElementById("b2").checked == true) {
        console.log("button 2 clicked");
        value = 6;
    }

    if (document.getElementById("b3").checked == true) {
        console.log("button 3 clicked");
        value = 2;
    }

    if (document.getElementById("b4").checked == true) {
        console.log("button 4 clicked");
        value = 0;
    }
}
/* getUserChoice end
 * source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7
 */