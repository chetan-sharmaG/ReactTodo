import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';
import { MdModeEdit } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, setTodos] = useState([])
  const [add,setAdd]=useState("Add")
  useEffect(()=>{
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
      
  },[])

  const saveToLS = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleAdd = () => {
    setAdd("Add")
    if(!todo){
      return
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
  }
  const handleEdit = (e,id) => {

    
    let t = todos.filter(i=>i.id===id)
    if(t[0].isCompleted){
      return 
    }
    settodo(t[0].todo)
    let newTodo = todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newTodo)
    saveToLS()
    setAdd("Save")
  }
  const onChange = (e) => {

    settodo(e.target.value)
  }

  const checkBoxHandle = (e) => {

    let id = e.target.name
    console.log(id)
    let key = todos.findIndex(item => {
      return item.id === id
    })
    console.log(key)
    let newTodos = [...todos]
    newTodos[key].isCompleted = !newTodos[key].isCompleted
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e,id) => {
      let newTodo = todos.filter(item=>{
        return item.id!=id
      })
      setTodos(newTodo)
      saveToLS()
  }

  return (
    <>
      <Navbar />
      
      <div className='mx-3 md:container md:mx-auto my-5 rounded-lg p-5 bg-violet-100 min-h-[70vh] md:w-1/2 '>
      <h1 className='text-center font-bold text-xl'>Mange Your iTask in One Place</h1>
        <div className='addToTodo my-5 flex flex-col  w-full gap-5'>
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={onChange} value={todo} type='text' className='px-3 py-1 rounded-lg' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-full mx-6 cursor-pointer'>
            {add}
          </button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        {todos.length===0 && <div>No Todos to Display</div>}
        {todos.map((item, index) => {
          return (<div key={item.id} className='todo flex md:w-1/2 my-3 justify-between'>
            <div className='flex gap-5'>
            <input type='checkbox' name={item.id} checked={item.isCompleted} onChange={checkBoxHandle} />
            <div className={item.isCompleted ? "line-through" : ""}>
              {item.todo}</div>
              </div>
            
            <div className='MyButtons flex h-full'>
              {item.isCompleted?<button  className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 cursor-not-allowed'>
              <MdModeEdit />
              </button>:<button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'>
              <MdModeEdit />
              </button>}
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'>
              <MdDelete />
              </button>
            </div>

          </div>)
        })}

      </div>

    </>
  )
}

export default App
