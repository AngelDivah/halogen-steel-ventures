import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import "./Auth.css";
export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const register = async (e) => {

    e.preventDefault();

    const { data, error } =
      await supabase.auth.signUp({

        email: form.email,

        password: form.password,

      });

    if (error) {

      alert(error.message);

      return;

    }

    if (data.user) {

      await supabase

        .from("profiles")

        .insert({

          id: data.user.id,

          full_name: form.full_name,

          phone: form.phone,

          address: form.address,

        });

    }

    alert("Registration Successful");

    navigate("/login");

  };

  return (

    <div className="auth-page">

      <form onSubmit={register}>

        <h1>Create Account</h1>

        <input
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>

          Register

        </button>

      </form>

    </div>

  );

}