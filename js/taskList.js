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
        if (this.log.length === 0) {
          return undefined;
        }
        return this.log[this.log.length - 1];
      }
    // get ca() {
    //     return this.category;
    // }
    // get task() {
    //     return this.task;
    // }
    // get des() {
    //     return this.des;
    // }
    // get impact() {
    //     return this.impact;
    // }
    // get diff() {
    //     return this.diff;
    // }
    // get info() {
    //     return this.info;
    // }
    // get id() {
    //     return this.id;
    // }
}


// userList
var task;

function showCollection() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userObject = db.collection("users").doc(user.uid);

            var taskDoc = db.collection('tasks').get();
            console.log(taskDoc);

            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    // userList
                    task = doc.data().currenttask;
                    console.log(task);
                })
        }
    });

    db.collection("tasks")
        .get() //get whole collection
        .then(function (snap) {
            snap.forEach(function (doc) { //cycle thru each doc 
                // do something with each document
                var category = doc.data().category;
                var task = doc.data().task;
                var des = doc.data().description;
                var impact = doc.data().impact;
                var diff = doc.data().difficulty;
                var info = doc.data().furtherInfo;
                var id = doc.id;
                // console.log("id" + id + "\n");

                // load from db to local array
                var obj = new taskConstructor(category, task, des, impact, diff, info, id);
                objAry.push(obj);

                //
                // temp content for showcase only
                //
                var content = '<a href="/personalizeList_taskDetail_template_ecoDriving.html">' +
                 '<div ' + 'id="' + id + '"'  + 'class="task">' + task + '</div>' + '</a>';
                $("#" + category).append(content);
                $("#all").append(content);
                openTask(id);

            })

            //   ******************** match user data before updateing page
            // console.log(objAry);
            // console.log(objAry.length);
            // for (var i = 0; i < objAry.length; i++) {
            //     console.log(objAry[i].id);
            // }
            // find qualified element
            // task.forEach(function (element) {
            //     if (element == id) {
            //         // content
            //         var content = '<div class="task">' + task + '</div>';
            //         $("#" + category).append(content);
            //         $("#all").append(content);
            //         // addWebcamListener(id);

            //     }
            // })

        })



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


function tabHidden() {
    $(".task_box").hide();
    $("#all").show();
}
tabHidden();

// click to open task
function openTask(id) {
    $(id).click(function () {
        console.log("?");
    });
}

// add temp link for showcase
function addLink() {

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

// function getfile() {
//     const userRef = db.collection('users').doc(id);
//     const doc = await userRef.get();
//     if (!doc.exists) {
//         console.log('No such document!');
//     } else {
//         console.log('Document data:', doc.data());
//     }
// }