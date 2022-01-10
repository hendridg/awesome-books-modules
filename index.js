import { DateTime } from 'luxon';
import Book from './modules/index.js';

const form = document.querySelector('.form-input');
const [title, author] = form.elements;
const [navList, navAdd, navContact] = document.querySelectorAll('.list-item');
const allBooks = document.querySelector('.all-books');
const addBook = document.querySelector('.add-book');
const contact = document.querySelector('.contact');
const divTime = document.querySelector('.date-time');

function setDate() {
  const dt = DateTime.now();
  divTime.textContent = dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
}

setInterval(setDate, 1000);

setDate();

const inputBook = {};
const objBook = new Book();

if (localStorage.savedBooks) {
  objBook.books = JSON.parse(localStorage.getItem('savedBooks'));
}

navList.addEventListener('click', () => {
  allBooks.classList.remove('hidden');
  addBook.classList.add('hidden');
  contact.classList.add('hidden');
});

navAdd.addEventListener('click', () => {
  addBook.classList.remove('hidden');
  allBooks.classList.add('hidden');
  contact.classList.add('hidden');
});

navContact.addEventListener('click', () => {
  contact.classList.remove('hidden');
  allBooks.classList.add('hidden');
  addBook.classList.add('hidden');
});

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(objBook.books));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  objBook.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

objBook.displayBooks();
populateFields();
