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

                // content
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
        })

}
showCollection();


function addWebcamListener(id) {
    document.getElementById(id)
        .addEventListener("click", function () {
            console.log(id + " was clicked!")
            window.location.href = "details.html?id=" + id; //"details.html?id=1232ildjfkad"
        });
}