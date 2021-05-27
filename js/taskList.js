/* createList start
 * I modified Carly's original code which was can be found here: 
 * source: https://www.notion.so/Tech-Tip-011-How-do-I-search-for-more-than-one-filter-from-Firestore-a5ef26555e3044b3ab31f627e6412015 
 * */
function createList() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var usertasks = [];
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    // Auto update taskList only if it is empty, auto generate taskList is base on questionaries' point.
                    // console.log("!!!!!" + doc.data().userTasks.length);
                    if (doc.data().userTasks.length === 0) {
                        db.collection("tasks").get().then(function (rs) {
                            if (rs) {
                                rs.forEach(function (r) {
                                    var taskID = r.data().id;
                                    var category = r.data().category;

                                    if (doc.data().Q0 > 8 || doc.data().Q1 > 6) {
                                        if (category == "resident") {
                                            usertasks.push(taskID);
                                        }
                                        console.log(usertasks);
                                    }

                                    if (doc.data().Q2 > 7) {
                                        if (category == "food") {
                                            usertasks.push(taskID);
                                        }
                                        console.log(usertasks);
                                    }

                                    if (doc.data().Q3 > 1.5) {
                                        if (category == "water") {
                                            usertasks.push(taskID);
                                        }
                                        console.log(usertasks);
                                    }

                                    if (doc.data().Q4 > 6) {
                                        if (category == "grocery") {
                                            usertasks.push(taskID);
                                        }
                                        console.log(usertasks);
                                    }

                                    if (doc.data().Q5 > 27.5 || doc.data().Q6 > 12) {
                                        if (category == "recycle") {
                                            usertasks.push(taskID);
                                        }
                                        console.log(usertasks);
                                    }

                                    if (doc.data().Q7 > 6 || doc.data().Q8 > 6 || doc.data().Q9 > 10) {
                                        if (category == "transportation") {
                                            usertasks.push(taskID);
                                        }
                                        console.log(usertasks);
                                    }
                                })
                                console.log("User's Tasks: " + usertasks);
                            }
                        })
                        // Update userTasks in database
                        setTimeout(function () {
                            firebase.auth().onAuthStateChanged(function (user) {
                                db.collection("users").doc(user.uid)
                                    .update({
                                        "userTasks": usertasks
                                    })
                            })
                        }, 1000);
                    }
                })
            showTaskArray();
        }

    })
}
createList();
/* createList end
 * source: https://www.notion.so/Tech-Tip-011-How-do-I-search-for-more-than-one-filter-from-Firestore-a5ef26555e3044b3ab31f627e6412015 
 * */

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
            const ptPerTask = 1; // pts per task
            const expBoundary = 3; // # of task to complete for one reward
            var carbonFootPrintScore = doc.data().scoreCurrent;
            var progressExp = doc.data().progressBar;
            var progress = progressExp / ptPerTask / expBoundary;

            var progressBarPercentage = (10 - carbonFootPrintScore % 10) * 10;

            console.log("scoreCurrent: " + carbonFootPrintScore);
            console.log("pts: " + carbonFootPrintScore);
            console.log("progressExp: " + progressExp);
            console.log("progressBarPercentage: " + progressBarPercentage);
            console.log("parseInt(progress): " + parseInt(progress));

            // Update progress bar.
            if (progressBarPercentage > 100) {
                // Negative carbon score; all rewards unlocked
                const hundred = 100;
                $("#progressBarPercentage").attr("style", "width: " + hundred + "%");
                $("#progressBarPercentage").html(parseInt(hundred) + "%");
            } else {
                $("#progressBarPercentage").attr("style", "width: " + progressBarPercentage + "%");
                $("#progressBarPercentage").html(parseInt(progressBarPercentage) + "%");
            }
        });
}

function showTaskArray() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            updateUsernameTitle(user);
            progressBarUpdate(user);

            // Get taskArray from database.
            var taskArray = [];
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    taskArray = doc.data().userTasks;
                    console.log("!!taskArray: " + taskArray);
                });

            // Display taskArray to the front
            db.collection("tasks")
                .get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        if (taskArray.includes(doc.data().id)) {
                            var category = doc.data().category;
                            var task = doc.data().task;
                            var id = doc.id;
                            var content = '<div ' + 'id="' + id + '"' + 'class="task">' + task + '</div>';
                            var contentAll = '<div ' + 'id="' + id + 'ALL"' + 'class="task">' + task + '</div>';

                            $("#" + category).append(content);
                            $("#all").append(contentAll);
                            addWebcamListener(id);
                            addWebcamListener(id + "ALL");
                        }
                    });

                });
        }
    });
}