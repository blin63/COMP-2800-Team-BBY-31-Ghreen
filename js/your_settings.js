var database = firebase.database;

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        let email = user.email;
        let userName = user.displayName;

        console.log("Before update: ")
        console.log("Name: " + userName);
        console.log("Email: " + email);
        console.log(user);


        // Confirm Account changes function

        document.getElementById("confirmAccount").addEventListener("click", function () {

            let newName = document.getElementById("name").value;
            let newEmail = document.getElementById("email").value;

            let nameRegex = new RegExp("[A-Z]{1}[a-z]{1,}[A-Z]{1}[a-z]{1,}");
            let emailRegex = new RegExp('[A-Za-z0-9]{1,}@[a-z]{1,}.[a-z]{,3}');

            if (newName.match(nameRegex)) {
                console.log("Name Match");
                user.updateProfile({
                    displayName: newName
                }).then(function () {
                    console.log("Update successful.");
                }).catch(function (error) {
                    console.log("Update unsuccesful: " + error);
                });
            }

            if (newEmail.match(emailRegex)) {
                console.log("Email Match");
                user.updateEmail(newEmail)
                    .then(function () {
                        console.log("Update successful.");
                    }).catch(function (error) {
                        console.log("Update unsuccesful: " + error);
                    });
            }



            return db.collection("users").doc(user.uid).update({
                    name: newName,
                    email: newEmail,
                }).then(function () {

                    console.log(user);
                    // As suggested by Carly in Slack
                    db.collection("users")
                        .doc(user.uid)
                        .get()
                        .then(function (doc) {
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

        document.getElementById("resetEmail").addEventListener("click", function () {


            let auth = firebase.auth();
            let emailAddress = user.email;

            auth.sendPasswordResetEmail(emailAddress).then(function () {
                alert("Email sent. Please check your email.");
                console.log("Email sent.");
            }).catch(function (error) {
                console.log("Email not sent: " + error);
            });


        });

    } else {
        console.log("User not logged in.");
    }
});