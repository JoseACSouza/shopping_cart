import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';

import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productChart = document.getElementsByTagName('section')[1];
productChart.appendChild(createCustomElement('p', 'loading', 'carregando...'));

fetchProductsList('computador').then((data) => {
  const removeLoading = document.getElementsByClassName('loading')[0];
  removeLoading.parentNode.removeChild(removeLoading);
  data.forEach((element) => {
    productChart.appendChild(createProductElement(element));
  });
}).catch(() => {
  const removeLoading = document.getElementsByClassName('loading')[0];
  removeLoading.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  removeLoading.classList.add('error');
});
