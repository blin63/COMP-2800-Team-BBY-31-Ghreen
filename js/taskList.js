const objAry = [];

class taskConstructor {
    constructor(category, task, des, impact, diff, info, id) {
        this.category = category;
        this.task = task;
        this.des = des;
        this.impact = impact;
        this.diff = diff;
        this.info = info;
        this.id = id;
        // this.displayInfo=function(){
        //   return this.name + "is " + this.age + "year's old!";
        // }

    }
    get latest() {
        if (this.log.length == 0) {
            return undefined;
        }
        return this.log[this.log.length - 1];
    }
}


// userList
var task;

function showCollection() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            updateUsernameTitle(user);
            progressBarUpdate(user);

            db.collection("users").doc(user.uid).collection("taskList")
                .get()
                .then(querySnapshot => {
                    var size = querySnapshot.size
                    console.log("taskListSize: " + size);

                    querySnapshot.forEach(doc => {
                        // console.log(doc.id, " => ", doc.data().taskID);
                        var taskListID = doc.data().taskID;

                        // Find each item in currentTaskList in "tasks" col,
                        // display content of currentTaskList only.
                        db.collection("tasks")
                            .get() //get whole collection
                            .then(function (snap) {
                                snap.forEach(function (doc) { //cycle thru each doc 

                                    if (doc.id == taskListID) {
                                        // do something with each document
                                        var category = doc.data().category;
                                        var task = doc.data().task;
                                        var des = doc.data().description;
                                        var impact = doc.data().impact;
                                        var diff = doc.data().difficulty;
                                        var info = doc.data().furtherInfo;
                                        var id = doc.id;
                                        // console.log("id" + id + "\n");
                                        // "<div id='" + id + "'> " // '<a href="/personalizeList_taskDetail_template_ecoDriving.html">'
                                        var content = '<div ' + 'id="' + id + '"' + 'class="task">' + task + '</div>';
                                        var contentAll = '<div ' + 'id="' + id + 'ALL"' + 'class="task">' + task + '</div>';

                                        $("#" + category).append(content);
                                        $("#all").append(contentAll);
                                        addWebcamListener(id);
                                        addWebcamListener(id + "ALL");

                                    }
                                })
                            })

                    });
                });
        }
    });


}
showCollection();

function tabControl() {
    $("li").click(function () {
        $(".task_box").hide();
        if (this.getAttribute('id') == 0) {
            $("#all").show();
        } else if (this.getAttribute('id') == 1) {
            $("#transportation").show();
        } else if (this.getAttribute('id') == 2) {
            $("#food").show();
        } else if (this.getAttribute('id') == 3) {
            $("#grocery").show();
        } else if (this.getAttribute('id') == 4) {
            $("#water").show();
        } else if (this.getAttribute('id') == 5) {
            $("#resident").show();
        } else if (this.getAttribute('id') == 6) {
            $("#recycle").show();
        }

        $("li").removeClass("active");
        $(this).addClass("active");
    });
}
tabControl();

function addWebcamListener(id) {
    document.getElementById(id)
        .addEventListener("click", function () {
            console.log(id + " was clicked!")
            id = id.replace("ALL", "");
            window.location.href = "personalizedTasks_detail.html?id=" + id; //"details.html?id=1232ildjfkad"
        });
}

function tabHidden() {
    $(".task_box").hide();
    $("#all").show();
}
tabHidden();

function updateUsernameTitle(user) {
    db.collection("users").doc(user.uid)
        .get()
        .then(function (doc) {
            var userName = doc.data().name;
            $(".list_title").html(userName + "'s TaskList");

        });
}

function progressBarUpdate(user) {
    db.collection("users").doc(user.uid)
    .get()
    .then(function (doc) {
        // Check progress and calculate % for progress bar.
        const ptPerTask = 5; // pts per task
        const expBoundary = 4; // # of task to complete for one reward
        var carbonFootPrintScore = doc.data().scoreCurrent;
        var progressExp = doc.data().progressBar;
        var progress = progressExp / ptPerTask / expBoundary;
        var progressBarPercentage = (progress - parseInt(progress)) * 100;

        console.log("pts: " + carbonFootPrintScore);
        console.log("progressExp: " + progressExp);
        console.log("progressBarPercentage: " + progressBarPercentage);
        console.log("parseInt(progress): " + parseInt(progress));

        // Update progress bar.
        $("#progressBarPercentage").attr("style", "width: " + progressBarPercentage + "%");
        $("#progressBarPercentage").html(progressBarPercentage + "%");
    });
}


// function showTaskList() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             var userObject = db.collection("users").doc(user.uid);

//             var taskDoc = db.collection('tasks').get();
//             console.log(taskDoc);

//             db.collection("users").doc(user.uid)
//                 .get()
//                 .then(function (doc) {
//                     var task = doc.data().currenttask;
//                     console.log(task);
//                     // $("#user").text(a);
//                     task.forEach(function (element) {

//                     })
//                 })
//         }
//     });
// }
// showTaskList();



// function readUserTasks() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             db.collection("users").doc(user.uid)
//                 .get()
//                 .then(function (doc) {
//                     var userTaskList = doc.data().currentTask
//                     var progress = doc.data().progressBar



//                     $("#user-score").text(score);
//                     console.log("Change: " + change);

//                     if (change < 0) {
//                         $("#change").text(change.toFixed(1) + "%");
//                         $("#change").addClass("negative");
//                         $("#direction").append('<i class="fas fa-arrow-circle-down"></i>')
//                     } 

//                     if (change == 0) {
//                         $("#change").text(change.toFixed(1) + "%");
//                         $("#change").addClass("negative");
//                     }

//                     if (change > 0){
//                         $("#change").text("+" + change.toFixed(1) + "%");
//                         $("#change").addClass("positive");
//                         $("#direction").append('<i class="fas fa-arrow-circle-up"></i>')
//                     }

//                 })
//         }
//     });
// }
// readUserTasks();