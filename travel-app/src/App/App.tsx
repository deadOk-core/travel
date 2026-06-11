import { useState } from "react";

import "../Styles/index.scss";
import "./Styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../Components/Widgets/Header/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
