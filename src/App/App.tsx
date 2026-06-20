import "../Styles/index.scss";
import "../Styles/mixins.scss";
import "./Styles.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "../Components/Widgets/Header/Header";
import { FetchCardList } from "../Components/Widgets/CardList/FetchCardList";
import { Register } from "../Components/Widgets/Register/Register";
import { Login } from "../Components/Widgets/Login/Login";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../api/queryClient";
import { AuthProvider } from "../api/auth/AuthContext";
import { Profile } from "../Components/Widgets/Profile/Profile";
import { EditProfile } from "../Components/Widgets/EditProfile/EditProfile";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OutletWrapper />}>
              <Route index element={<FetchCardList />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
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
