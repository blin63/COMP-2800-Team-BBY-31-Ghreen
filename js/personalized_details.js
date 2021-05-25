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

//Complete task
function completeTask() {
    $("#complete").click(function () {
        //pop confirm window (**havent implement)

        // 1)delete task from taskList col;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users").doc(user.uid).collection("taskList")
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            console.log(doc.id, " => ", doc.data().taskID);
                            if (doc.data().taskID == id) {
                                db.collection("users").doc(user.uid).collection("taskList").doc(doc.id).delete();
                                console.log("delete doc: " + doc + ":(");
                                console.log("delete: " + id + ":(");

                                // 2)add exp point to user; Get current exp, update exp;
                                db.collection("users").doc(user.uid)
                                    .get()
                                    .then(function (doc) {
                                        var currentExp = doc.data().progressBar;
                                        currentExp += 5; // scale this value by diffLvL (** Incomplete)
                                        db.collection("users").doc(user.uid).update({
                                            'progressBar': currentExp
                                        });
                                        console.log("currentExp: " + currentExp);
                                    })
                            } else {
                                throw new Error("task not exist.");
                            }
                        });
                    });
            }
        });
    });
}
completeTask();



//Cancel task
function cancelTask() {
    $("#cancel").click(function () {
        //pop confirm window (**havent implement)

        // 1)delete task from taskList col; 2)add exp point to user
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("delete: " + id + ":(");
            if (user) {
                db.collection("users").doc(user.uid).collection("taskList")
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            console.log(doc.id, " => ", doc.data().taskID);
                            if (doc.data().taskID == id) {
                                db.collection("users").doc(user.uid).collection("taskList").doc(doc.id).delete();
                                console.log("delete doc: " + doc + ":(");
                                console.log("delete: " + id + ":(");
                            } else {
                                throw new Error("delete a task not exist.");
                            }
                        });
                    });
            }
        });
    });
}
cancelTask();