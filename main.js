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
let listBookArray = window.localStorage.getItem("savedListBooks") ? JSON.parse(localStorage.getItem("savedListBooks")) : [];

// makes the array elements into JSON strings which is required to store them into localstorage
localStorage.setItem("notes", JSON.stringify(inputArray));
localStorage.setItem("savedNoteBooks", JSON.stringify(noteBookArray));
localStorage.setItem("list", JSON.stringify(listArray));
localStorage.setItem("savedListBooks", JSON.stringify(listBookArray));

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
// fills the noteBookArray with the elements from inputArray but also empties inputArray
// when a note is saved into noteBooks the "notes" in main will be emptied
function saveNoteInNoteBooks() {
	for (let i = 0; i < inputArray.length; i++) {
		noteBookArray.push(inputArray[i]);
		inputArray.splice(i, 1);
		i--;
	}
	localStorage.setItem("savedNoteBooks", JSON.stringify(noteBookArray));
	localStorage.removeItem("notes");
}
// fills the listBookArray with the elements from listArray but also empties listArray
// when a list is saved into noteBooks the "list" in main will be emptied
function saveListInNoteBooks() {
	for (let i = 0; i < listArray.length; i++) {
		listBookArray.push(listArray[i]);
		listArray.splice(i, 1);
		i--;
	}
	localStorage.setItem("savedListBooks", JSON.stringify(listBookArray));
	localStorage.removeItem("list");
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
			saveNoteInNoteBooks();
			let newP = document.createElement("p");
			newP.textContent = firstPText.textContent;
			folder.appendChild(newP);
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

saveNoteList.addEventListener("click", function () {
	//e.preventDefault();
	let pList = document.getElementById("ulElement");

	if (main.innerHTML == "") {
		alert("Please create a list before saving your list's.");
	} else {
		if (pList.textContent !== "") {
			
			let newP2 = document.createElement("li");
			newP2.textContent = pList.textContent;
			let arrayList = [];
			arrayList.push(pList)
			arrayList.forEach(function(newP2){
				folder.appendChild(newP2);
			});
			console.log(arrayList);
			folder.appendChild(newP2);
			main.innerHTML = "";
			//location.reload();
			saveListInNoteBooks();
		}
	}
});

// the arrays are changed into a normal javascript string before we call them
// into the functions that show them on the page on refresh / opening of page.
const savedNotesFromMain = JSON.parse(localStorage.getItem("notes"));
const savedListFromMain = JSON.parse(localStorage.getItem("list"));
const notesIntoNoteBooks = JSON.parse(localStorage.getItem("savedNoteBooks"));
const listIntoNoteBooks = JSON.parse(localStorage.getItem("savedListBooks"));

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
// the saved elements in savedNotesFromMain is again output as normal text in main on refresh.
function savedNote() {
	for (let i = 0; i < savedNotesFromMain.length; i++) {
		let toDoNote = document.createElement("p");
		toDoNote.appendChild(document.createTextNode(savedNotesFromMain[i]));
		document.getElementById("writeNotesHere").appendChild(toDoNote);
	}
}
// the saved elements in savedNotesFromMain is again output as normal text in noteBooks on refresh.
function saveNoteToNoteBooks() {
	for (let i = 0; i < notesIntoNoteBooks.length; i++) {
		let noteSavedNote = document.createElement("p");
		noteSavedNote.appendChild(document.createTextNode(notesIntoNoteBooks[i]));
		document.getElementById("noteBooks").appendChild(noteSavedNote);
	}
}
// The saved elements in listIntoNoteBooks is output as a <ul> on page refresh in noteBooks
function saveListToNoteBooks() {
	let uList = document.createElement("ul");
	for (let i = 0; i < listIntoNoteBooks.length; i++) {
		let childList = document.createElement("li");
		childList.appendChild(document.createTextNode(listIntoNoteBooks[i]));
		uList.appendChild(childList);
		document.getElementById("noteBooks").appendChild(childList);
	}
}

window.addEventListener("DOMContentLoaded", (event) => {
	savedNote();
	savedList();
	saveNoteToNoteBooks();
	saveListToNoteBooks();
});


let eraseNotesInMain = document.createElement("button");
let eraseListInMain = document.createElement("button");
eraseNotesInMain.textContent = "Delete notes";
eraseListInMain.textContent = "Delete lists";
eraseNotesInMain.setAttribute("id", "eraseNotesInMain");
eraseListInMain.setAttribute("id", "eraseListInMain");
inputForm.appendChild(eraseNotesInMain);
inputForm.appendChild(eraseListInMain);

// erase normal text from both memory and frontend
eraseNotesInMain.addEventListener("click", function () {
	for (let i = 0; i < inputArray.length; i++) {
		inputArray.splice(i, 1);
		i--;
	}
	localStorage.removeItem("notes");
});
// erase unordered lists from both memory and frontend
eraseListInMain.addEventListener("click", function () {
	for (let i = 0; i < listArray.length; i++) {
		listArray.splice(i, 1);
		i--;
	}
	localStorage.removeItem("list");
});
