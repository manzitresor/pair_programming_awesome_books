class AwesomeBooks {
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

  localBooks(books) {
    books = this.books;
    const storage = JSON.parse(localStorage.getItem('Books'));
    return storage || books;
  }

  displayBooks(booksList) {
    this.booksContainer.innerHTML = '';
    for (let i = 0; i < booksList.length; i += 1) {
      this.booksContainer.innerHTML += `
            <br>
            <div class="main-div">  <p class="pargraph-books">"${booksList[i].title}" by ${booksList[i].author}</p>
            <div class="buton-books"> <button  id="remove${i}" onclick="awesomeBook.removeItem(${i})" >Remove</button><br/></div> 
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

  removeItem(items) {
    if (items !== undefined) {
      const localItem = this.localBooks(this.books);
      const removedItem = localItem.filter(
        (item) => item.id !== localItem[items].id,
      );
      localStorage.setItem('Books', JSON.stringify(removedItem));
      return this.displayBooks(this.localBooks(this.books));
    }
    return this.displayBooks(this.localBooks(this.books));
  }
}
const awesomeBook = new AwesomeBooks();
awesomeBook.removeItem();
document.getElementById('add').addEventListener('click', () => {
  awesomeBook.adding();
});
