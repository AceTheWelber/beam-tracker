function calculate() {

    let rate = Number(document.getElementById("beam").value);
    let qty = Number(document.getElementById("qty").value);
    let crew = Number(document.getElementById("crew").value);

    let totalHours = rate * qty;
    let perPerson = totalHours / crew;

    document.getElementById("hours").innerHTML =
        totalHours.toFixed(3);

    document.getElementById("person").innerHTML =
        perPerson.toFixed(3);
}
