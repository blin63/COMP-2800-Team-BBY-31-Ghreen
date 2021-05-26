// example from mozilla website// https://some.site/?id=123
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
                }
            })
        })
}
getDetails();

//Complete task
function completeTask() {
    $("#complete").click(function () {
        // pop confirm window (** incomplete)

        // 1) delete task from taskList col;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users").doc(user.uid).collection("taskList")
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            console.log(doc.id, " => ", doc.data().taskID);

                            // Find current task in database; 
                            if (doc.data().taskID == id) {
                                db.collection("users").doc(user.uid).collection("taskList").doc(doc.id).delete();
                                console.log("delete doc: " + doc);
                                console.log("delete: " + id);

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
                        });
                    });
            }
        });
    });
}
completeTask();

// Reward section. Follow Reward order in database.
// Every 4 tasks fnished will trigger
function rewardTime(index) {
    var count = 0;
    console.log("index" + index);
    db.collection("rewards")
        .get() //get whole collection
        .then(function (snap) {
            snap.forEach(function (doc) {

                // Write reward into user's data(incomplete)
                if (count == index) {
                    alert("Congratz! Gain reward: " + doc.data().Name + "in your Rewards Page");
                }
                count++;
            });
        });
}

// Click cancel btn
// 1) pop confirm box; 
// 2) redirect to pList_detai/pList
// 3) process request
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

function backTaskList() {
    var modal = document.getElementById("myModal");
    console.log("cancel process");
    modal.style.display = "none";
}

// Delete task
function deleteTask() {
    // delete task from taskList col;
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("delete: " + id + "?");
        if (user) {
            db.collection("users").doc(user.uid).collection("taskList")
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(doc.id, " => ", doc.data().taskID);
                        if (doc.data().taskID == id) {
                            db.collection("users").doc(user.uid).collection("taskList").doc(doc.id).delete();
                            console.log("delete doc: " + doc);
                            console.log("delete: " + id);

                            // Wait 1s and return to taskList
                            setTimeout(() => {
                                console.log("confrim delete task");
                                window.location.href = "tasklist.html";
                            }, 1000);
                        }
                    });
                });
        }
    });
}

// Click complete btn
// 1) display congratz msg
// 2) redirect to taskList
$("#complete").click(function () {
    console.log("clicked complte ");
});