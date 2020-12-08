//"use strict";

document.getElementById("head").innerHTML = "Ease Your Mind";
document.querySelector("header").style.cssText =
  "color: black; font-size: 125px; font-family: courier;";

document.getElementById("noteBooks").innerHTML = "Kategorisering?";
document.querySelector("#noteBooks").style.cssText =
  "color: black; font-size: 30px; font-family: courier;";
let inputForm = document.getElementById("inputForm");
let inputArea = document.getElementById("inputArea");
let inputSubmit = document.getElementById("inputText");
let listSubmit = document.getElementById("inputList");
let toggleButton = document.getElementById("toggleList");
let main = document.getElementById("writeNotesHere");

let inputArray = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

localStorage.setItem("notes", JSON.stringify(inputArray));
let cache = JSON.parse(localStorage.getItem("notes"));

//Create P tag
let newParagraph = document.createElement("p");
newParagraph.setAttribute("id", "para");

inputSubmit.addEventListener("click", function saveAsText(e) {
  e.preventDefault();
  normalText();
});

listSubmit.addEventListener("click", function saveASList(e) {
  e.preventDefault();
  saveList();
});

function normalText() {
  let newParagraph = document.createElement("p");

  let userText = inputArea.value;
  let textNode = document.createTextNode(userText);
  newParagraph.setAttribute("id", "para");

  newParagraph.appendChild(textNode);
  main.appendChild(newParagraph);

  inputArray.push(inputArea.value);
  localStorage.setItem("notes", JSON.stringify(inputArray));

  inputArea.value = "";

  console.log(inputArray);
}
// saves the input as a list but also stores it in localStorage
function saveList() {
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

  inputArray.push(inputArea.value);
  localStorage.setItem("notes", JSON.stringify(inputArray));

  inputArea.value = "";
  console.log(inputArray);
}

// supposed to be the localstorage function in main
function storeInMain() {
  // still researching how to store correctly
}

let saveNote = document.createElement("button");
saveNote.textContent = "Save note";
main.appendChild(saveNote);

let folder = document.createElement("div");
folder.setAttribute("id", "folderForNotes");

let aside = document.getElementById("noteBooks");
aside.appendChild(folder);

saveNote.addEventListener("click", function () {
  let pText = document.getElementById("para");

  if (pText.textContent !== "") {
    let newP = document.createElement("p");
    newP.textContent = pText.textContent;
    folder.appendChild(newP);
    console.log("added p");
  } else {
    console.log("Empty text");
  }
});
