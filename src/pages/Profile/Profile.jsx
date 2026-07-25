import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../lib/supabase";

import "./Profile.css";

export default function Profile() {

  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {

    if (user) {

      loadProfile();

    }

  }, [user]);

  const loadProfile = async () => {

    const { data } = await supabase

      .from("profiles")

      .select("*")

      .eq("id", user.id)

      .single();

    if (data) {

      setProfile(data);

    }

  };

  const saveProfile = async () => {

    setLoading(true);

    const { error } = await supabase

      .from("profiles")

      .update({

        full_name: profile.full_name,

        phone: profile.phone,

        address: profile.address,

      })

      .eq("id", user.id);

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Profile Updated Successfully");

  };

  return (

    <section className="profile-page">

      <div className="profile-card">

        <h1>

          My Account

        </h1>

        <label>

          Full Name

        </label>

        <input

          value={profile.full_name}

          onChange={(e)=>

            setProfile({

              ...profile,

              full_name:e.target.value,

            })

          }

        />

        <label>

          Email

        </label>

        <input

          value={user?.email || ""}

          readOnly

        />

        <label>

          Phone

        </label>

        <input

          value={profile.phone}

          onChange={(e)=>

            setProfile({

              ...profile,

              phone:e.target.value,

            })

          }

        />

        <label>

          Address

        </label>

        <textarea

          rows="5"

          value={profile.address}

          onChange={(e)=>

            setProfile({

              ...profile,

              address:e.target.value,

            })

          }

        />

        <button

          onClick={saveProfile}

        >

          {

            loading

            ?

            "Saving..."

            :

            "Save Changes"

          }

        </button>
<div className="profile-actions">

  <Link
    to="/my-orders"
    className="profile-link"
  >
    📦 My Orders
  </Link>

</div>
        <button

          className="logout"

          onClick={logout}

        >

          Logout

        </button>

      </div>

    </section>

  );

}