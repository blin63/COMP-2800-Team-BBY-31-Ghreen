// Function to equip rewards to tree on main page
/**
 * Created by Carl Magno
 * Version: 1.0
 */

function equip() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            
            let element = document.getElementById("equip");
            document.getElementById("equip").addEventListener("click", function() {
                let icon = element.className;

                console.log(icon);
                
                if (icon == "specialTD") {
                    db.collection("users").doc(user.uid)
                    .get()
                    .then(function (doc) {
                        db.collection("users").doc(user.uid)
                        .update( {
                            specialRewardEquip: true
                        })
                    })
                }

                let nameOfClass = $("#equip").attr("class");

                console.log(nameOfClass);

                localStorage.setItem('iconData', JSON.stringify(nameOfClass));
            
            })
        }
    })
}

equip();