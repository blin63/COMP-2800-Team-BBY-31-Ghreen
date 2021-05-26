// example from mozilla website// https://some.site/?id=123
const parseUrl = new URL(location.href);
// console.log(parseUrl.searchParams.get("id")); // "123"

// task id
var id = parseUrl.searchParams.get("id");

// Display task's detail on page
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
                }
            })
        })
}
getDetails();

//Complete task
function completeTask() {
    $("#complete").click(function () {
        // 1) delete task from taskList col;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {

                var taskArray = [];
                db.collection("users").doc(user.uid)
                    .get()
                    .then(function (doc) {
                        taskArray = doc.data().userTasks;
                        console.log("!!taskArray: " + taskArray);
                    });

                db.collection("tasks")
                    .get()
                    .then(function (snap) {
                        snap.forEach(function (doc) {
                            if (taskArray.includes(doc.data().id)) {
                                var taskID = doc.id;
                                console.log(taskID);
                                if (taskID == id) {
                                    var taskIndex = taskArray.indexOf(doc.data().id);
                                    taskArray.splice(taskIndex, 1);
                                    console.log("index: " + taskIndex) + "\ntaskID: " + doc.data().id;
                                    console.log("newArray: " + taskArray);

                                    firebase.auth().onAuthStateChanged(function (user) {
                                        db.collection("users").doc(user.uid)
                                            .update({
                                                "userTasks": taskArray
                                            })
                                    })

                                    // 2) add exp point to user; Get current exp, update exp;
                                    //    Update carbonScore;
                                    db.collection("users").doc(user.uid)
                                        .get()
                                        .then(function (doc) {
                                            // Update progressBar 
                                            const expPerTask = 1;
                                            const expBoundary = 3; // # of task to complete for one reward

                                            var currentExp = doc.data().progressBar;
                                            currentExp += expPerTask; // scale this value by diffLvL (** Incomplete)
                                            db.collection("users").doc(user.uid).update({
                                                'progressBar': currentExp
                                            });
                                            console.log("currentExp: " + currentExp);

                                            // Update carbonScore
                                            const carbonScoreDeduc = 3;
                                            var oldScore = doc.data().scoreCurrent;
                                            var newScore = doc.data().scoreCurrent - carbonScoreDeduc;
                                            var scoreChange = newScore - oldScore;

                                            db.collection("users").doc(user.uid).update({
                                                'scoreChange': scoreChange,
                                                'scoreCurrent': newScore,
                                                'scoreOld': oldScore
                                            });

                                            // If reach 100%, display reward.
                                            var progress = currentExp / expPerTask / expBoundary;
                                            var progressBarPercentage = (progress - parseInt(progress))
                                            console.log("parseInt(progress)" + parseInt(progress));

                                            if (progressBarPercentage == 0) {
                                                console.log("reach100%, get reward");
                                                rewardTime(parseInt(progress));
                                            }
                                        })
                                }
                            }
                        });

                    });
            }
        });
    });
}
completeTask();

// Pop up msg when complete a task
$("#complete").click(function () {
    var modal = document.getElementById("thanksPopup");
    modal.style.display = "block";

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// Reward section. Every n tasks finished pop congratz msg.
function rewardTime(index) {
    var count = 0;
    console.log("index" + index);
    db.collection("rewards")
        .get() //get whole collection
        .then(function (snap) {
            snap.forEach(function (doc) {
                if (count == index) {
                    var modal = document.getElementById("congratzPopup");
                    modal.style.display = "block";
                }
                count++;
            });
        });
}

// When the user clicks the Cancel button, open the modal 
$("#cancel").click(function () {
    // Get the modal
    var modal = document.getElementById("myModal");

    // When the user clicks the Cancel button, open the modal 
    modal.style.display = "block";

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// When the user clicks the Cancel button in the modal, back to P-list
function backTaskList() {
    var modal = document.getElementById("myModal");
    console.log("cancel process");
    modal.style.display = "none";
}

// When the user clicks the Confrim button in the modal, delete task
function deleteTask() {
    // delete task from taskArray;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            // Get taskArray from database.
            var taskArray = [];
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    taskArray = doc.data().userTasks;
                    console.log("!!taskArray: " + taskArray);
                });

            db.collection("tasks")
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        if (taskArray.includes(doc.data().id)) {
                            var taskID = doc.id;
                            console.log(taskID);
                            if (taskID == id) {
                                var taskIndex = taskArray.indexOf(doc.data().id);
                                taskArray.splice(taskIndex, 1);
                                console.log("index: " + taskIndex) + "\ntaskID: " + doc.data().id;
                                console.log("newArray: " + taskArray);

                                firebase.auth().onAuthStateChanged(function (user) {
                                    db.collection("users").doc(user.uid)
                                        .update({
                                            "userTasks": taskArray
                                        })
                                })
                            }
                        }
                    });

                });
        }
    });
    directPList();
}

// Goes to Personalized task list
function directPList() {
    setTimeout(() => {
        console.log("confrim delete task");
        window.location.href = "tasklist.html";
    }, 500);
}

// Goes to reward page
function directReward() {
    setTimeout(() => {
        console.log("confrim delete task");
        window.location.href = "rewards.html";
    }, 500);
}