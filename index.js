let textInputElement = document.getElementById("note-text-input")
let dateInputElement = document.getElementById("date-selector")
let timeInputElement = document.getElementById("time-selector")

let notesOutputContainer = document.getElementById("output-main-container")

const addNote = () => {
    if (textInputElement.value === '' || dateInputElement.value === '' || timeInputElement.value === '') {
        alert("All fields are necessary, please fill the note and try again.")
        return
    }

    let newId = Math.floor(Math.random() * 10000)
    let newNote = {
        id: newId,
        text: textInputElement.value,
        date: dateInputElement.value,
        time: timeInputElement.value
    }

    let jsonArr = localStorage.getItem("notes-list")
    let notesList = JSON.parse(jsonArr)

    if (notesList === null) {
        notesList = []
    }

    notesList.push(newNote)

    let toJson = JSON.stringify(notesList)
    localStorage.setItem("notes-list", toJson)

    loadNotes()

    textInputElement.value = ''
    dateInputElement.value = ''
    timeInputElement.value = ''
}

const loadNotes = () => {
    let jsonArr = localStorage.getItem("notes-list")
    let notesList = JSON.parse(jsonArr)

    if (notesList === null) {
        return
    }
    let noteContainer = ``
    for (let note of notesList) {
        noteContainer += `
        <div id="output-note-container" class="note" onmouseover="showClearButton()" onmouseout="hideClearButton()">
         <div id="note-text-output" >${note.text}</div>
            <div class="time-and-date-output" id="time-and-date-output">${note.date}<br>${note.time}</div>
            <button type="button" id="delete-note" class="close" aria-label="Close" onclick="deleteNote(${note.id})" >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`
    }
    notesOutputContainer.innerHTML = noteContainer
}

const deleteNote = (id) => {
    let jsonArr = localStorage.getItem("notes-list")
    let notesList = JSON.parse(jsonArr)

    let findIdInNotesList = notesList.filter(el => el.id !== id)
    notesList = findIdInNotesList

    let toJson = JSON.stringify(notesList)
    localStorage.setItem("notes-list", toJson)

    loadNotes()
}

const showClearButton = () => {
    document.querySelector("#delete-note").style.visibility = "visible";
}

const hideClearButton = () => {
    document.querySelector("#delete-note").style.visibility = "hidden";
}