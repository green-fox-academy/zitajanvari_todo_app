import minimist from "minimist";

import fs from "fs";

const args = minimist(process.argv);

class Todo {
  constructor(content, status = false) {
    this.content = content;
    this.status = status;
  }

  content;
  status;
}

class Todos {
  list = [];

  getStatus(index) {
    return this.list[index].status;
  }

  setStatus(index) {
    this.list[index - 1].status = true;
  }

  add(todo) {
    this.list.push(todo);
  }

  delete(index) {
    this.list.splice(index - 1, 1);
  }

  getList() {
    return this.list;
  }

  printList() {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].status === true) {
        console.log(i + 1 + ". [x] " + this.list[i].content);
      } else {
        console.log(i + 1 + ". [ ] " + this.list[i].content);
      }
    }
  }
}

const todoList = new Todos();

const jsonContent = fs.readFileSync("todos.json", "utf-8");
const jsonTodos = JSON.parse(jsonContent);

for (let i = 0; i < jsonTodos.length; i++) {
  const todos = new Todo(jsonTodos[i].content, jsonTodos[i].status);
  todoList.add(todos);
}

if (args.l) {
  if (todoList.getList().length === 0) {
    console.log("Nincs mára tennivalód! :)");
  }
  todoList.printList();
} else if (args.a) {
  let aTodo = new Todo(args.a);
  todoList.add(aTodo);
} else if (args.r != undefined) {
  todoList.delete(args.r);
} else if (args.c != undefined) {
  todoList.setStatus(args.c);
} else if (Object.keys(args).length < 2) {
  console.log(`Parancssori Todo applikáció
=============================

Parancssori argumentumok:
    -l   Kilistázza a feladatokat
    -a   Új feladatot ad hozzá
    -r   Eltávolít egy feladatot
    -c   Teljesít egy feladatot`);
} else {
  console.log("Nem támogatott argumentum!");
  console.log(`Parancssori Todo applikáció
=============================

Parancssori argumentumok:
    -l   Kilistázza a feladatokat
    -a   Új feladatot ad hozzá
    -r   Eltávolít egy feladatot
    -c   Teljesít egy feladatot`);
}

let jsonTodosWrite = todoList.getList();

fs.writeFileSync("todos.json", JSON.stringify(jsonTodosWrite, null, 4));
