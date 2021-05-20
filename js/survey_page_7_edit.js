document.getElementById("confirm").addEventListener('click', function () {
    console.log("confirm clicked");
    calculateUserChoice();

    /* if (!valid) {
        alert("Please select an option");
        return;

    } else { */
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("Value = " + value);

        /* Found this code from the official firebase guide on how to handle promises
         * using return and .then =>
         * source: https://firebase.google.com/docs/functions/terminate-functions
         */
        return db.collection("users").doc(user.uid).update({
            'Q6': value
        }).then(() => {
            return db.collection("users").doc(user.uid)
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
                    scoreChange: 100 * (score - doc.data().scoreCurrent) / (doc.data().scoreCurrent),
                    scoreOld: doc.data().scoreCurrent,
                    scoreCurrent: score
                }).then(function () {
                    console.log("Old Score: " + doc.data().scoreOld
                        + "\n" + "New Score: " + doc.data().scoreCurrent
                        + "\n" + "Change: " + doc.data().scoreChange);
                })
                    .catch(function (error) {
                        console.log("Error updating data: " + error);
                    });
                document.location.href = 'edit_answers.html'
            })
        });
        /* promise end 
         * source: https://firebase.google.com/docs/functions/terminate-functions
         */
    })
    /* } */
});

var valid = false;
var value = 24;
/* getUserChoice start
* I modified Carly's original code which was can be found here: 
* source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7 
* */
function calculateUserChoice() {
    console.log("getUserChoice() called");

    if (document.getElementById("b1").checked == true) {
        console.log("button 1 clicked");
        valid = true;
        value -= 4;
    }

    if (document.getElementById("b2").checked == true) {
        console.log("button 2 clicked");
        valid = true;
        value -= 4;
    }

    if (document.getElementById("b3").checked == true) {
        console.log("button 3 clicked");
        valid = true;
        value -= 4;
    }

    if (document.getElementById("b4").checked == true) {
        console.log("button 4 clicked");
        valid = true;
        value -= 4;
    }

    if (document.getElementById("b5").checked == true) {
        console.log("button 5 clicked");
        valid = true;
        value -= 4;
    }

    if (document.getElementById("b6").checked == true) {
        console.log("button 6 clicked");
        valid = true;
        value -= 4;
    }
}
/* getUserChoice end
 * source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7
 */