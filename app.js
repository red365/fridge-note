function removeTextItemFromListArray(arr) {
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
    const firstRowListItems = removeTextItemFromListArray(Array.from(document
        .getElementsByClassName("first-row")[0]
        .childNodes));
    const secondRowListItems = removeTextItemFromListArray(Array.from(document
        .getElementsByClassName("second-row")[0]
        .childNodes));
    const thirdRowListItems = removeTextItemFromListArray(Array.from(document
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

function createNote(row, position, noteText) {
  const ul = document.getElementsByClassName(row)[0];
  let li = document.createElement("li");
  const p = document.createElement("p");
  
  li = tiltNote(li);
  li = setNoteColor(li);
  
  p.className = "note-text";
  p.innerText = noteText;
  li.id = position;
  
  li.addEventListener("click", function() {
    const li = document.getElementById(this.id);
    const parent = li.parentNode;
    const rowIdentifier = parent.className;

    parent.removeChild(li);
    
    rearrangeNotes();
    
    document.getElementsByTagName("label")[0].innerText = "";
  });
  
  li.appendChild(p);
  ul.appendChild(li);
}

const createButton = document.getElementsByTagName("button")[0];

createButton.addEventListener("click", function () {
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

 });
