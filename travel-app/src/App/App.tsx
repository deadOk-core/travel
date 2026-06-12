import "../Styles/index.scss";
import "./Styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../Components/Widgets/Header/Header";
import { CardList } from "../Components/Widgets/CardList/CardList";
import { Card } from "../Components/Widgets/Card/Card";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <CardList/>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
