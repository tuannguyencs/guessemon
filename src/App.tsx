import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import './css/styles.css'

function App() {
  return (
    <div className="">
      <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </BrowserRouter>
        </Layout>
    </div>
  );
}

export default App;
