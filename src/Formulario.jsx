import { useState } from "react"

export default function Formulario({crearColor}){

    let [textoInput,setTextoInput] = useState("")
    let [error,setError] = useState(false)



    return <form onSubmit={ evento => {
                evento.preventDefault()

                setError(false) 

                if(/^([0-9]{1,3},){2}[0-9]{1,3}$/.test(textoInput)){ 
            
                    let valores = textoInput.split(",").map( n => Number(n) )

                    let valido = true

    
                    let i = 0

                    while(valido && i < 3){
                        valido = valores[i] <= 255
                        i++
                    }

                    if(valido){
                        const [r,g,b] = valores
                        
                        return fetch("https://api-colores-mongo-esjk.onrender.com/nuevo", {
                            method : "POST",
                            body : JSON.stringify({r,g,b}),
                            headers : {
                                "Content-type" : "application/json"
                            }
                        })
                        .then(respuesta => respuesta.json())
                        .then( ({id,error}) => {
                           if(!error){
                            crearColor({id,r,g,b})
                            return setTextoInput("")
                           }
                           console.log("..error")
                        })
                        


                    }
                }

                setError(true)
            }}>
                <input type="text" placeholder="rrr,ggg,bbb" value={textoInput} onChange={ evento => setTextoInput(evento.target.value)} />
                <p className={ `error ${error ? "visible" : "" }` }>debe escribir tres valores entre 0 y 255 separados por comas</p>
                <input type="submit" value="crear color" />
            </form>
}