export default function Item({id,r,g,b,borrarColor}){
    return <li onClick={ () => {
                fetch("http://localhost:3000/colores/borrar/" + id, {
                    method : "DELETE"
                })
                .then(respuesta => {
                    if(respuesta.status == 204){
                        return borrarColor(id)
                    }
                    console.log("...error")
                })
            } } style={ {
                    backgroundColor : `rgb(${[r,g,b].join(",")})`
            } }>{ [r,g,b].join(",") }</li>
}