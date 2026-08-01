import "../Styles/index.scss";
import "../Styles/mixins.scss";
import "./Styles.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import { lazy } from "react";

const Header = lazy(() =>
  import("../Components/Pages/Header/Header").then((module) => ({
    default: module.Header,
  })),
);

const FetchCardList = lazy(() =>
  import("../Components/Pages/FetchCardList/FetchCardList").then((module) => ({
    default: module.FetchCardList,
  })),
);

const Register = lazy(() =>
  import("../Components/Pages/Register/Register").then((module) => ({
    default: module.Register,
  })),
);

const Login = lazy(() =>
  import("../Components/Pages/Login/Login").then((module) => ({
    default: module.Login,
  })),
);

const Profile = lazy(() =>
  import("../Components/Pages/Profile/Profile").then((module) => ({
    default: module.Profile,
  })),
);

const EditProfile = lazy(() =>
  import("../Components/Pages/EditProfile/EditProfile").then((module) => ({
    default: module.EditProfile,
  })),
);

const Post = lazy(() =>
  import("../Components/Pages/Post/Post").then((module) => ({
    default: module.Post,
  })),
);

const AddComment = lazy(() =>
  import("../Components/Pages/AddComment/AddComment").then((module) => ({
    default: module.AddComment,
  })),
);

const AddNewPost = lazy(() =>
  import("../Components/Pages/AddNewPost/AddNewPost").then((module) => ({
    default: module.AddNewPost,
  })),
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.VITE_BASENAME}>
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