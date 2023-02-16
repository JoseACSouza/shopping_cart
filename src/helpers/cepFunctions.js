export const getAddress = async (cep) => {
  const api1 = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const response1 = await api1.json();
  const api2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const response2 = await api2.json();
  const result = await Promise.any([response2, response1])
    .catch((error) => {
      console.error(error);
    });
  return result;
};

export const searchCep = () => {
  const cepLength = 8;
  const getInput = document.getElementsByClassName('cep-input')[0];
  if (getInput.value.length === cepLength) {
    getAddress(getInput.value).then((data) => {
      if (data.ddd) {
        const { address, district, city, state } = data;
        const getOutput = document.getElementsByClassName('cart__address')[0];
        getOutput.innerHTML = `${address} - ${district} - ${city} - ${state}`;
      } else {
        const { street, neighborhood, city, state } = data;
        const getOutput = document.getElementsByClassName('cart__address')[0];
        getOutput.innerHTML = `${street} - ${neighborhood} - ${city} - ${state}`;
      }
    }).catch(() => {
      const getOutput = document.getElementsByClassName('cart__address')[0];
      getOutput.innerHTML = 'CEP não encontrado';
    });
  }
};
