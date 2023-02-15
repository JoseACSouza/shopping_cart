export const fetchProduct = async (product) => {
  if (!product) {
    throw new Error('ID não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/items/${product}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (search) => {
  if (!search) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
  const data = await response.json();
  return data.results;
};
