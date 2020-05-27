import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCryptomoneda from '../hooks/useCryptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCryptomoneda}) => {

    //State del listado de cryptomonedas
    const [lsitarcrypto, guardarCryptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dólar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'UYU', nombre: 'Peso Uruguayo'}
    ];

    //Utilizamos useMoneda, nuestro custom hook
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);
    //Usamos cryptomoneda
    const [cryptomoneda, SelecrCrypto] = useCryptomoneda('Elige tu Cryptomoneda', '', lsitarcrypto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCryptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //Cuando se hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar campos
        if(moneda === '' || cryptomoneda === '') {
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCryptomoneda(cryptomoneda);
    }

    return ( 
        <form 
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMoneda/>

            <SelecrCrypto/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;