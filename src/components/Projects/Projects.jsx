import "./Projects.css";

import railing from "../../assets/images/projects/SS-Railing-1.jpg";
import windows from "../../assets/images/projects/Aluminium Windows.jpg";
import fence from "../../assets/images/projects/eletric fence.jpg";
import gate from "../../assets/images/projects/Steel Gates.jpg";
const projects = [
  {
    image: railing,
    title: "Stainless Steel Railings",
  },
  {
    image: windows,
    title: "Aluminium Windows",
  },
  {
    image: fence,
    title: "Electric Fence",
  },
  {
    image: gate,
    title: "Steel Gates",
  },
];
export default function Projects() {
  return (
    <section className="projects">

      <span className="section-tag">
        FEATURED PROJECTS
      </span>

      <h2>
        Engineering Solutions
        <br />
        Built With Precision
      </h2>

      <div className="projects-grid">

        {projects.map((project,index)=>(

          <div
            className="project-card"
            key={index}
          >

            <img
              src={project.image}
              alt={project.title}
            />

            <div className="overlay">

              <h3>{project.title}</h3>

              <button>
                View Service
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}