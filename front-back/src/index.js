import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/styles/index.css';
import App from "./pages/App"
import Provider from '../src/context/Provider.jsx'
/* import Registro from "../src/components/registro" */




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<Provider>

    <App />
</Provider>
{/* <Registro/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

