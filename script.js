let beamLibrary = JSON.parse(localStorage.getItem("beamLibrary")) || [
    {name: "410-96", rate: 0.0315},
    {name: "300-96", rate: 0.0304}
];

let todayEntries = [];


function loadBeams() {

    let dropdown = document.getElementById("beam");
    dropdown.innerHTML = "";

    beamLibrary.forEach((beam) => {

        let option = document.createElement("option");

        option.value = beam.rate;
        option.text =
            beam.name + " - " + beam.rate;

        dropdown.appendChild(option);

    });

}



function addBeam() {

    let name = prompt("Beam name:");
    let rate = Number(prompt("Piecework rate:"));

    if(name && rate) {

        beamLibrary.push({
            name:name,
            rate:rate
        });


        localStorage.setItem(
            "beamLibrary",
            JSON.stringify(beamLibrary)
        );


        loadBeams();

        alert("Beam added!");

    }

}




function addEntry() {


    let beamSelect =
    document.getElementById("beam");


    let beamName =
    beamSelect.options[beamSelect.selectedIndex].text;


    let rate =
    Number(beamSelect.value);


    let qty =
    Number(document.getElementById("qty").value);


    let crew =
    Number(document.getElementById("crew").value);



    let hours = rate * qty;


    let addons = [];


    if(document.getElementById("setup").checked){

        hours += 0.42;
        addons.push("Setup");

    }


    if(document.getElementById("wire").checked){

        hours += 0.2298;
        addons.push("Wire Change");

    }


    if(document.getElementById("pallet").checked){

        hours += 0.4098;
        addons.push("Pallet Stop Setup");

    }



    todayEntries.push({

        beam: beamName,
        qty: qty,
        hours: hours,
        addons:addons

    });



    updateTotals();


}





function updateTotals(){

    let totalBeams = 0;
    let totalHours = 0;


    let box =
    document.getElementById("entries");


    box.innerHTML = "";


    todayEntries.forEach((entry, index) => {


    totalBeams += entry.qty;
    totalHours += entry.hours;


    box.innerHTML += `

    <div class="result">

    ${entry.beam}<br>

    Beams: ${entry.qty}<br>

    Hours: ${entry.hours.toFixed(4)}<br>

    Add-ons:
    ${entry.addons.join(", ") || "None"}

    <br><br>

    <button onclick="editEntry(${index})">
    Edit
    </button>

    <button onclick="deleteEntry(${index})">
    Delete
    </button>

    </div>

    `;


});
        </div>

        `;


    });



    document.getElementById("totalBeams").innerHTML =
    totalBeams;


    document.getElementById("hours").innerHTML =
    totalHours.toFixed(4);



    let crew =
    Number(document.getElementById("crew").value);


    document.getElementById("person").innerHTML =
    (totalHours / crew).toFixed(4);


}




function saveDay(){


    if(todayEntries.length === 0){

        alert("No production entered.");

        return;

    }


    let history =
    JSON.parse(localStorage.getItem("history")) || [];


    history.push({

        date:new Date().toISOString(),

        entries:todayEntries

    });



    let cutoff =
    new Date();


    cutoff.setDate(
        cutoff.getDate()-7
    );



    history =
    history.filter(day =>
        new Date(day.date) >= cutoff
    );



    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );


    todayEntries=[];

    updateTotals();


    alert("Day saved!");

}





function showHistory(){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];


    if(history.length===0){

        alert("No history.");

        return;

    }


    let text="Weekly History\n\n";


    history.forEach(day=>{


        text +=
        new Date(day.date).toLocaleDateString()
        + "\n";


        day.entries.forEach(entry=>{


            text +=
            entry.beam +
            " - " +
            entry.qty +
            " beams - " +
            entry.hours.toFixed(4)
            +
            " hrs\n";


        });


        text+="\n";


    });


    alert(text);

}





function clearHistory(){

    localStorage.removeItem("history");

    alert("History deleted.");

}



loadBeams();
