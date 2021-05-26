// Code copied and edited from Brendan Lin's 1800 demo code
/**
 * Author: Carl Magno & Brendan Lin
 * Ver: 1.0
 */

function rewardsQuery() {
    var counter = 0;
    unlock();

    //code adapted and modified from Kevin Chang's display_tree.js
    /**
     * Author: Kevin Chang (start)
     * Ver: 1.0
     */
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid)
                .get()
                .then(function (userDoc) {
                    for (let i = 0; i < userDoc.data().rewards.length; i++) {
                        if (userDoc.data().rewards[i] == true) {
                            counter++;
                        }
                    }

                    //check if user unlocked new reward items; if so display reward message
                    if (counter > userDoc.data().rewardCount) {
                        db.collection("users").doc(user.uid).update({
                            rewardCount: counter
                        });
                        revealRewardMsg();
                    }

                    /**
                     * Author: Kevin Chang (end)
                     * Ver: 1.0
                     */

                    console.log("Number of rewards unlocked: " + counter);
                    if (userDoc.data().rewardCount > 0) {
                        db.collection("rewards")
                            .limit(userDoc.data().rewardCount)
                            .get()
                            .then(function (snap) {
                                snap.forEach(function (doc) {
                                    console.log(doc.data().Name, " -> ", doc.data().Icon);
                                    let name = doc.data().Name;
                                    let icon = doc.data().Icon;

                                    let table = document.getElementById("tableForIcons");
                                    let row = table.insertRow(0);
                                    let cell1 = row.insertCell(0);
                                    let cell2 = row.insertCell(1);
                                    let cell3 = row.insertCell(2);

                                    cell1.innerHTML = icon;
                                    cell2.innerHTML = name;
                                    cell3.innerHTML = "Equip";
                                    cell3.setAttribute('id', 'equip');
                                })
                            })
                    } else {
                        revealNoRewardMsg();
                    }
                });
        }
    });
}
rewardsQuery();

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
                    console.log("current carbon score: " + score);

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

//Function to control reward message for when the user unlocks a new reward
/**
 * Author: Brendan Lin
 * Ver: 1.0
 */

function rewardMsg() {
    $(document).ready(function () {
        $("#rewardMsg").css("visibility", "hidden");
        $("#rewardMsg").fadeOut();

    });
}
rewardMsg();

//reveal the reward message when new rewards are unlocked
function revealRewardMsg() {
    $(document).ready(function () {
        $("#rewardMsg").css("visibility", "visible");
        $("#rewardMsg").fadeIn(5000).fadeOut(5000);
    });
}

//Function to control the message when there are no rewards unlocked
/**
 * Author: Brendan Lin
 * Ver: 1.0
 */

function noRewardMsg() {
    $(document).ready(function () {
        $("#noReward").css("visibility", "hidden");
    });
}

noRewardMsg();

//Function to reveal noRewardMsg when there are no rewards to display
/**
 * Author: Brendan Lin
 * Ver: 1.0
 */

function revealNoRewardMsg() {
    $(document).ready(function () {
        $("#noReward").css("visibility", "visible");
    });
}