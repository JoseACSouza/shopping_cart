import { getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import {
  createProductElement,
  createCustomElement,
  createCartProductElement,
  sumPrice,
} from './helpers/shopFunctions';

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
const loadCart = async () => {
  const solvedPromises = await Promise.all(getSavedCartIDs()
    .map((element) => fetchProduct(element)));
  solvedPromises.forEach((item) => {
    document.getElementsByClassName('cart__products')[0]
      .appendChild(createCartProductElement(item));
    sumPrice(item.price);
  });
};
loadCart();
