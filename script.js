document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const saveNoteBtn = document.getElementById('saveNote');
    const notesList = document.getElementById('notesList');

    // Load notes from localStorage on page load
    loadNotes();

    // Event listener to save note
    saveNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText === '') {
            alert('Please write something to save.');
            return;
        }

        saveNoteToLocalStorage(noteText);
        noteInput.value = ''; // Clear input field
        loadNotes(); // Reload the notes list
    });

    // Save note to localStorage
    function saveNoteToLocalStorage(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Load and display notes from localStorage
    function loadNotes() {
        notesList.innerHTML = ''; // Clear current notes list
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <p>${note}</p>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesList.appendChild(noteElement);
        });
    }

    // Delete a note from localStorage
    window.deleteNote = function(index) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes(); // Reload the notes list after deletion
    };
});