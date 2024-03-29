import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, toggleLoading } from "./app/features/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        dispatch(getUser(user.email))
      }else{
        dispatch(toggleLoading())
      }
    })
  },[dispatch])
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster/>
    </>
  );
}

export default App;
