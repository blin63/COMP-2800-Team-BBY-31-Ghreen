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
                    $("#tree-container").append('<img src="/images/logo_final.png" id="specialReward"/>');
                    document.getElementById('specialReward').style.width = 50;
                    document.getElementById('specialReward').style.height = 50;
                    document.getElementById('specialReward').style.position = "absolute";
                    document.getElementById('specialReward').style.left = rngWidth();
                    document.getElementById('specialReward').style.top = rngHeight();
                }
                
                let icon = JSON.parse(localStorage.getItem('iconData'));
                console.log(icon);               
                if (icon.name && icon.name != "specialTD" && icon.isPushed) {
                    let newIcon = '<span id="specialReward">' + icon.name + '</span>';
                    console.log(newIcon);
                    $("#tree-container").append(newIcon);
                }
            })
        }
    })
}
equipTree();
