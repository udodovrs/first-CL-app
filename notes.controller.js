const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

const getNotes = async () => {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

const addNote = async (title) => {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("New note was added"));
};

const removeNote = async (removedId) => {
  const notes = await getNotes();
  const filterNotes = notes.filter(({ id }) => id !== removedId);
  await fs.writeFile(notesPath, JSON.stringify(filterNotes));
  console.log(chalk.bgGreen("The note was removed"));
};

const editNote = async (editId, newTitle) => {
  const notes = await getNotes();
  notes.forEach((note) => {
    if (note.id === editId) {
      note.title = newTitle;
    }
  });  
  await fs.writeFile(notesPath, JSON.stringify(notes));
};

const printNotes = async () => {
  const notes = await getNotes();
  console.log(chalk.bgBlue("It is the the list of notes"));
  notes.forEach(({ title, id }) => {
    console.log(chalk.blueBright("id:", id, "note:", title));
  });
};

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote
};
