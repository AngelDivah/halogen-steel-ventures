import "./ProductSlider.css";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import ProductCard from "../ProductCard/ProductCard";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductSlider({ products }) {

  const [index, setIndex] = useState(0);

  const nextProduct = () => {

    setIndex((prev) =>
      prev === products.length - 1
        ? 0
        : prev + 1
    );

  };

  const previousProduct = () => {

    setIndex((prev) =>
      prev === 0
        ? products.length - 1
        : prev - 1
    );

  };

  return (

    <div className="product-slider">

      <button
        className="slider-btn"
        onClick={previousProduct}
      >

        <FaChevronLeft />

      </button>

      <AnimatePresence mode="wait">

        <motion.div

          key={products[index].id}

          initial={{
            opacity:0,
            x:120
          }}

          animate={{
            opacity:1,
            x:0
          }}

          exit={{
            opacity:0,
            x:-120
          }}

          transition={{
            duration:.45
          }}

        >

          <ProductCard
            product={products[index]}
          />

        </motion.div>

      </AnimatePresence>

      <button
        className="slider-btn"
        onClick={nextProduct}
      >

        <FaChevronRight />

      </button>

    </div>

  );

}