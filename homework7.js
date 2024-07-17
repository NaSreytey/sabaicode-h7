class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }
  removeBook(title) {
    let index = this.books.findIndex((book) => book.title === title);
    if (index > -1) {
      this.books.splice(index, 1);
    }
  }
  searchBook(title, author, genre) {
    let searchBook = this.books.filter((book) => book.title.includes(title) ||book.author.includes(author) ||book.genre.includes(genre));
    if (searchBook.length > 0) {
      console.log(`\n===> this title "${title}" has been found`);
      searchBook.forEach((book) => {
        console.log(
          `searching book: -- ${book.title} by <${book.author}> - ${book.genre} - ${book.available}--`
        );
      });
    } else {
      console.log(`\n===> this title "${title}" has not been found`);
    }
    return searchBook;
  }
  displayBook() {
    const availableBooks = this.books.filter((book) => book.available);
    if (availableBooks.length === 0) {
      console.log("No available books.");
    } else {
      console.log("available book in library:");
      availableBooks.forEach((book) => {
        console.log(
          ` ${book.title} by <${book.author}> - ${book.genre} -${book.isbn}-${book.available}`
        );
      });
    }
  }
  borrowBook(title) {
    let book= this.books.find(book=>book.title===title);
    if (book) {
      if (book.available) {
        book.available = false;
        return book;
      } else {
        book.forEach((book)=>{
          console.log(`\n===>this book ${book.title} borrowed<====`);
        })
      }
    }else{
      console.log(`\n===> The book is not available for borrowing`);
    }
}
  returnBook(title){
    let book= this.books.find(book=>book.title===title);
    if (book) {
      if (!book.available) {
        book.available = true;
      } else {
        console.log('book is already to returned')
      }
    }else{
      console.log(`\n===> There is no book to borrowing`);
    }     
  }
}
// class for book
class Book {
  constructor(title, author, genre, isbn, available) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.available = available;
    this.isbn = isbn;
  }
}


class User {
  constructor(name) {
    this.name = name;
    this.borrowed_books = [];
  }

  borrowBook(library, title) {
    const book = library.borrowBook(title);
    if (book) {
      book.borrower = this.name;
      this.borrowed_books.push(book);
      return book;
    } else {
      console.log("Book is not available.");
    }
  }

  viewBook() {
    let forOutput = "[\n";
    this.borrowed_books.forEach((book) => (forOutput += book.toString()));
    forOutput += "]";
    console.log(forOutput);
  }
}

class Student extends User {
  constructor(name, borrowed_books) {
    super(name);
    this.borrowed_books = borrowed_books;
  }

  borrowBook(library, book) {
    if (this.borrowed_books.length < 5) {
      super.borrowBook(library, book);
    } else {
      console.log("You can borrow only 5 books.");
    }
  }
}

class Admin extends User {
  constructor(name, borrowed_books) {
    super(name);
    this.borrowed_books = borrowed_books;
  }

  borrowBook(library, book) {
    super.borrowBook(library, book);
  }
}

const library = new Library("Rupp library");
const book1 = new Book("khmer", "ny na", "genre1","001",true);
const book2 = new Book("korea", "nea", "genre2","002",true);

console.log('======Adding book======')
library.addBook(book1);
library.addBook(book2);
library.displayBook()


console.log('======removing book======')
library.removeBook('')
library.displayBook();

console.log('======Searching book======')
library.searchBook('korea');
library.displayBook();

console.log('======borrowing book======')
library.borrowBook('korea');
library.displayBook()


console.log('======return book======')
library.returnBook('korea')
console.log(library)
library.displayBook()


const student=new Student('neath',[]);
console.log(student)

student.borrowBook(library, 'khmer');
student.viewBook();
let admin=new Admin('neth',new Book('kolab bailen','Nhok Thaem','khmer','004',true))
console.log(admin)

