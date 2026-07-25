import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_, session) => {

        setUser(session?.user ?? null);

      }
    );

    return () => subscription.unsubscribe();

  }, []);

  const getSession = async () => {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user ?? null);

  };

  const logout = async () => {

    await supabase.auth.signOut();

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export const useAuth = () =>
  useContext(AuthContext);