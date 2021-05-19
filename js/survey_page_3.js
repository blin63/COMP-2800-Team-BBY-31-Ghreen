document.getElementById("confirm").addEventListener('click', function () {
    console.log("confirm clicked");
    calculateUserChoice();

    if (value == 0) {
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
                'Q2': value
            }).then(() => {
                document.location.href = 'survey_page_4.html'
            });
            /* promise end 
             * source: https://firebase.google.com/docs/functions/terminate-functions
             */
        })
    }
});

var value = 0;
/* getUserChoice start
* I modified Carly's original code which was can be found here: 
* source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7 
* */
function calculateUserChoice() {
    console.log("getUserChoice() called");

    if (document.getElementById("b1").checked == true) {
        console.log("button 1 clicked");
        value += 12;
    }

    if (document.getElementById("b2").checked == true) {
        console.log("button 2 clicked");
        value += 10;
    }

    if (document.getElementById("b3").checked == true) {
        console.log("button 3 clicked");
        value += 8;
    }

    if (document.getElementById("b4").checked == true) {
        console.log("button 4 clicked");
        value += 6;
    }

    if (document.getElementById("b5").checked == true) {
        console.log("button 5 clicked");
        value += 4;
    }

    if (document.getElementById("b6").checked == true) {
        console.log("button 6 clicked");
        value += 2;
    }
}
/* getUserChoice end
 * source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7
 */