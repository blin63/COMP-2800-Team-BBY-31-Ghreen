const objAry = new Array();

class taskCategory {
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
}

function showCollection() {
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

                // load from db to local array
                var obj = new taskCategory(category, task, des, impact, diff, info, id);
                objAry.push(obj);

                // //Display DOM with unique ID.
                // $("#webcams-go-here").append("<h1 id='" + doc.id + "'> " + name + "</h1>");
                // $('#webcam-goes-here').append("<p id = ${doc.id}> ${name} </p>");

                // //add a listener to this DOM
                // addWebcamListener(doc.id);
                // addWebcamListener(id);

                var content = "<div id='" + id + "'> " +
                '<li class="task_detail" id="task_btn">' +
                '<p class="task_title">' + task + '</p>' +
                // '<p class="des">' + element.task + '</p>' +
                '<div class="task_detail_box">' +
                '<div class="leftColumn">' + 'Impact' +
                '<p>' + impact + '</p>' +
                '</div>' +
                '<div class="rightColumn">' + 'Difficulty' +
                '<p>' + diff + '</p>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>';
            $("#" + category).append(content);
            addWebcamListener(id);
            })
            console.log(objAry);
            console.log(objAry.length);
            // objAry.forEach(appendTaskcard);
        })

}
showCollection();

// '<a href="../html/tasks_template.html">'

// function appendTaskcard(element) {
//     var content = "<div id='" + element.id + "'> " +
//         '<li class="task_detail" id="task_btn">' +
//         '<p class="task_title">' + element.task + '</p>' +
//         // '<p class="des">' + element.task + '</p>' +
//         '<div class="task_detail_box">' +
//         '<div class="leftColumn">' + 'Impact' +
//         '<p>' + element.impact + '</p>' +
//         '</div>' +
//         '<div class="rightColumn">' + 'Difficulty' +
//         '<p>' + element.diff + '</p>' +
//         '</div>' +
//         '</div>' +
//         '</li>' +
//         '</div>';
//     $("#" + element.category).append(content);

// }

function addWebcamListener(id) {
    document.getElementById(id)
        .addEventListener("click", function () {
            console.log(id + " was clicked!")
            window.location.href = "details.html?id=" + id; //"details.html?id=1232ildjfkad"
        });
}



// function getDetails() {
//     // https://some.site/?id=123
//     const parsedUrl = new URL(url);
//     console.log(parsedUrl.searchParams.get("id")); // "1232ildjfkad"

//     // extract id from url, assign to variable
//     var id = parsedUrl.searchParams.get("id"); //returns  1232ildjfkad
//     console.log(id);
//     console.log(url);

//     db.collection('tasks')
//     .get()
//     .then(function(snap) {
//         snap.forEach(function(doc) {
//             var category = doc.data().category;
//             var task = doc.data().task;
//             var des = doc.data().description;
//             var impact = doc.data().impact;
//             var diff = doc.data().difficulty;
//             var info = doc.data().furtherInfo;
//             var id = doc.id;
//             if (id == url) {
//                             $("#details-go-here").append("<h1> " + category + "</h1>");
//                             $("#details-go-here").append("<h1> " + task + "</h1>");
//                             $("#details-go-here").append("<h1> " + impact + "</h1>");
//                             $("#details-go-here").append("<h1> " + diff + "</h1>");

//                             // $("#details-go-here").append("<a href='" + url + "' > " + url);
//             }
//         })

//     })

//     // use this ID to read from firestore
//     // db.collection("users/iuouqreow/goals/9817439/steps/83149/").get()

// //     db.collection("tasks")
// //         .doc(id) //webcam ID that we extracted
// //         .get()
// //         .then(function (doc) { // display details!
// //             var name = doc.data().fields.category;
// //             var geo_area = doc.data().fields.task;
// //             var coord = doc.data().fields.description;
// //             var url = doc.data().fields.impact;

// //             console.log(name);

// //             $("#details-go-here").append("<h1> " + name + "</h1>");
// //             $("#details-go-here").append("<h1> " + geo_area + "</h1>");
// //             $("#details-go-here").append("<h1> " + coord + "</h1>");
// //             $("#details-go-here").append("<a href='" + url + "' > " + url);
// //         })
// }
// getDetails();