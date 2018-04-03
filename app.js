function removeTextItemFromListArray(arr) {
    arr.shift();
    return arr;
}

function tiltNote(listItem) {
    const tilt = Math.floor((Math.random() * 10) + 1);
    if ( tilt < 5 ) {
        listItem.style.transform = "rotate("+ (360 - tilt) + "deg)"; 
    } else {
        listItem.style.transform = `rotate(${tilt}deg)`; 
    }
    return listItem;

}

function setColor(listItem) {
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
  li = setColor(li);
  
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

let createButton = document.getElementsByTagName("button")[0];

createButton.addEventListener("click", function () {
  const textArea = document.getElementsByClassName("text-fields")[0];
  const listArray = document.getElementsByTagName("li");
  const label = document.getElementsByTagName("label")[0];
  const fullRow = 4;
  const noteCharLimit = 45; 

  if ( textArea.value.length > noteCharLimit ) {
    label.innerText = "Text exceeding 45 characters will be truncated";
    textArea.value = textArea.value.substr(0, noteCharLimit) + "...";
  }

  if ( listArray.length < fullRow ) {
      createNote( "first-row", listArray.length, textArea.value );
  } else if ( listArray.length >= fullRow && listArray.length <= (( fullRow * 2 ) -1 ) ) {
      createNote( "second-row", listArray.length, textArea.value );
  } else if (listArray.length >= ( fullRow * 2 ) && listArray.length <= (( fullRow * 3 ) -1 )  ) {
      createNote("third-row", listArray.length, textArea.value);
  } else {
      label.innerText = "No room on the fridge! Click some notes to delete them and try again";
  }
  
  textArea.value = "";

 });
