/*
Created by Carl Magno
Version: 1.0
*/

function rngHeight() {
    return Math.floor(Math.random() * 375);
}

function rngWidth() {
    return Math.floor(Math.random() * 349);
}

function equipTree() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid)
            .get()
            .then(function (doc) {
                console.log(doc.data().specialRewardEquip);
                if (doc.data().specialRewardEquip) {
                    //document.getElementById("tree").innerHTML = '<img src="/images/logo_final.png" />';
                    $("#tree").prepend('<img src="/images/logo_final.png" id="specialReward"/>');
                    document.getElementById('specialReward').style.width = 50;
                    document.getElementById('specialReward').style.height = 50;
                    document.getElementById('specialReward').style.position = "absolute";
                    document.getElementById('specialReward').style.left = rngWidth();
                    document.getElementById('specialReward').style.top = rngHeight();
                }
                else {
                    let icon = JSON.parse(localStorage.getItem('iconData'));
                    console.log(icon);
                    $("#tree").prepend(icon);
                }
            })
        }
    })
}
equipTree();

rngHeight();