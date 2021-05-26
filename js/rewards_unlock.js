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

                    if (score == 0 || score <= 30) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                        });
                    }

                    if (score > 35 && score <= 40) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, true, true, true, true, true, false]
                        });
                    }

                    if (score > 45 && score <= 50) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, true, true, true, true, false, false]
                        });
                    }

                    if (score > 55 && score <= 60) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, true, true, true, false, false, false]
                        });
                    }

                    if (score > 65 && score <= 70) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, true, true, false, false, false, false]
                        });
                    }

                    if (score > 75 && score < 80) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, true, false, false, false, false, false]
                        });
                    }

                    if (score > 80 && score <= 85) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, true, false, false, false, false, false, false]
                        });
                    }

                    if (score > 85 && score <= 90) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, true, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 95 && score <= 100) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, true, false, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 100 && score <= 105) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, true, false, false, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 105 && score <= 110) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, true, false, false, false, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 110 && score <= 115) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, true, false, false, false, false, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 115 && score <= 120) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, true, false, false, false, false, false, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 120 && score <= 125) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [true, false, false, false, false, false, false, false, false, false, false, false, false, false]
                        });
                    }

                    if (score > 125) {
                        db.collection("users").doc(user.uid).update({
                            rewards: [false, false, false, false, false, false, false, false, false, false, false, false, false, false]
                        });
                    }
                })
        }
    });
}
unlock();
