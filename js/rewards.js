// Code copied and edited from Brendan Lin's 1800 demo code

function rewardsQuery() {
    var counter = 0;

    //code adapted and modified from Kevin Chang's display_tree.js
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
                        db.collection("users").doc(user.uid).update({rewardCount: counter});
                        revealRewardMsg();
                    }

                    console.log(counter);

                    db.collection("rewards")
                        .limit(counter)
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
                });
        }
    });

}

rewardsQuery();

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
    $(document).ready(function() {
        $("#rewardMsg").css("visibility", "visible");
        $("#rewardMsg").fadeIn(5000).fadeOut(5000);
    });
}