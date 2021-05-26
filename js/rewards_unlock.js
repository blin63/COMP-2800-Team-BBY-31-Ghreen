//Function to unlock rewards based on carbon footprint score
/**
 * Creator of this JS file, modifications made by:
 * Author: Brendan Lin
 * Ver: 1.0
 */
function unlock() {
    //code adapted and modified from Kevin Chang's display_tree.js
    /**
     * Author: Kevin Chang
     * Ver: 1.0
     */
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var score = doc.data().scoreCurrent;
                    console.log(score);

                    if (score == 0 || score <= 20) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, true, true]
                        });
                    }

                    if (score > 20 && score <= 30) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, true, false]
                        });
                    }

                    if (score > 30 && score <= 45) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, false, false]
                        });
                    }

                    if (score > 45 && score <= 60) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, false, false, false]
                        });
                    }

                    if (score > 60 && score <= 75) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, false, false, false, false]
                        });
                    }

                    if (score > 75 && score < 85) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, false, false, false, false, false]
                        });
                    }

                    if (score > 85 && score <= 95) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, false, false, false, false, false, false]
                        });
                    }

                    if (score > 95 && score <= 105) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 105 && score <= 115) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, false, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 115 && score <= 125) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, false, false, false, false, false, false, false, false, false]
                        });
                    }
                })
        }
    });
}

unlock();