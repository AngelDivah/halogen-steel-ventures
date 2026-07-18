import "./WhyChoose.css";
import {
  FaCheckCircle,
  FaAward,
  FaClock,
  FaHandshake
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaAward />,
    title: "Premium Quality",
    text: "We use only high-quality stainless steel and aluminium materials."
  },
  {
    icon: <FaClock />,
    title: "On-Time Delivery",
    text: "Projects are completed professionally and delivered on schedule."
  },
  {
    icon: <FaCheckCircle />,
    title: "Guaranteed Workmanship",
    text: "Every installation is completed with precision and attention to detail."
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Service",
    text: "Our reputation is built on honesty, professionalism and satisfied clients."
  }
];

export default function WhyChoose() {
  return (
    <section className="why">

      <div className="why-left">

        <span className="section-tag">
          WHY CHOOSE US
        </span>

        <h2>
          Engineering Excellence
          <br />
          You Can Trust.
        </h2>

        <p>
          We don't just fabricate steel.
          We create durable structures that combine
          strength, beauty and long-term value.
        </p>

      </div>

      <div className="why-right">

        {reasons.map((item,index)=>(

          <div className="why-card" key={index}>

            <div className="why-icon">
              {item.icon}
            </div>

            <div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}