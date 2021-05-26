// example from mozilla website// https://some.site/?id=123

// console.log(location.href);
const parseUrl = new URL(location.href);
// console.log(parseUrl.searchParams.get("id")); // "123"

// task id
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

// taskDetail, display 2 diff msgs for addable task and unaddable task
function checkUserTaskList() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var taskArray = [];
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    taskArray = doc.data().userTasks;
                    console.log("!!taskArray: " + taskArray);
                });

                setTimeout(function(){
                    db.collection("tasks")
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        // Found Current task
                        // console.log("!!doc.data().id: " + doc.id);
                        // console.log("!!id: " + id);

                        if (doc.id == id) {
                            var taskID = doc.data().id;
                            console.log(taskID);
                            // Found current task in user' taskLisk, popup warning
                            console.log(taskArray);
                            if (taskArray.includes(taskID)) {
                                console.log("included");
                                $(".alert_fail").fadeIn("slow");
                                $(".addtolist_btn").hide();

                            } else {
                                // Task is addable to list
                                console.log("not included");

                                $("#add_icon").click(function () {
                                    $(".alert_success").fadeIn("slow");
                                    $(".addtolist_btn").hide();

                                    taskArray.push(taskID);
                                    db.collection("users").doc(user.uid)
                                        .update({
                                            "userTasks": taskArray
                                        });
                                    console.log("add data:", taskID);
                                    console.log("new taskArray:", taskArray);
                                });
                            }
                        }
                    });
                });
                }, 500);
        }
    });
}
checkUserTaskList();