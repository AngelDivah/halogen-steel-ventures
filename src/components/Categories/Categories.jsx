import "./Categories.css";

import gates from "../../assets/images/projects/Steel Gates.jpg";
import windows from "../../assets/images/projects/Aluminium Windows.jpg";
import fence from "../../assets/images/projects/eletric fence.jpg";
import railing from "../../assets/images/projects/SS-Railing-1.jpg";

const categories = [
  {
    title: "Steel Gates",
    image: gates,
  },
  {
    title: "Aluminium Windows",
    image: windows,
  },
  {
    title: "Electric Fence",
    image: fence,
  },
  {
    title: "Stainless Railings",
    image: railing,
  },
];

export default function Categories() {
  return (
    <section className="categories">

      <div className="section-title">

        <span>SHOP BY CATEGORY</span>

        <h2>
          Discover Our Premium Products
        </h2>

        <p>
          Explore our range of high-quality stainless steel and aluminium
          products crafted for homes, businesses and industrial projects.
        </p>

      </div>

      <div className="category-grid">

        {categories.map((item, index) => (

          <div className="category-card" key={index}>

            <img src={item.image} alt={item.title} />

            <div className="category-overlay">

              <h3>{item.title}</h3>

              <button>View Products</button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}