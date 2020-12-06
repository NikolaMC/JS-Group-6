document.getElementById("head").innerHTML = "Ease Your Mind";
document.querySelector("header").style.cssText = "color: black; font-size: 125px; font-family: courier;";

document.getElementById("noteBooks").innerHTML = "Kategorisering?";
document.querySelector("#noteBooks").style.cssText = "color: black; font-size: 30px; font-family: courier;";
let inputForm = document.getElementById("inputForm");
let inputArea = document.getElementById("inputArea");
let inputSubmit = document.getElementById("inputText");
let listSubmit = document.getElementById("inputList");
let toggleButton = document.getElementById("toggleList");

let main = document.getElementById("writeNotesHere");

inputSubmit.addEventListener("click", function saveAsText(e) {
    e.preventDefault();

    let newParagraph = document.createElement("p");

    let userText = inputArea.value;
    let textNode = document.createTextNode(userText);

    newParagraph.appendChild(textNode);    
    main.appendChild(newParagraph);

    inputArea.value = '';
});

listSubmit.addEventListener("click", function saveASList(e) {
    e.preventDefault();

    if (document.getElementById("ulElement") === null) {
        let newUL = document.createElement("ul");
        newUL.setAttribute("id", "ulElement");
        main.appendChild(newUL);
    }

    let userText = inputArea.value;

    let newLI = document.createElement("li");
    let textNode = document.createTextNode(userText);
    newLI.appendChild(textNode);

    document.getElementById("ulElement").appendChild(newLI);

    inputArea.value = '';
})

 // supposed to be the localstorage function in main
function storeInMain(){
    // still researching how to store correctly
}
