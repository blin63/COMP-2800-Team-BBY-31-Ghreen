var database = firebase.database;

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {

        let email = user.email;
        let userName = user.displayName;

        console.log("Before update: ")
        console.log("Name: " + userName);
        console.log("Email: " + email);
        console.log(user);
        

        // Confirm Account changes function

        document.getElementById("confirmAccount").addEventListener("click", function() {

            let newName = document.getElementById("name").value;
            let newEmail = document.getElementById("email").value;

            let nameRegex = '{1}[A-Z]{1,}[a-z]\s{1}[A-Z]{1,}[a-z]';
            let emailRegex = '{1,}[A-Za-z0-9]@{1,}[a-z].{,3}[a-z]';

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
            
            return db.collection("users").doc(user.uid).update({
                name: newName ,
                email: newEmail ,
            }).then (function () {

                console.log(user);
                // As suggested by Carly in Slack
                db.collection("users")
                .doc(user.uid)
                .get()
                .then(function(doc) {
                    email = doc.data().email,
                    displayName = doc.data().name

                    console.log("After update");
                    console.log(displayName);
                    console.log(email);
                    console.log(doc.data());

                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                })

            })
            .catch(function (error) {
                console.log("Error updating user: " + error);
            })

        });

        // Confirm Password changes function

        document.getElementById("confirmPassword").addEventListener("click", function() {

            let currentPassword = document.getElementById("currentPassword").value;
            let newPassword = document.getElementById("newPassword").value;

            console.log(user.password);
            console.log(currentPassword);

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
            
            return db.collection("users").doc(user.uid).update({
            }).then (function () {

                console.log(user);
                // As suggested by Carly in Slack
                db.collection("users")
                .doc(user.uid)
                .get()
                .then(function(doc) {

                    console.log("After update");
                    console.log(displayName);
                    console.log(email);
                    console.log(doc.data());

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
