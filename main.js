let inputForm = document.getElementById("inputForm");
let inputArea = document.getElementById("inputArea");
let inputSubmit = document.getElementById("inputSubmit");
let toggleButton = document.getElementById("toggleList");

let main = document.getElementById("writeNotesHere");

inputSubmit.addEventListener("click", function readForm(e) {
    e.preventDefault();

    let newParagraph = document.createElement("p");

    let userText = inputArea.value;
    let textNode = document.createTextNode(userText);

    newParagraph.appendChild(textNode);    
    main.appendChild(newParagraph);

    inputArea.value = '';
});