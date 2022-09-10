import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState); // Estado

    const reset = () => {                               // Función de reset
        setValues( initialState );
    }


    const handleInputChange = ({ target }) => {         // Función de cambio del estado según valores del formulario

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    return [ values, handleInputChange, reset ];

}