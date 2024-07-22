import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Invoice from "./components/Invoice"
import PrintComponent from './components/PrintComponent'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Form />
      <PrintComponent />
    </>
  );
}

export default App
