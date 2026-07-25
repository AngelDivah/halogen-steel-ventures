import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function ProtectedRoute({ children }) {

  const [session,setSession]=useState(undefined);

  useEffect(()=>{

    supabase.auth.getSession().then(({data})=>{

      setSession(data.session);

    });

  },[]);

  if(session===undefined){

    return <h2>Loading...</h2>;

  }

  if(!session){

    return <Navigate to="/admin/login" replace/>;

  }

  return children;

}