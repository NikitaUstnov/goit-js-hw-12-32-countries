import fetchCountries from './fetchCountries.js';
import countryCard from './template.hbs';
import countryListHbs from './countryList.hbs';
var debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const searchInputRef = document.querySelector('input');
const countryInfoEl = document.querySelector('.wrapper');
const countryListRef = document.querySelector('.country-list');

searchInputRef.addEventListener('input', debounce(searchCountru, 500));

function renderCountry(country) {
  if (country.length === 1) {
    countryInfoEl.insertAdjacentHTML('beforeend', countryCard(country));
  } else if (country.length >= 2 && country.length <= 10) {
    countryListRef.insertAdjacentHTML('beforeend', countryListHbs(country));
  } else if (country.length > 10) {
    throwError('to many maches');
  }
}

function throwError(err) {
  error({ text: `${err}` });
}

function searchCountru(e) {
  e.preventDefault();

  const countryQuery = searchInputRef.value;

  if (countryQuery.length === 0) {
    searchInputRef.innerHTML = '';
    countryInfoEl.innerHTML = '';
    countryListRef.innerHTML = '';

    return;
  }

  fetchCountries(countryQuery)
    .then(renderCountry)
    .catch(error => throwError('not found'));
}
