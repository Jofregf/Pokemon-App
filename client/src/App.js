import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import React from 'react'
import Card from './components/Card';
import Create from './components/Create';
import Details from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes> {/* matchea solo los link usados */}
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/card" element={<Card/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/home/:id" element={<Details/>}/>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;

