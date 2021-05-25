/* Extract data start
* This block of code was adapted from Carly's code found here: 
* source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7 
*/
function readCarbonFootprintData() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {

                    score = doc.data().scoreCurrent;

                    db.collection("users").doc(user.uid).update({
                        scoreChange: 100 * (doc.data().scoreCurrent - doc.data().scoreOld) / (doc.data().scoreOld)
                    })

                    var change = doc.data().scoreChange;


                    $("#user-score").text(score);
                    console.log("Change: " + change);

                    if (change < 0) {
                        $("#change").text(change.toFixed(1) + "%");
                        $("#change").addClass("negative");
                        $("#direction").append('<i class="fas fa-arrow-circle-down"></i>')
                    } 

                    if (change == 0) {
                        $("#change").text(change.toFixed(1) + "%");
                        $("#change").addClass("negative");
                    }
                    
                    if (change > 0){
                        $("#change").text("+" + change.toFixed(1) + "%");
                        $("#change").addClass("positive");
                        $("#direction").append('<i class="fas fa-arrow-circle-up"></i>')
                    }

                })
        }
    });
}
readCarbonFootprintData();

/* Extract data end 
* source: https://www.notion.so/Tech-Tip-B006-How-do-I-get-the-values-of-checkboxes-and-save-to-Firestore-53516773f2e243e9a4dab0e283cf0dc7 */