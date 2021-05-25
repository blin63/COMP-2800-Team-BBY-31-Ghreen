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
            db.collection("users").doc(user.uid).collection("taskList")
                .get()
                .then(querySnapshot => {
                    var count = 0;
                    var size = querySnapshot.size
                    console.log("taskListSize: " + size);

                    querySnapshot.forEach(doc => {
                        console.log(doc.id, " => ", doc.data().taskID);
                        var taskListID = doc.data().taskID;

                        if (taskListID != id) {
                            count++;
                        }
                    });

                    console.log("# of Different task: " + count);

                    //  find same task in taskList
                    if (count != size) {
                        $(".alert_fail").fadeIn("slow");
                        $(".addtolist_btn").hide();
                    } else {
                        // add task to list
                        $("#add_icon").click(function () {
                            $(".alert_success").fadeIn("slow");
                            $(".addtolist_btn").hide();

                            db.collection("users").doc(user.uid).collection("taskList").add({
                                taskID: id
                            });
                            console.log("add data:", id);

                        });

                    }
                    console.log("Current taskDetail: " + id);
                });
        }
    });
}
checkUserTaskList();
