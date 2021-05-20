var database = firebase.database;

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {

        let email = user.email;
        let userName = user.displayName;
        let country = user.country;

        console.log("Before update: ")
        console.log("Name: " + userName);
        console.log("Email: " + email);
        console.log("Country: " + country);
        console.log(user);
        
        document.getElementById("confirm").addEventListener("click", function() {

            let newName = document.getElementById("name").value;
            let newEmail = document.getElementById("email").value;
            let newCountry = document.getElementById("country").value;
            let currentPassword = document.getElementById("currentPassword").value;
            let newPassword = document.getElementById("newPassword").value;

            if (currentPassword == user.password) {
                user.updatePassword(newPassword)
                .then( function() {
                    console.log("Update successful.");
                }).catch (function(error) {
                    console.log("Update unsuccesful: " + error);
                });
            } else {
                alert("Current password must match password in database.");
            }

            user.updateProfile({
                displayName: newName
            }).then(function() {
                console.log("Update successful.");
            }).catch (function(error) {
                console.log("Update unsuccesful: " + error);
            });

            user.updateEmail(newEmail)
            .then( function() {
                console.log("Update successful.");
            }).catch (function(error) {
                console.log("Update unsuccesful: " + error);
            });

            user.displayName = newName;
            user.email = newEmail;
            user.password = newPassword;
            
            return db.collection("users").doc(user.uid).update({
                name: newName ,
                email: newEmail ,
                country: newCountry,
 
                
            }).then (function () {

                console.log(user);
                // As suggested by Carly in Slack
                db.collection("users")
                .doc(user.uid)
                .get()
                .then(function(doc) {
                    email = doc.data().email,
                    country = doc.data().country,
                    displayName = doc.data().name

                    console.log("After update");
                    console.log(displayName);
                    console.log(email);
                    console.log(country);
                    console.log(doc.data());

                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("country").value = "";
                    document.getElementById("currentPassword").value = "";
                    document.getElementById("newPassword").value = "";
                })

            })
            .catch(function (error) {
                console.log("Error updating user: " + error);
            })

        });

    } else {
    console.log("User not logged in.");
    }
});
