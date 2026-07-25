import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../lib/supabase";
import "./Auth.css";
export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async (e) => {

    e.preventDefault();

    setLoading(true);

    const { data, error } =
      await supabase.auth.signInWithPassword({

        email,

        password,

      });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    if (data.user) {

      navigate("/");

    }

  };

  return (

    <div className="auth-page">

      <form onSubmit={login}>

        <h1>Welcome Back</h1>

        <p>

          Login to continue

        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button disabled={loading}>

          {loading ? "Signing In..." : "Login"}

        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >

          Don't have an account?

          {" "}

          <Link to="/register">

            Register

          </Link>

        </p>

      </form>

    </div>

  );

}