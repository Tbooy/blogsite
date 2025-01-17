import './App.css'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import DashBoard from './DashBoard'
import Blogs from './pages/Blogs'
import AddBlog from './pages/AddBlog'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetails from './pages/BlogDetails'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'

function App() {

  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:_id" element={<BlogDetails />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
