'use client'
import React from 'react';
import CardLogin from './components/CardLogin';

export default function Login(){
    const estilo = {
        position: 'fixed', /* Define a posição fixa */
        top: '50%', /* Alinha o topo do elemento na metade da altura da tela */
        left: '50%', /* Alinha a esquerda do elemento na metade da largura da tela */
        transform: 'translate(-50%, -50%)', /* Move o elemento de volta metade de sua própria largura e altura, centralizando-o */
    };

    return(
        <>
            <div style={estilo}>
                <CardLogin />
            </div>
        </>
    )
}