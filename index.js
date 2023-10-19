const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note on id",
  builder: {
    id: {
      type: "string",
      describe: "id of title",
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNote(id);
  },
});

yargs.command({
  command: "list",
  describe: "Show the list of notes",
  handler() {
    printNotes();
  },
});

yargs.parse();
