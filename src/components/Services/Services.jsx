import "./Services.css";
import {
  FaWarehouse,
  FaDoorOpen,
  FaShieldAlt,
  FaBorderAll,
  FaTools,
  FaHome,
} from "react-icons/fa";

const services = [
  {
    icon: <FaShieldAlt />,
    title: "Stainless Steel Railings",
    text: "Modern and durable railings for homes, offices and commercial buildings."
  },
  {
    icon: <FaWarehouse />,
    title: "Carports",
    text: "Strong steel carports designed for protection and long-lasting durability."
  },
  {
    icon: <FaDoorOpen />,
    title: "Gates & Doors",
    text: "Custom stainless and steel gates with premium finishing."
  },
  {
    icon: <FaBorderAll />,
    title: "Cubicles",
    text: "Elegant bathroom and office cubicle installations."
  },
  {
    icon: <FaHome />,
    title: "Aluminium Windows",
    text: "Beautiful aluminium windows built for modern architecture."
  },
  {
    icon: <FaTools />,
    title: "General Steel Fabrication",
    text: "Professional engineering and fabrication tailored to every project."
  }
];

export default function Services() {
  return (
    <section className="services">

      <span className="section-tag">
        OUR SERVICES
      </span>

      <h2>
        Professional Steel &
        Aluminium Solutions
      </h2>

      <div className="services-grid">

        {services.map((service, index) => (

          <div className="service-card" key={index}>

            <div className="service-icon">
              {service.icon}
            </div>

            <h3>{service.title}</h3>

            <p>{service.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}