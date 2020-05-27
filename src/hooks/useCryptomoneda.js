import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

//creamos hooks custom, podemos ponerle un parámetro, para que al llamar el 
//state, podamos hacer el contenido dinámico.
const useCryptomoneda = (label, stateInicial, opciones) => {
    //En este sector va el state u otras operaciones
    //State de nuestro custom hook
    const [state, actualizarState] = useState('', stateInicial);

    const SelectCrypto = () => (
        //Lo que va aquí dentro es lo que se muestra en pantalla
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}

            </Select>
        </Fragment>
    )
    //Retornar state, interfaz y función que modifica el state
    return [state, SelectCrypto, actualizarState];

}

export default useCryptomoneda;