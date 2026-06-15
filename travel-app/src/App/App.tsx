import "../Styles/index.scss";
import "../Styles/mixins.scss";
import "./Styles.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "../Components/Widgets/Header/Header";
import { FetchCardList } from "../Components/Widgets/CardList/FetchCardList";
import { Register } from "../Components/Widgets/Register/Register";
import { Login } from "../Components/Widgets/Login/Login";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutletWrapper />}>
          <Route index element={<FetchCardList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function OutletWrapper() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
