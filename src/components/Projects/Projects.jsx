
import { Link } from "react-router-dom";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Stainless Steel Railing",
    category: "Stainless Steel",
    image: "/projects/project-1.jpg",
  },
  {
    id: 2,
    title: "Modern Steel Gate",
    category: "Gates & Doors",
    image: "/projects/project-2.jpg",
  },
  {
    id: 3,
    title: "Commercial Aluminium Windows",
    category: "Aluminium",
    image: "/projects/project-3.jpg",
  },
];

export default function Projects() {
  return (
    <section className="projects">

      <div className="projects-heading">

        <div>
          <span>OUR RECENT WORK</span>

          <h2>
            Projects We Are
            <br />
            Proud Of
          </h2>
        </div>

        <p>
          Take a look at some of the steel, stainless steel and
          aluminium projects completed by Halogen Steel Ventures.
        </p>

      </div>

      <div className="projects-grid">

        {projects.map((project) => (

          <article
            className="project-card"
            key={project.id}
          >

            <div className="project-image">

              <img
                src={project.image}
                alt={project.title}
              />

              <div className="project-overlay">

                <span>{project.category}</span>

                <h3>{project.title}</h3>

                <Link
                  to="/projects"
                  className="project-view-btn"
                >
                  View Projects →
                </Link>

              </div>

            </div>

          </article>

        ))}

      </div>

      <div className="projects-action">

        <Link
          to="/projects"
          className="all-projects-btn"
        >
          View All Completed Projects
        </Link>

      </div>

    </section>
  );
}