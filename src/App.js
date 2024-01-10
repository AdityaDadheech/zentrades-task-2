import './App.css';
import { useEffect, useState } from 'react';
import Axios from "axios";
import { Display } from './components/Display';
import { FileDisplay } from './components/FileDisplay';
import DisplayHandlingTable from './components/DisplayHandlingTable';

function App() {
  

  return (
    <div className="App">
        {/* <Display/>  */}
       <FileDisplay/>  
    </div>
  );
}

export default App;
