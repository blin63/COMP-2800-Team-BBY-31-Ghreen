
let userName;
let email;

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        console.log(user);
        email = user.email;
        userName = user.displayName;
        console.log("Name: " + userName);
        console.log("Email: " + email);
        
        document.getElementById("confirm").addEventListener("click", function() {
                
            let newName = document.getElementById("name").value;
            let newEmail = document.getElementById("email").value;
            let newCountry = document.getElementById("country").value;

        });

    } else {
    console.log("User not logged in.");
    }
});
