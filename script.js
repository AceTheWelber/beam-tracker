let beamLibrary = JSON.parse(localStorage.getItem("beamLibrary")) || [
    {name: "410-96", rate: 0.0315},
    {name: "300-96", rate: 0.0304}
];

function loadBeams() {
    let dropdown = document.getElementById("beam");
    dropdown.innerHTML = "";

    beamLibrary.forEach((beam) => {
        let option = document.createElement("option");
        option.value = beam.rate;
        option.text = beam.name + " - " + beam.rate;
        dropdown.appendChild(option);
    });
}

function addBeam() {

    let name = prompt("Enter beam name:");
    let rate = Number(prompt("Enter piecework rate:"));

    if(name && rate) {

        beamLibrary.push({
            name: name,
            rate: rate
        });

        localStorage.setItem(
            "beamLibrary",
            JSON.stringify(beamLibrary)
        );

        loadBeams();

        alert("Beam added!");
    }
}


function calculate() {

    let rate = Number(document.getElementById("beam").value);
    let qty = Number(document.getElementById("qty").value);
    let crew = Number(document.getElementById("crew").value);

    let hours = rate * qty;


    if(document.getElementById("setup").checked){
        hours += 0.42;
    }

    if(document.getElementById("wire").checked){
        hours += 0.2298;
    }

    if(document.getElementById("pallet").checked){
        hours += 0.4098;
    }


    document.getElementById("hours").innerHTML =
        hours.toFixed(4);

    document.getElementById("person").innerHTML =
        (hours / crew).toFixed(4);

    window.currentJob = {
        job: document.getElementById("job").value,
        beam: document.getElementById("beam").options[
            document.getElementById("beam").selectedIndex
        ].text,
        qty: qty,
        hours: hours,
        crew: crew,
        date: new Date().toISOString()
    };
}


function saveJob() {

    if(!window.currentJob){
        alert("Calculate the job first.");
        return;
    }

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.push(window.currentJob);

    // Keep only last 7 days
    let cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);

    history = history.filter(job =>
        new Date(job.date) >= cutoff
    );


    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    alert("Job saved!");
}


function showHistory(){

    let history = JSON.parse(localStorage.getItem("history")) || [];

    if(history.length === 0){
        alert("No jobs saved.");
        return;
    }

    let output = "Weekly History\n\n";
    let totalHours = 0;
    let totalBeams = 0;


    history.forEach(job => {

        output +=
        `${new Date(job.date).toLocaleDateString()}
Job: ${job.job}
${job.beam}
Beams: ${job.qty}
Hours: ${job.hours.toFixed(4)}

`;

        totalHours += job.hours;
        totalBeams += job.qty;

    });


    output +=
    `TOTAL BEAMS: ${totalBeams}
TOTAL HOURS: ${totalHours.toFixed(4)}`;


    alert(output);
}


function clearHistory(){

    localStorage.removeItem("history");

    alert("History deleted.");
}


loadBeams();
