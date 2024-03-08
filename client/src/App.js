import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  const id = localStorage.getItem("userId");
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={id ? <Blogs /> : <Login />} />
        <Route path="/All-blogs" element={id ? <Blogs /> : <Login />} />
        <Route path="/my-blogs" element={id ? <UserBlogs /> : <Login />} />
        <Route
          path="/update-details/:id"
          element={id ? <UpdateBlog /> : <Login />}
        />
        <Route
          path="/blog-details/:id"
          element={id ? <BlogDetail /> : <Login />}
        />
        <Route path="/create-blog" element={id ? <CreateBlog /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
