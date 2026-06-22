import "../Styles/index.scss";
import "../Styles/mixins.scss";
import "./Styles.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "../Components/Pages/Header/Header";
import { FetchCardList } from "../Components/Pages/FetchCardList/FetchCardList";
import { Register } from "../Components/Pages/Register/Register";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../api/queryClient";
import { AuthProvider } from "../api/auth/AuthContext";
import { Profile } from "../Components/Pages/Profile/Profile";
import { EditProfile } from "../Components/Pages/EditProfile/EditProfile";
import { Post } from "../Components/Pages/Post/Post";
import { Login } from "../Components/Pages/Login/Login";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Чтобы запустить версию в проде, надо добавить в BrowserRouter basename="/travel-production" */}
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<OutletWrapper />}>
              <Route index element={<FetchCardList />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/post/:id" element={<Post />} />
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
