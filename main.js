"use strict";
document.getElementById("head").innerHTML = "Ease Your Mind";
document.querySelector("header").style.cssText = "color: black; font-size: 125px; font-family: courier;";

document.getElementById("noteBooks").innerHTML = "Sparat";
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

// makes the array elements into JSON strings which is required to store them into localstorage
localStorage.setItem("notes", JSON.stringify(inputArray));
localStorage.setItem("savedNoteBooks", JSON.stringify(noteBookArray));
localStorage.setItem("list", JSON.stringify(listArray));

inputSubmit.addEventListener("click", function saveAsText(e) {
	e.preventDefault();
	normalText();
});

listSubmit.addEventListener("click", function saveASList(e) {
	e.preventDefault();
	saveList();
});
// saves the input as a normal text but also saves it in saveList() localstorage function
function normalText() {
	storeInMain();
	let userText = inputArea.value;
	let newParagraph = document.createElement("p");
	let textNode = document.createTextNode(userText);
	newParagraph.appendChild(textNode);
	main.appendChild(newParagraph);

	inputArea.value = "";
}
// saves the input as a list but also stores it in localStorage when it reaches storeListInMain()
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

// Function to save plain text, normal notes
function storeInMain() {
	inputArray.push(inputArea.value);
	localStorage.setItem("notes", JSON.stringify(inputArray));
}
// Function to store the list elements.
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

			main.innerHTML = "";
			console.log("added p");
		} else {
			console.log("Empty text");
		}
	}
	saveInNoteBooks();
});

let saveNoteList = document.createElement("button");
saveNoteList.textContent = "Save list";
inputForm.appendChild(saveNoteList);

saveNoteList.addEventListener("click", function (e) {
	e.preventDefault();
	let pList = document.getElementById("ulElement");

	if (main.innerHTML == "") {
		alert("Please create a list before saving your list's.");
	} else {
		if (pList.textContent !== "") {
			let newP2 = document.createElement("li");
			newP2.textContent = pList.textContent;
			folder.appendChild(newP2);
			saveInNoteBooks();
			main.innerHTML = "";
		}
	}
});
// the arrays are changed into a normal javascript string before we call them
// into the functions that show them on the page on refresh / opening of page.

const savedNotesFromMain = JSON.parse(localStorage.getItem("notes"));
const savedListFromMain = JSON.parse(localStorage.getItem("list"));
const cache = JSON.parse(localStorage.getItem("savedNoteBooks"));

// the saved elements in the savedListFromMain gets restored to a UL on refresh
function savedList() {
	let todoList = document.createElement("ul");
	for (let i = 0; i < savedListFromMain.length; i++) {
		let child = document.createElement("li");
		child.appendChild(document.createTextNode(savedListFromMain[i]));
		todoList.appendChild(child);
		document.getElementById("writeNotesHere").appendChild(todoList);
	}
}
// the saved elements in savedNotesFromMain is again output as normal text on refresh.
function savedNote() {
	for (let i = 0; i < savedNotesFromMain.length; i++) {
		let toDoNote = document.createElement("p");
		toDoNote.appendChild(document.createTextNode(savedNotesFromMain[i]));
		document.getElementById("writeNotesHere").appendChild(toDoNote);
	}
}
// calls on the functions that has stored the elements so it's shown on opening of page / refresh
savedNote();
savedList();
