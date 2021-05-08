const btnSave = document.getElementById("btnSave"); //reference to Save Button from given ID.
let notes = ""; //a global variable called notes.
init(); //function for initialization to initialize the notepad.

function init()
{
	let out=""; // create a variable called out & assigned it to empty string.
	let noteArray = JSON.parse(localStorage.getItem("noteData")); //create a NoteArray which load from browser local storage called noteData.
	if(noteArray !=null && noteArray !=""){   // condition for NoteArray to load NoteData from local storage.
		noteArray = JSON.parse(localStorage.getItem("noteData")); 

	for(let x = 0; x < noteArray.length; x++) // loop the information sitting on the NoteArray.
	{
     out += "<option value=" +x + ">"; // Output from noteArray and display them in option to enable selection list.
     out += noteArray[x].title;
     out += "</option>";

     document.getElementById("noteMaster").innerHTML = out; // Projecting selection list in HTML which assigned to <select> tag with given noteMaster ID.
	}
 
	document.getElementById("btnWrite").addEventListener("click", function(e)
	{
		writeNote(); //function to write new note by click Write Button.
	});

  	document.getElementById("noteMaster").addEventListener("click", function(e) //function for display notes that been saved.
	{
		displayNote(e.target.value); // display each saved note by click in selection list.
	});

	readNotes();
	}else
	{
		writeNote(); //perform this function when above condition not met.
	}
}

function writeNote() 
{
	document.getElementById("read").style.display = "none";
	document.getElementById("write").style.display = "block";
	document.getElementById("noteTitle").value = "";
	document.getElementById("noteBody").value = "";
}

function readNotes()
{
	document.getElementById("read").style.display = "block";
	document.getElementById("write").style.display = "none";
}
 
function displayNote(note)
{
	let noteArray = JSON.parse(localStorage.getItem("noteData")); //set Array value which load saves from local storage
	let out= "<h2>" + noteArray[note].title + "</h2>";
	out += "<h4>Date:  " + new
	Date(noteArray[note].date).toDateString() + "</h4>";
	out += "<p>" + noteArray[note].body + "</p>";
	out += "<button id='btnDelete'>Delete</button>"

	document.getElementById("noteDisplay").innerHTML = out;

	document.getElementById("btnDelete").onclick = function(){
		noteArray.splice(note,1);
		localStorage.setItem("noteData", JSON.stringify(noteArray));
		init()
	}
}

btnSave.onclick = function(){
	const noteDate = new Date();
	const noteTitle = document.getElementById("noteTitle").value;
	const noteBody = document.getElementById("noteBody").value;
	const theNote = new Note (noteDate, noteTitle, noteBody);
	saveNotes(theNote);
}

function saveNotes(note) 
{
	let noteArray = JSON.parse(localStorage.getItem("noteData"));
	if (noteArray == null)
	{
		noteArray = new Array();
		noteArray.push(note);	
	}else
	{
		noteArray.push(note);
	}
	localStorage.setItem("noteData", JSON.stringify(noteArray));
	readNotes();
	init();
}

// other features for change font styles
function functionBold() {
  document.getElementById("noteBody").style.fontWeight = "bold";
}
 
function functionNormal() {
  document.getElementById("noteBody").style.fontStyle = "normal";
  document.getElementById("noteBody").style.textDecoration = "none";
  document.getElementById("noteBody").style.fontWeight = "normal";
}

function functionItalic(){
  document.getElementById("noteBody").style.fontStyle = "italic";
}

function functionUnderline(){
  document.getElementById("noteBody").style.textDecoration = "underline";
}

function changeFont() {
    var myselect = document.getElementById("input-font");   //get the input element and store in variable 'myselect'
    var font = myselect.options[myselect.selectedIndex].value;   //store the value="" of the selected element in variable 'font'
    document.getElementById("noteBody").style.fontFamily = font;   //set 'noteBody' element's font-family style to value in 'font' variable
}

// feature for change theme
function changeTheme() {
    var e = document.getElementById("themes"); //get the input element and store in variable 'e'
    var theme = e.options[e.selectedIndex].value; //store the value="" of the selected element in variable 'theme'
    document.getElementById("shelf").style.backgroundImage = "url(" + theme + ")"; //set 'shelf element's to url to value in 'e' variable
    document.getElementById("shelf").style.backgroundSize = "cover"; //set 'shelf' element's Image size style to value in 'e' variable

}