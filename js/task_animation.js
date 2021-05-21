function furtherInfoBtn() {

    var title = document.getElementById("info");
    var content = document.getElementById("f_info");
    if (content.hidden == true) {
        content.hidden = false;
        title.style.backgroundColor = "#C7F5FB";
        title.classList.remove("activeAnimation");


    } else {
        content.hidden = true;
        title.style.backgroundColor = "#FFDED5";
        title.classList.add("activeAnimation");

    }
}