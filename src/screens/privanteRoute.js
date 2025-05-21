 import { Outlet, Navigate } from 'react-router-dom'

 export default function PrivanteRoute() {

     let token =  localStorage.getItem("userInfo") == null ? false : true;
    return (
        <>
            {token ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )

}
