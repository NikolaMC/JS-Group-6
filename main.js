"use strict";
//window.localStorage.clear();

let bodyTag = document.getElementsByTagName("body")[0];

// Create header element
let createHeader = document.createElement("header");
createHeader.setAttribute("id", "head");
bodyTag.appendChild(createHeader);

// Create aside element
let createAside = document.createElement("aside");
createAside.setAttribute("id", "noteBooks");
bodyTag.appendChild(createAside);

// Create main element
let createMain = document.createElement("main");
bodyTag.appendChild(createMain);

// Create form element
let createForm = document.createElement("form");
createForm.setAttribute("id", "inputForm");
document.getElementsByTagName("main")[0].appendChild(createForm);

// Create textarea inside of form
let createTextarea = document.createElement("textarea");
createTextarea.setAttribute("id", "inputArea");
createTextarea.setAttribute("rows", "7");
createForm.appendChild(createTextarea);

let createBreak = document.createElement("br");
createForm.appendChild(createBreak);

// Create Add text button
let createTextButton = document.createElement("button");
createTextButton.setAttribute("id", "inputText");
createTextButton.textContent = "Add text";
createForm.appendChild(createTextButton);

// Create Add list button
let createListButton = document.createElement("button");
createListButton.setAttribute("id", "inputList");
createListButton.textContent = "Add list";
createForm.appendChild(createListButton);

// Create writeNotesHere div
let createMainDiv = document.createElement("div");
createMainDiv.setAttribute("id", "writeNotesHere");
bodyTag.appendChild(createMainDiv);

document.getElementById("head").innerHTML = "Ease Your Mind";
document.querySelector("header").style.cssText = "color: black; font-size: 125px; font-family: courier;";
document.querySelector("#noteBooks").style.cssText = "color: black; font-size: 16px; font-family: courier;";
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
let textAreaArrayNotes = window.localStorage.getItem("saveEditedNotes") ? JSON.parse(localStorage.getItem("saveEditedNotes")) : [];
// makes the array elements into JSON strings which is required to store them into localstorage
localStorage.setItem("notes", JSON.stringify(inputArray));
localStorage.setItem("savedNoteBooks", JSON.stringify(noteBookArray));
localStorage.setItem("list", JSON.stringify(listArray));
localStorage.setItem("savedListBooks", JSON.stringify(listBookArray));
localStorage.setItem("saveEditedNotes", JSON.stringify(textAreaArrayNotes));

inputSubmit.addEventListener("click", function saveAsText(e) {
	normalText();
});

listSubmit.addEventListener("click", function saveASList(e) {
	//e.preventDefault();
	saveList();
});
// saves the input as a normal text but also saves it in saveList() localstorage function
function normalText() {
	if (inputArea.value === "") {
		alert("Can not add an empty note.");
	} else {
		storeInMain();
		let userText = inputArea.value;
		let newParagraph = document.createElement("p");
		let textNode = document.createTextNode(userText);
		newParagraph.appendChild(textNode);
		main.appendChild(newParagraph);
	}

	inputArea.value = "";
}
// saves the input as a list but also stores it in localStorage when it reaches storeListInMain()
function saveList() {
	if (inputArea.value === "") {
		alert("Can not add an empty list.");
	} else {
		if (document.getElementById("ulElement") === null) {
			let newUL = document.createElement("ul");
			newUL.setAttribute("id", "ulElement");
			main.appendChild(newUL);
		}
	
		let userText = inputArea.value.split('\n');
		let listItem;
	
		for (let i = 0; i < userText.length; i++) {
			if (userText[i] !== "") {
				listItem = document.createElement("li");
				let textNode = document.createTextNode(userText[i]);
				listItem.appendChild(textNode);
				document.getElementById("ulElement").appendChild(listItem);
			}
		}
	
		storeListInMain();
	}

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
	let firstPText = main.querySelector("p");

	if (main.innerHTML == "") {
		alert("Please enter something in the note before saving.");
	} else {
		if (firstPText.textContent !== "") {
			saveNoteInNoteBooks();
			main.innerHTML = "";
		}
	}
});

let saveNoteList = document.createElement("button");
saveNoteList.textContent = "Save list";
inputForm.appendChild(saveNoteList);

