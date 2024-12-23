
import './style.css'
import { useEffect, useState, useRef } from 'react'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'



function Home() {
  const [users, setUsers] = useState([])

  const imputName = useRef()
  const imputAge = useRef()
  const imputEmail = useRef()
  

  async function getUsers(){
    const usersFormApi = await api.get('/usuarios')

    setUsers(usersFormApi.data) 
    
  }

  async function createUsers(){
     await api.post('/usuarios', {
        name: imputName.current.value,
        age: imputAge.current.value,
        email: imputEmail.current.value

     })

     getUsers()
  }

  async function deleteUsers(id){
     await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

    

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder="Nome" name='nome' type='text' ref={imputName} />
        <input placeholder="Idade" name='idade' type='number' ref={imputAge} />
        <input placeholder="E-mail" name='email' type='email' ref={imputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span> </p>
            <p>Idade:<span>{user.age}</span> </p>
            <p>Email:<span>{user.email}</span> </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home
