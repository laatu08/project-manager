import { useEffect, useState } from 'react'
import './App.css'
import { api } from "./services/api";

function App() {
  const [status, setStatus] = useState('')

  useEffect(()=>{
    api.get("/health").then(res=>{
      setStatus(res.data.status)
    })
  },[])
  
  return (
    <>
      <div className='p-10 text-2xl'>Backend Status: {status}</div>
    </>
  )
}

export default App
