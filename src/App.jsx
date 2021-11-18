import React, { useEffect, useState } from "react";
import {store} from './firebaseconfig';

function App() {

  const [idu, setidu]= useState('')
  const [name, setname]= useState('')
  const [num, setnum]=useState('')
  const [error, setError]=useState('')
  const [edicion, setedi]= useState(null)
  const [usuario, setUsuario]= useState([])

  const setuser = async(e) =>{
     e.preventDefault()
    if(!name.trim()){
      setError('El Campo Nombre está Vacío')
    }
    if(!num.trim()){
      setError('El Campo Numero está Vacío y solo ingresa numeros')
    }

    const user={
      nombre: name,
      telefono: num
    }
    try{
      const data = await store.collection('agenda').add(user)
      const { docs } = await store.collection('agenda').get()
      const newArray = docs.map(item=>({id: item.id, ...item.data() }))
      setUsuario(newArray)
      alert('Usuario Agregado')
    }catch(e){
      console.log(e)
    }
    setname('')
    setnum('')

  }

  useEffect(()=>{
    const getusuario = async()=>{
      const { docs } = await store.collection('agenda').get()
      const newArray = docs.map(item=>({id: item.id, ...item.data() }))
      setUsuario(newArray)
    }
    getusuario()
  },[])

  const eliminar= async(id)=>{
    try{
      await store.collection('agenda').doc(id).delete()
      const { docs } = await store.collection('agenda').get()
      const newArray = docs.map(item=>({id: item.id, ...item.data() }))
      setUsuario(newArray)
    }catch{

    }
  }

  const actu = async (id)=>{
    try{
      const data = await store.collection('agenda').doc(id).get()
      const {nombre, telefono}= data.data()
      setname(nombre)      
      setnum(telefono)
      setidu(id)
      setedi(true)
      console.log(id)
    }catch(e){
      console.log(e)
    }

  }

  const setupdate= async (e) =>{
    e.preventDefault()
    if(!name.trim()){
      setError('El Campo Nombre está Vacío')
    }
    if(!num.trim()){
      setError('El Campo Numero está Vacío y solo ingresa numeros')
    }
    const userUpda = { nombre:name, telefono:num}
    try{
      await store.collection('agenda').doc(idu).set(userUpda)
      const { docs } = await store.collection('agenda').get()
      const newArray = docs.map(item=>({id: item.id, ...item.data() }))
      setUsuario(newArray)
    }catch(e){
      console.log(e)
    }
    setname('')
    setnum('')
    setidu('')
    setedi(false)
  }

  return (
    <div className="container">
     <div className="row">
       <div className="col">
         <h2>Formulario de Usuarios</h2>
         <form className="form-group" onSubmit={edicion ? setupdate : setuser} >
          <label className="mt-3 form-label">Nombre</label>
          <input type="text" className="form-control mt-2" value={name} placeholder="Ingresa tu Nombre" onChange={(e)=>{setname(e.target.value)}} />
          <label className="mt-3 form-label">Número</label>
          <input type="number" className="form-control mt-2" value={num} placeholder="Ingresa tu Número" onChange={(e)=>{setnum(e.target.value)}} />
          {
            edicion ? (
              <input type="submit" value="Editar" className="btn-block btn btn-dark mt-3"/>
            ) : (
              <input type="submit" value="Registrar" className="btn-block btn btn-dark mt-3"/>
            )
          }
          
         </form>
         {
           error ? (
             <div><p>{error}</p></div>
           ) : (
             <span></span>
           )
         }
       </div>
       <div className="col">
         <h2>Lista de Agenda</h2>
         {
           usuario.length !== 0 ?
           (
             usuario.map(item => (
               <p className="list-group-item" key={item.id}>{item.nombre} -- {item.telefono} 
                <button className="btn btn-danger float-end" onClick={(id)=>{eliminar(item.id)}}>Delete</button>
                <button className="btn btn-warning float-end" onClick={(id)=>{actu(item.id)}}>Update</button> 
               </p>
             ))
           )
           :
           (
             <p>No hay Usuarios en tu Agenda :c </p>
           )
         }
       </div>
     </div>
    </div>
  );
}

export default App;
