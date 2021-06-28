import fetchCountries from './fetchCountries.js';
import countryCard from './template.hbs';
import countryListHbs from './countryList.hbs';
import { alert, defaultModules } from '@pnotify/core';
import debounce from 'lodash';

const searchInputRef = document.querySelector('input');
const countryInfoEl = document.querySelector('.wrapper');
const countryListRef = document.querySelector('.country-list');

searchInputRef.addEventListener('input', e => {
  debounce(() => {
    cosole.log(e.target.value);
  }, 2000);
});

function renderCountryList(counties) {
  countryListRef.insertAdjacentHTML('beforeend', countryListHbs(counties));
}

function renderCountry(country) {
  countryInfoEl.insertAdjacentHTML('beforeend', countryCard(country));
}

function event(e) {
  let country = e.target.value;

  fetchCountries(country).then(data => {
    data.find(contry => {
      renderCountry(contry);
    });
  });
  //   fetchCountries(country).then(renderCountryList).then(renderCountry);
}
