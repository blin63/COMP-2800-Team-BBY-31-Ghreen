// Code copied from Brendan Lin's 1800 demo code

function rewardsQuery() {
    db.collection("rewards")
    .get()
    .then(function(snap) {
        snap.forEach(function (doc) {
            console.log(doc.data().Name, " -> ", doc.data().Icon);
            let name = doc.data().Name;
            let icon = doc.data().Icon;

            let table = document.getElementById("tableForIcons");
            let row = table.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.innerHTML = icon;
            cell2.innerHTML = name;
            cell3.innerHTML = "Equip";
            cell3.setAttribute('id', 'equip');
        })
    })
}

rewardsQuery();