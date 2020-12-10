"use strict";
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
let inputArray = window.localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
let noteBookArray = window.localStorage.getItem("savedNoteBooks") ? JSON.parse(localStorage.getItem("savedNoteBooks")) : [];
let listArray = window.localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];

localStorage.setItem("notes", JSON.stringify(inputArray));
localStorage.setItem("savedNoteBooks", JSON.stringify(noteBookArray));
localStorage.setItem("list", JSON.stringify(listArray));
//let cache = JSON.parse(localStorage.getItem("notes")); // probably unneccessary variable.

inputSubmit.addEventListener("click", function saveAsText(e) {
	e.preventDefault();
	normalText();
});

listSubmit.addEventListener("click", function saveASList(e) {
	e.preventDefault();
	saveList();
});

function normalText() {
	storeInMain();
	let userText = inputArea.value;
	let newParagraph = document.createElement("p");
	let textNode = document.createTextNode(userText);
	newParagraph.appendChild(textNode);
	main.appendChild(newParagraph);

	inputArea.value = "";
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

	storeListInMain();

	inputArea.value = "";
}

// supposed to be the localstorage function in main. plain text
function storeInMain() {
	inputArray.push(inputArea.value);
	localStorage.setItem("notes", JSON.stringify(inputArray));
}
// not finished function. store a list
function storeListInMain() {
	listArray.push(inputArea.value);
	localStorage.setItem("list", JSON.stringify(listArray));
}
// not finished, need to find out which value to push.
function saveInNoteBooks() {
	noteBookArray.push(main.value);
	localStorage.setItem("savedNoteBooks", JSON.stringify(noteBookArray));
}

let saveNote = document.createElement("button");
saveNote.textContent = "Save note";
inputForm.appendChild(saveNote);

let folder = document.createElement("div");
folder.setAttribute("id", "folderForNotes");

let aside = document.getElementById("noteBooks");
aside.appendChild(folder);

saveNote.addEventListener("click", function (e) {
	e.preventDefault();
	let firstPText = main.querySelector("p"); // Get the 1st paragraph in main

	console.log(firstPText);

	if (main.innerHTML == "") {
		alert("Please enter something in the note before saving.");
	} else {
		if (firstPText.textContent !== "") {
			let newP = document.createElement("p");
			newP.textContent = firstPText.textContent;
			folder.appendChild(newP);
			saveInNoteBooks();
			main.innerHTML = "";
			console.log("added p");
		} else {
			console.log("Empty text");
		}
	}
});

let saveNoteList = document.createElement("button");
saveNoteList.textContent = "Save list";
inputForm.appendChild(saveNoteList);

saveNoteList.addEventListener("click", function (e) {
	e.preventDefault();
	let pList = document.getElementById("ulElement");
	saveInNoteBooks();
	if (main.innerHTML == "") {
		alert("Please enter something in the note before saving.");
	} else {
		if (pList.textContent !== "") {
			let newP2 = document.createElement("p");
			newP2.textContent = pList.textContent;
			folder.appendChild(newP2);
			main.innerHTML = "";
			console.log("added p");
		} else {
			console.log("Empty List");
		}
	}
});
document.getElementById("writeNotesHere").innerHTML = JSON.parse(localStorage.getItem("notes"));
//document.getElementById("noteBooks").innerHTML = JSON.parse(localStorage.getItem("savedNoteBooks"));
document.getElementById("writeNotesHere").innerHTML = JSON.parse(localStorage.getItem("list"));

// the last one of the 3 above dominates what will be shown on the page.
