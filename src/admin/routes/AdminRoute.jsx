import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../../lib/supabase";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("admins")
      .select("email")
      .eq("email", user.email)
      .maybeSingle();

    if (error || !data) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2 style={{ padding: "50px" }}>Checking Access...</h2>;
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}