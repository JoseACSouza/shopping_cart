export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (search) => {
  // seu código aqui
  if (!search) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
  const data = await response.json();
  return data.results;
};
