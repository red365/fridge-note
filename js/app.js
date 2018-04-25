function removeFirstNodeFromListArray(arr) {
    arr.shift();
    return arr;
}

function tiltNote(listItem) {
    const tiltAmount = Math.floor((Math.random() * 10) + 1);
    const tiltLeft = amount => "rotate(" + (360 - amount) + "deg)";
    const tiltRight = amount => `rotate(${amount}deg)`;
    
    listItem.style.transform = ( tiltAmount < 5 ) ? tiltLeft(tiltAmount) : tiltRight(tiltAmount);

    return listItem;
}

function setNoteColor(listItem) {
    const select = document.getElementsByTagName("select")[0];
    
    if ( select.value === "Yellow" ) {
        listItem.style.backgroundImage = 'url("../images/yellow-note.png")';
    } else if ( select.value === "Pink" ) {
        listItem.style.backgroundImage = 'url("../images/pink-note.png")';
    }
    return listItem;
}

function rearrangeNotes() {    
    const firstRowListItems = removeFirstNodeFromListArray(Array.from(document
        .getElementsByClassName("first-row")[0]
        .childNodes));
    const secondRowListItems = removeFirstNodeFromListArray(Array.from(document
        .getElementsByClassName("second-row")[0]
        .childNodes));
    const thirdRowListItems = removeFirstNodeFromListArray(Array.from(document
        .getElementsByClassName("third-row")[0]
        .childNodes));
    const fullRow = 4;
    const emptyRow = 0;
    
    if ( firstRowListItems.length < fullRow && secondRowListItems.length > emptyRow ) {  
        document.getElementsByClassName("first-row")[0].appendChild(secondRowListItems.shift());
        rearrangeNotes();    
    }
    
    if ( secondRowListItems.length < fullRow && thirdRowListItems.length > emptyRow ) {

        document.getElementsByClassName("second-row")[0].appendChild(thirdRowListItems.shift());
        rearrangeNotes(); 
    }
}

function deleteNote() {
    const i = this;
    const li = this.parentElement;
    const ul = this.parentElement.parentElement;

    i.className += " fade-out";
    li.getElementsByTagName("p")[0].className += " fade-out";
    li.className += "fade-out";

    setTimeout( function(){ 
        ul.removeChild(li);
        rearrangeNotes();
    }, 1000);
    
    document.getElementsByTagName("label")[0].innerText = "";
  }

function createNote(row, position, noteText) {
  const ul = document.getElementsByClassName(row)[0];
  let li = document.createElement("li");
  const p = document.createElement("p");
  const i = document.createElement("i");

  
  li = tiltNote(li);
  li = setNoteColor(li);
  
  p.className = "note-text";
  p.innerText = noteText;
  i.className = "fas fa-times";
  li.id = position;
  
  i.addEventListener( "click", deleteNote );
	
  li.appendChild(p);
  li.insertBefore(i, li.children[0]);
  ul.appendChild(li);
}

function noteHandler() {
    const textArea = document.getElementsByClassName("text-fields")[0];
    const listItemArray = document.getElementsByTagName("li");
    const label = document.getElementsByTagName("label")[0];
    const fullRow = 4;
    const noteCharLimit = 45; 
  
    if ( textArea.value.length > noteCharLimit ) {
      label.innerText = "Text exceeding 45 characters will be truncated";
      textArea.value = textArea.value.substr(0, noteCharLimit) + "...";
    }
  
    if ( listItemArray.length < fullRow ) {
        createNote( "first-row", listItemArray.length, textArea.value );
    } else if ( listItemArray.length >= fullRow && listItemArray.length <= (( fullRow * 2 ) -1 ) ) {
        createNote( "second-row", listItemArray.length, textArea.value );
    } else if (listItemArray.length >= ( fullRow * 2 ) && listItemArray.length <= (( fullRow * 3 ) -1 )  ) {
        createNote("third-row", listItemArray.length, textArea.value);
    } else {
        label.innerText = "No room on the fridge! Click some notes to delete them and try again";
    }
    
    textArea.value = "";
   }

const createButton = document.getElementsByTagName("button")[0];

createButton.addEventListener("click", noteHandler );