saveNoteList.addEventListener("click", function (e) {
	let pList = document.getElementById("ulElement");

	if (main.innerHTML == "") {
		alert("Please create a list before saving your lists.");
	} else {
		if (pList.textContent !== "") {
			let newP2 = document.createElement("li");
			newP2.textContent = pList.textContent;
			let arrayList = [];
			arrayList.push(pList);
			arrayList.forEach(function () {
				folder.appendChild(newP2);
			});
			console.log(arrayList);
			folder.appendChild(newP2);
			main.innerHTML = "";

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
const editedNotesIntoTextarea = JSON.parse(localStorage.getItem("saveEditedNotes"));
// the saved elements in the savedListFromMain gets restored to a UL on refresh
function savedList() {
	let todoList = document.createElement("ul");
	todoList.setAttribute("id", "ulElement");

	let listString = savedListFromMain.join("\n");
	let splitList = listString.split("\n");

	for (let i = 0; i < splitList.length; i++) {
		if (splitList[i] !== "") {
			let child = document.createElement("li");
			child.appendChild(document.createTextNode(splitList[i]));
			todoList.appendChild(child);
			document.getElementById("writeNotesHere").appendChild(todoList);
		}
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

	let listString = listIntoNoteBooks.join("\n");
	let splitList = listString.split("\n");
	let listItem;

	for (let i = 0; i < splitList.length; i++) {
		if (splitList[i] !== "") {
			listItem = document.createElement("li");
			let textNode = document.createTextNode(splitList[i]);
			listItem.appendChild(textNode);
			uList.appendChild(listItem);
			document.getElementById("noteBooks").appendChild(listItem);
		}
	}

	// let splitList = localStorage.getItem("savedListBooks").split('\\n');
	// let listItem;

	// for (let i = 0; i < splitList.length; i++) {
	// 	if (splitList[i] !== "") {
	// 		listItem = document.createElement("li");
	// 		let textNode = document.createTextNode(splitList[i]);
	// 		listItem.appendChild(textNode);
	// 		uList.appendChild(listItem);
	// 		document.getElementById("noteBooks").appendChild(listItem);
	// 	}
	// 	// let childList = document.createElement("li");
	// 	// childList.appendChild(document.createTextNode(listIntoNoteBooks[i]));
	// 	// uList.appendChild(childList);
	// 	// document.getElementById("noteBooks").appendChild(childList);
	// }
}

window.addEventListener("DOMContentLoaded", (event) => {
	savedNote();
	savedList();
	saveNoteToNoteBooks();
	saveListToNoteBooks();
	saveEditedNoteToTextArea();
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

// skapar ett h2 element och lägger in över main, "Granska"

let reviewText = document.createElement("h2");
reviewText.setAttribute("id", "review");
document.getElementById("inputForm").appendChild(reviewText);
document.getElementById("review").innerHTML = "Review";

// skapar knapp för Edita notes
let editNotes = document.createElement("button");
editNotes.setAttribute("id", "editNotes");
editNotes.innerHTML = "Edit Notes";
inputForm.appendChild(editNotes);

editNotes.addEventListener("click", function (e) {
	//kopierar koden till textarean
	e.preventDefault();
	noteBookArray.forEach((element) => {
		inputArea.value += element + "\r\r";
	});
	savedEditedNotesTextArea();
});

let clearAll = document.createElement("button");
clearAll.setAttribute("id", "clearAll");
clearAll.textContent = "Clear All";
inputForm.appendChild(clearAll);
// eventlistener that calls on both the functions that erase lists and notes in frontend and localstorage
clearAll.addEventListener("click", function () {
	deleteSavedNote();
	deleteSavedList();
	location.reload();
});

// skapar knapp för att Edita Lists.

let editLists = document.createElement("button");
editLists.setAttribute("id", "editLists");
editLists.innerHTML = "Edit Lists";
inputForm.appendChild(editLists);

editLists.addEventListener("click", function (e) {
	listBookArray.forEach((element) => {
		inputArea.value += element + "\r";
	});
	//What to do?
});
// deletes notes in the aside, both frontend and localstorage
function deleteSavedNote() {
	for (let i = 0; i < notesIntoNoteBooks.length; i++) {
		notesIntoNoteBooks.splice(i, 1);
		i--;
	}
	localStorage.removeItem("savedNoteBooks");
}
// deletes lists in aside, both frontend and localstorage
function deleteSavedList() {
	for (let i = 0; i < listIntoNoteBooks.length; i++) {
		listIntoNoteBooks.splice(i, 1);
		i--;
	}
	localStorage.removeItem("savedListBooks");
}
let savedInputs = document.createElement("h2");
savedInputs.setAttribute("id", "saveInputs");
savedInputs.textContent = "Saved";
inputForm.appendChild(savedInputs);

// removes notes in NoteBooks (aside) from both frontend and localstorage. puts it into textareas array and storage
function savedEditedNotesTextArea() {
	for (let i = 0; i < noteBookArray.length; i++) {
		textAreaArrayNotes.push(noteBookArray[i]);
		noteBookArray.splice(i, 1);
		i--;
	}
	localStorage.setItem("saveEditedNotes", JSON.stringify(textAreaArrayNotes));
	localStorage.removeItem("savedNoteBooks");
}
// supposed to save the notes to be edited on page refresh
function saveEditedNoteToTextArea() {
	for (let i = 0; i < editedNotesIntoTextarea.length; i++) {
		let editedNote = document.createElement("p");
		editedNote.appendChild(document.createTextNode(editedNotesIntoTextarea[i]));
		document.getElementById("inputArea").appendChild(editedNote);
	}
}
