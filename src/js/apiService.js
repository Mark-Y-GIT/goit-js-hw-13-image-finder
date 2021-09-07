import { params } from './params';
import refs from './refs';
import { clearGallery, clearInput, renderCards } from './render';

let { queryUrl, pixabayKey, pageNumber, queryValue } = params;

const onsubmit = refs.formRef.addEventListener('submit', e => {
  e.preventDefault();
  clearGallery();

  queryValue = e.currentTarget.elements.query.value;

  fetchData(queryValue);
});

export const fetchData = function () {
  if (queryValue === '') {
    refs.loadMoreRef.classList.add('is-hidden');
    return alert('empty input');
  }

  fetch(`${queryUrl}=${queryValue}&page=${pageNumber}&per_page=12&key=${pixabayKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length === 0) {
        return alert('error length 0');
      }
      renderCards(data);

      scroll();
    })
    .then(refs.loadMoreRef.classList.remove('is-hidden'))
    .then((pageNumber += 1))

    .then(clearInput)

    .catch(error => {
      clearGallery(), console.log(error);
    });
};

refs.loadMoreRef.addEventListener('click', queryValue => {
  fetchData(queryValue);
});

const scrollTarget = document.querySelector('.main-container');

function scroll() {
  scrollTarget.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
