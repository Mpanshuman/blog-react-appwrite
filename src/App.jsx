import { useEffect, useState } from "react";
import "./App.css";
// import conf from "./conf/conf";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import { Outlet } from "react-router";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
        setLoading(false);
      })
      .catch((error) =>
        console.log("Appwrite service :: getCurrentUser :: Mainerror:", error)
      )
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <>
      <div className=" min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className=" w-full block">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
}

export default App;
