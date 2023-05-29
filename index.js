let books = [];
const booksContainer = document.getElementById('books');
const title = document.getElementById('title');
const author = document.getElementById('author');

function localBooks(books) {
  const storage = JSON.parse(localStorage.getItem('Books'));
  return storage || books;
}

function displayBooks(booksList) {
  booksContainer.innerHTML = '';
  for (let i = 0; i < booksList.length; i += 1) {
    booksContainer.innerHTML += `
      <br>
      <p>${booksList[i].title}</p>
      <p>${booksList[i].author}</p>
      <button id="remove${i}" onclick=" removeItem(${i})" >Remove</button><br/>
      <hr>
      <br/>
    `;
  }
}

function adding(title, author) {
  if (title.value.length > 1 && author.value.length > 1) {
    books = localBooks(books);
    books.push({ id: Date.now(), title: title.value, author: author.value });
    localStorage.setItem('Books', JSON.stringify(books));
    displayBooks(localBooks(books));
    title.value = '';
    author.value = '';
  }
}

function removeItem(items) {
  if (items !== undefined) {
    const localItem = localBooks(books);
    const removedItem = localItem.filter(
      (item) => item.id !== localItem[items].id,
    );
    localStorage.setItem('Books', JSON.stringify(removedItem));
    return displayBooks(localBooks(books));
  }
  return displayBooks(localBooks(books));
}

document.getElementById('add').addEventListener('click', () => {
  adding(title, author);
});
removeItem();
