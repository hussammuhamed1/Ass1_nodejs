class Note {
  id: number;
  title: string;
  content: string;
  userId: User["id"];

  constructor(id: number, title: string, content: string, userId: User["id"]) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  preview(): void {
    console.log(`Title: ${this.title}`);
    console.log(`Content: ${this.content}`);
  }
}

class Notebook {
  notes: Note[] = [];
  constructor(
    public id: number,
    public title: string,
  ) {}

  addNote(note: Note): void {
    this.notes.push(note);
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }
}

class User {
  private id: number;
  name: string;
  email: string;
  protected password: string;
  phone: string;
  age: number;
  notebooks: Notebook[] = [];
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  addNotebook(notebook: Notebook): void {
    this.notebooks.push(notebook);
  }

  displayInfo() {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Email: ${this.email}`);
    console.log(`Phone: ${this.phone}`);
    console.log(`Age: ${this.age}`);
  }
}

class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(id, name, email, password, phone, age);
  }

  manageNotes(): void {
    console.log("Admin can manage notes.");
  }
}

// Generic class

class Storage<T> {
  private items: T[] = [];
  constructor(item: T) {
    this.items.push(item);
  }
  addItem(item: T): void {
    this.items.push(item);
  }
  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }
  getallItems(): T[] {
    return this.items;
  }
}
