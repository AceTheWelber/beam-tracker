let beamLibrary = JSON.parse(localStorage.getItem("beamLibrary")) || [
    {name: "410-96", rate: 0.0315},
    {name: "300-96", rate: 0.0304}
];

function loadBeams() {
    let dropdown = document.getElementById("beam");
    dropdown.innerHTML = "";

    beamLibrary.forEach((beam, index) => {
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
}


loadBeams();
