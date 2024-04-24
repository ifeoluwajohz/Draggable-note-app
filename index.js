document.addEventListener("DOMContentLoaded", function () {
    let newX = 0, newY = 0, startX = 0, startY = 0;

const note = document.getElementById('card');
const container = document.getElementById('container');
note.addEventListener('mousedown', mouseDown);


const addBtn = document.getElementById("add-btn");
loadNotes()


function mouseDown(e){
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp);
}
function mouseMove(e){
    newX = startX - e.clientX
    newY = startY - e.clientY
    
    startX = e.clientX
    startY = e.clientY

    note.style.top = (note.offsetTop - newY) + 'px'
    note.style.left = (note.offsetLeft - newX) + 'px'
    
}
function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}



const createNote = document.getElementById('createNote');


createNote.addEventListener('click', newNote)

function newNote(){

    const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");
  
      const textarea = document.createElement("textarea");
      textarea.classList.add("note-text");
      textarea.placeholder = "Type your note here...";

      const newBtn = document.createElement('button');
      newBtn.classList.add('createNote')
      newBtn.textContent = '+'

      newBtn.addEventListener('click', newNote)
  
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "x";

      deleteBtn.addEventListener("click", function () {
        noteDiv.remove();
        saveNotes();
      });

      noteDiv.appendChild(textarea);
      noteDiv.appendChild(deleteBtn);
      noteDiv.appendChild(newBtn)
  
      // Generate random coordinates for the note's position
      const randomX = Math.random() * (window.innerWidth - 250); // Adjusted for note width
      const randomY = Math.random() * (window.innerHeight - 250); // Adjusted for note height
      noteDiv.style.left = randomX + "px";
      noteDiv.style.top = randomY + "px";


noteDiv.addEventListener('mousedown', mouseDown);

let newsX = 0, newsY = 0, startsX = 0, startsY = 0;

function mouseDown(e){
    startsX = e.clientX
    startsY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp);
}
function mouseMove(e){
    newsX = startsX - e.clientX
    newsY = startsY - e.clientY
    
    startsX = e.clientX
    startsY = e.clientY

    noteDiv.style.top = (noteDiv.offsetTop - newsY) + 'px'
    noteDiv.style.left = (noteDiv.offsetLeft - newsX) + 'px'
    
}
function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}
      container.insertBefore(noteDiv, addBtn);
      saveNotes();

}

function saveNotes() {
    const notes = [];
    const noteElements = document.querySelectorAll(".note");

    noteElements.forEach((noteElement) => {
      const note = {
        text: noteElement.querySelector(".note-text").value,
        left: noteElement.style.left,
        top: noteElement.style.top,
      };
      notes.push(note);
    });

    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("stickyNotes"));
    if (notes) {
      notes.forEach((note) => {
        const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");
  
      const textarea = document.createElement("textarea");
      textarea.classList.add("note-text");
      textarea.placeholder = "Type your note here...";

      const newBtn = document.createElement('button');
      newBtn.classList.add('createNote')
      newBtn.textContent = '+'

      newBtn.addEventListener('click', newNote)
  
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "x";

      deleteBtn.addEventListener("click", function () {
        noteDiv.remove();
        saveNotes();
      });

      noteDiv.appendChild(textarea);
      noteDiv.appendChild(deleteBtn);
      noteDiv.appendChild(newBtn)

      noteDiv.style.left = note.left;
      noteDiv.style.top = note.top;

      

        container.insertBefore(noteDiv, addBtn);
      });
    }
  }
})