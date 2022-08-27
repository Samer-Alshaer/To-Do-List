// Save Data In Local Storage
let tasksStorage = {
     save: function (tasks) {
          localStorage.setItem("tasks", JSON.stringify(tasks));
     },
};

var myapp = new Vue({
     el: "#app",
     data: {
          tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
          search: "",
          errorMsg: "",
          visibility: "false",
          editedTask: null,
          addNote: {
               id: 0,
               note: "",
               bgcolor: "",
          },
     },
     methods: {
          add_note() {
               if (this.editedTask === null && this.addNote.note !== "") {
                    this.tasks.push({
                         id: this.addNote.id++,
                         note: this.addNote.note,
                         bgcolor: this.addNote.bgcolor,
                         date: new Date().toLocaleString(),
                         completed: false
                    });
                    (this.addNote.note = ""),
                         (this.addNote.bgcolor = "");
               } else {
                    if (this.editedTask !== null) {
                         this.tasks[this.editedTask].note = this.addNote.note;
                         this.editedTask = null;
                    }
                    this.addNote.note = "";
               }
          },

          editNote(id) {
               let i = this.tasks.map(item => item.id).indexOf(id); // find index of your object
               this.addNote.note = this.tasks[i].note;
               this.editedTask = i;
          },

          deleteNote(id) {
               let i = this.tasks.map(item => item.id).indexOf(id);
               this.tasks.splice(i, 1)
          },

          deleteAll() {
               return this.tasks = []
          },

          completedNote(id) {
               let i = this.tasks.map(item => item.id).indexOf(id);
               this.tasks[i].completed = true;
          },

          clearCompleted() {
               samer = this.tasks.filter((item) => {
                    return item.completed = false;
               })
          }
     },
     computed: {
          filteredNotes() {
               var key = new RegExp(this.search, 'i');
               return this.tasks.filter(function (item) {
                    return item.note.match(key) || item.date.match(key);
               })
          },
     },
     watch: {
          // For Save Data In Local Storage
          tasks: {
               handler: function (tasks) {
                    tasksStorage.save(tasks);
               },
               deep: true,
          },

          "addNote.note": function (note) {
               if (note) {
                    return this.visibility = "true";
               }
               if (!note) {
                    return this.visibility = "false";
               }
          },
     },
});
