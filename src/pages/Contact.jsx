import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-page">

      <div className="contact-header">
        <span>GET IN TOUCH</span>
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you.
          Visit any of our offices or reach us on WhatsApp.
        </p>
      </div>

      <section className="office-locations">

        <div className="section-title">
          <span>VISIT US</span>
          <h2>Our Office Locations</h2>
        </div>

        <div className="office-grid">

          <div className="office-card">

            <h3>Office 1</h3>

            <p>
              Beside IDC Primary School
              <br />
              Along Ojo Ekun Road
              <br />
              Odo Ona
              <br />
              Orita Challenge
              <br />
              Ibadan
              <br />
              Oyo State
            </p>

            <a
              href="https://www.google.com/maps/search/Beside+IDC+Primary+School,+Ojo+Ekun+Road,+Odo+Ona,+Ibadan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>

          </div>

          <div className="office-card">

            <h3>Office 2</h3>

            <p>
              Opposite Princeway Diagnostics Centre
              <br />
              Akala Express
              <br />
              Ibadan
              <br />
              Oyo State
            </p>

            <a
              href="https://www.google.com/maps/search/Princeway+Diagnostics+Centre,+Akala+Express,+Ibadan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>

          </div>

        </div>

        <div className="office-map">

          <iframe
            title="Halogen Office Location"
            src="https://www.google.com/maps?q=Odo+Ona,+Ibadan,+Nigeria&output=embed"
            loading="lazy"
            allowFullScreen
            style={{
              width: "100%",
              height: "450px",
              border: "0",
              borderRadius: "15px",
            }}
          />

        </div>

      </section>

    </section>
  );
}