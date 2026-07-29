import "../Styles/index.scss";
import "../Styles/mixins.scss";
import "./Styles.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "../Components/Pages/Header/Header";
import { FetchCardList } from "../Components/Pages/FetchCardList/FetchCardList";
import { Register } from "../Components/Pages/Register/Register";
import { Provider } from "react-redux";
import { Profile } from "../Components/Pages/Profile/Profile";
import { EditProfile } from "../Components/Pages/EditProfile/EditProfile";
import { Post } from "../Components/Pages/Post/Post";
import { Login } from "../Components/Pages/Login/Login";
import { AddComment } from "../Components/Pages/AddComment/AddComment";
import { AddNewPost } from "../Components/Pages/AddNewPost/AddNewPost";
import { store } from '../Store/store'

function App() {
  return (
      <Provider store={store}>
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
              <Route path="/post/:id/comment" element={<AddComment />} />
              <Route path="/newPost" element={<AddNewPost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
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
