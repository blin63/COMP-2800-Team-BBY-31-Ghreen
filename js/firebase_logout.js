$(document).ready(function () {
    $("#logout").click(function(e) {
        e.preventDefault();

        firebase.auth().signOut().then(window.location.replace("index.html"));
    });
});