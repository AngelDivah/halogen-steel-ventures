import "./WhyChoose.css";
import {
  FaAward,
  FaTools,
  FaTruckMoving,
  FaUserShield,
  FaHammer,
  FaClock,
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaAward />,
    title: "Premium Quality",
    text: "We use only high-quality stainless steel and aluminium materials."
  },
  {
    icon: <FaHammer />,
    title: "Expert Fabrication",
    text: "Every project is fabricated with precision and excellent workmanship."
  },
  {
    icon: <FaTools />,
    title: "Professional Installation",
    text: "Our experienced team ensures every installation is completed perfectly."
  },
  {
    icon: <FaTruckMoving />,
    title: "Fast Delivery",
    text: "We deliver projects within agreed timelines without compromising quality."
  },
  {
    icon: <FaUserShield />,
    title: "Trusted Service",
    text: "Hundreds of satisfied residential and commercial clients trust our work."
  },
  {
    icon: <FaClock />,
    title: "Reliable Support",
    text: "We remain available for maintenance and after-sales support."
  }
];

export default function WhyChoose() {
  return (
    <section className="why">

      <div className="why-heading">

        <span>WHY CHOOSE US</span>

        <h2>Why Customers Trust Halogen</h2>

      </div>

      <div className="why-grid">

        {reasons.map((item,index)=>(

          <div className="why-card" key={index}>

            <div className="why-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}