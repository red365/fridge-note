describe("removeFirstNodeFromListArray", function() {

  it("removes first item from array", function() {
    assert.notInclude( removeFirstNodeFromListArray( [2,4,5]), 2 );
  });

});

describe("tiltNote", function() {

  it("adds rotate value to transform style rule", function() {

    const li = tiltNote(document.createElement("li"));
    const transform = li.style.transform;
    assert.equal( transform.substr(0, 7), "rotate(" );
  });

});

describe("setNoteColor", function() {

  
  before(function(done) { 
    document.createElement("li");
    const select = document.createElement("select");
    // const select = document.getElementsByTagName("select")[0];
    const option = document.createElement("option");
    select.hidden = "true";
    option.text = "Yellow";
    select.appendChild(option);
    document.body.appendChild(select);
    return done();
  })
  
  it("sets the background-image style rule on a list item", function() {
    let li = document.getElementsByTagName("li")[0];
    li.style.backgroundImage = 'url("../images/yellow-note.png")';
    li = setNoteColor(li);
    assert.equal( li.style.backgroundImage, 'url("../images/yellow-note.png")');
  });

});

