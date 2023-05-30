class awesomeBooks {
  books;

  booksContainer;

  title;

  author;

  constructor() {
    this.books = [];
    this.booksContainer = document.getElementById('books');
    this.title = document.getElementById('title');
    this.author = document.getElementById('author');
  }

  // eslint-disable-next-line class-methods-use-this
  localBooks(books) {
    const storage = JSON.parse(localStorage.getItem('Books'));
    return storage || books;
  }

  displayBooks(booksList) {
    this.booksContainer.innerHTML = '';
    for (let i = 0; i < booksList.length; i += 1) {
      this.booksContainer.innerHTML += `
            <br>
            <div class="main-div">  <p class="pargraph-books">"${booksList[i].title}" by ${booksList[i].author}</p>
            <div class="buton-books"> <button  id="remove${i}" onclick="awesome_books.removeItem(${i})" >Remove</button><br/></div> 
            <br/></div>
          `;
    }
  }

  adding() {
    if (this.title.value.length > 1 && this.author.value.length > 1) {
      this.books = this.localBooks(this.books);
      this.books.push({
        id: Date.now(),
        title: this.title.value,
        author: this.author.value,
      });
      localStorage.setItem('Books', JSON.stringify(this.books));
      this.displayBooks(this.localBooks(this.books));
      this.title.value = '';
      this.author.value = '';
    }
  }
  /* eslint-disable */
  removeItem(items) {
    if (items !== undefined) {
      const localItem = this.localBooks(this.books);
      const removedItem = localItem.filter(
        (item) => item.id !== localItem[items].id
      );
      localStorage.setItem("Books", JSON.stringify(removedItem));
      return this.displayBooks(this.localBooks(books));
    }
    return this.displayBooks(this.localBooks(books));
  }
}
const awesome_books = new awesomeBooks();
awesome_books.removeItem();
document.getElementById("add").addEventListener("click", () => {
  awesome_books.adding();
});
