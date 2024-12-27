import { signOut } from "firebase/auth";
import { loginFailed, logoutUser, setLoading } from "../../../redux/reducers/userSlice";
import store from "../../../redux/store";
import { auth } from "../../../firebase";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { Navigate, useNavigate } from "react-router-dom";

export const customSignOut = async () => {
    try{
        store.dispatch(setLoading(true));
        await signOut(auth);
        await axios.post(BASE_URL  + '/api/v1/auth/logout' , {} , {withCredentials:true});
        await store.dispatch(logoutUser());
    }catch(e){
        console.log(e);
    }finally{
        store.dispatch(setLoading(false));
    }
}