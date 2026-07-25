import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";
import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail]=useState("");

  const [password,setPassword]=useState("");

  const login=async(e)=>{

    e.preventDefault();

    const {error}=await supabase.auth.signInWithPassword({

      email,
      password,

    });

    if(error){

      alert(error.message);

      return;

    }

    navigate("/admin");

  };

  return(

    <div className="login-page">

      <form
        className="login-card"
        onSubmit={login}
      >

        <div className="logo">

          🛡️

        </div>

        <div className="admin-title">

          <h1>Halogen Admin</h1>

          <p>

            Sign in to continue

          </p>

        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">

          Login

        </button>

      </form>

    </div>

  );

}