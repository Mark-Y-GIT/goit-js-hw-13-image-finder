import refs from '../js/refs';
import card from '../templates/card.hbs';

export function clearInput() {
  refs.inputRef.value = '';
}

export function renderCards(markupData) {
  refs.galleryRef.insertAdjacentHTML('beforeend', card(markupData.hits));
}

export function clearGallery() {
  refs.galleryRef.innerHTML = '';
}
