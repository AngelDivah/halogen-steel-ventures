import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";

export default function Settings() {

  const [settings, setSettings] = useState({
    bank_name: "",
    account_name: "",
    account_number: "",
    whatsapp: "",
    company_email: "",
  });

  useEffect(() => {

    loadSettings();

  }, []);

  const loadSettings = async () => {

    const { data } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (data) {

      setSettings(data);

    }

  };

  const handleChange = (e) => {

    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });

  };

  const saveSettings = async () => {

    const { error } = await supabase
      .from("settings")
      .update({

        bank_name: settings.bank_name,

        account_name: settings.account_name,

        account_number: settings.account_number,

        whatsapp: settings.whatsapp,

        company_email: settings.company_email,

      })
      .eq("id", 1);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Settings Updated Successfully");

  };

  return (

    <Layout>

      <div
        style={{
          maxWidth: "650px",
          margin: "40px auto",
        }}
      >

        <h1>Business Settings</h1>

        <input
          name="bank_name"
          placeholder="Bank Name"
          value={settings.bank_name || ""}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="account_name"
          placeholder="Account Name"
          value={settings.account_name || ""}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="account_number"
          placeholder="Account Number"
          value={settings.account_number || ""}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="whatsapp"
          placeholder="WhatsApp Number"
          value={settings.whatsapp || ""}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="company_email"
          placeholder="Company Email"
          value={settings.company_email || ""}
          onChange={handleChange}
        />

        <br /><br />

        <button onClick={saveSettings}>

          Save Settings

        </button>

      </div>

    </Layout>

  );

}