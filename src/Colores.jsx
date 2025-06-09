import { useState, useEffect } from "react"
import Item from "./Item"
import Formulario from "./Formulario"

export default function Colores(){

    let [colores,setColores] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/colores")
        .then( respuesta => respuesta.json())
        .then( colores => setColores(colores))
    }, [])


    function crearColor(color){
        setColores([...colores,color])
    }

    function borrarColor(id){
        setColores(colores.filter( color => color.id != id ))
    }

    return <>
            <Formulario crearColor={crearColor} />
            <ul>
                { colores.map( ({id,r,g,b}) => <Item key={id} id={id} r={r} g={g} b={b} borrarColor={borrarColor} /> ) }
            </ul>
            </>
}