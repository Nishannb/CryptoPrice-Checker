import Home from './Routes/Home'
import Detail from './Routes/Details';
import { Route, Routes } from "react-router-dom";


function App(){
    return(
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Home />} />     
          <Route exact path="/:id" element={<Detail />} />          
        </Routes>
      </div>
    )
  }

export default App
