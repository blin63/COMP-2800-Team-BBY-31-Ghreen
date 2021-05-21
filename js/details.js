// example from mozilla website// https://some.site/?id=123

// console.log(location.href);
const parseUrl = new URL(location.href);
// console.log(parseUrl.searchParams.get("id")); // "123"

// task ID
var id = parseUrl.searchParams.get("id");

function getDetails() {
    // extract id from url, assign to variable
    // console.log(id);

    db.collection('tasks')
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var category = doc.data().category;
                var task = doc.data().task;
                var des = doc.data().description;
                var impact = doc.data().impact;
                var diff = doc.data().difficulty;
                var info = doc.data().furtherInfo;
                var localid = doc.id;
                if (localid == id) {
                    $("#details-go-here").html = category;
                    $("#taskNamee").append("<p class='taskName'> " + task + "</p>");
                    $(".impact").append("<p> " + impact + "</p>");
                    $(".difficulty").append("<p> " + diff + "</p>");
                    $(".s1").append("<p> " + des + "</p>");
                    $(".furtherInfo").append("<p hidden id='f_info' > " + info + "</p>");

                    // $("#details-go-here").append("<a href='" + url + "' > " + url);
                }
            })

        })
}
getDetails();

function checkTaskList() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userObject = db.collection("users").doc(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var task = doc.data().currenttask;
                    console.log(task);
                    // $("#user").text(a);
                    task.forEach(function (element) {
                        // user tasklist contains current task
                        if (element == id) {
                            // fail, do nothing
                            $("#add_icon").click(function () {
                                $(".alert_fail").fadeIn("slow");
                            });
                        } else {
                            // success, add to list
                            $("#add_icon").click(function () {
                                $(".alert_success").fadeIn("slow");
                            });

                            // update user' tasklist
                            userObject.update({
                                currenttask: id
                            }).then(function () {
                                console.log("new taskID: " + doc.data().currenttask)
                            })
                        }

                    })
                })
        }
    });
}
checkTaskList();

// temp for showcase
$("#add_icon").click(function () {
    // if user.list.contains()
    $(".alert_success").fadeIn("slow");
    // else
    // $(".alert_fail").fadeIn("slow");

});