import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import image from './cryptomonedas.png';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';
import Spinner from './componentes/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cryptomoneda, guardarCryptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  //Escucha por los cambios de moneda y cryptomoneda
  useEffect(() => {
    
    const cotizarCryptomoneda = async () => {
      if(moneda === '') return;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
      console.log(url);
      const resultado = await axios.get(url);

      //mostrar spinner
      guardarCargando(true);
      //ocultamos spinner
      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[cryptomoneda][moneda]);
      }, 3000);
      
    }
    cotizarCryptomoneda();

  }, [moneda, cryptomoneda]);

  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen
          src={image}
          alt="Imagen crypto"
        />
      </div>
      <div>
        <Heading>Cortiza cryptomonedas al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCryptomoneda={guardarCryptomoneda}
        />

        {componente}
        
      </div>
    </Contenedor>
  );
}

export default App;
