document.getElementById("head").innerHTML = "Ease Your Mind";
document.querySelector("header").style.cssText = "color: black; font-size: 125px; font-family: courier;";

document.getElementById("noteBooks").innerHTML = "Kategorisering?";
document.querySelector("#noteBooks").style.cssText = "color: black; font-size: 30px; font-family: courier;";
let inputForm = document.getElementById("inputForm");
let inputArea = document.getElementById("inputArea");
let inputSubmit = document.getElementById("inputSubmit");
let toggleButton = document.getElementById("toggleList");
let main = document.getElementById("writeNotesHere");
let inputArray = [];

if (localStorage.getItem("notes")){
    inputArray = JSON.parse(localStorage.getItem("notes"))
}else{
    inputArray = [];
}
localStorage.setItem("notes", JSON.stringify(inputArray));
let cache = JSON.parse(localStorage.getItem("notes"));


inputSubmit.addEventListener("click", function readForm(e) {
    e.preventDefault();

    inputArray.push(inputArea.value);
    localStorage.setItem("notes", JSON.stringify(inputArray));

    let newParagraph = document.createElement("p");

    let userText = inputArea.value;
    let textNode = document.createTextNode(userText);
    newParagraph.setAttribute("id", "para")

    newParagraph.appendChild(textNode);    
    main.appendChild(newParagraph);

    inputArea.value = '';
    console.log(inputArray);

});

 // supposed to be the localstorage function in main
function storeInMain(){
    // still researching how to store correctly
}
