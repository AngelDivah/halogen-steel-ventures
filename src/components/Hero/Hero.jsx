import "./Hero.css";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChevronDown,
  FaPlay,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD PROJECTS + ALL MEDIA
  // ==========================================

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);

    try {
      // ----------------------------------------
      // LOAD PUBLISHED PROJECTS
      // ----------------------------------------

      const { data: projectData, error: projectError } =
        await supabase
          .from("projects")
          .select("*")
          .eq("published", true)
          .order("display_order", {
            ascending: true,
          })
          .order("created_at", {
            ascending: false,
          });

      if (projectError) {
        throw projectError;
      }

      if (!projectData || projectData.length === 0) {
        setSlides([]);
        setLoading(false);
        return;
      }

      const projectIds = projectData.map(
        (project) => project.id
      );

      // ----------------------------------------
      // LOAD ALL PROJECT IMAGES + VIDEOS
      // ----------------------------------------

      const [
        imagesResult,
        videosResult,
      ] = await Promise.all([
        supabase
          .from("project-images")
          .select("*")
          .in("project_id", projectIds)
          .order("display_order", {
            ascending: true,
          }),

        supabase
          .from("project-videos")
          .select("*")
          .in("project_id", projectIds)
          .order("display_order", {
            ascending: true,
          }),
      ]);

      if (imagesResult.error) {
        throw imagesResult.error;
      }

      if (videosResult.error) {
        throw videosResult.error;
      }

      const images = imagesResult.data || [];
      const videos = videosResult.data || [];

      // ========================================
      // BUILD HERO SLIDES
      //
      // Every image becomes a slide.
      // Every video becomes a slide.
      //
      // Example:
      //
      // Project A
      //   image 1
      //   image 2
      //   image 3
      //   video 1
      //
      // Project B
      //   image 1
      //   image 2
      //
      // The Hero will show:
      //
      // A image 1
      // A image 2
      // A image 3
      // A video 1
      // B image 1
      // B image 2
      // ========================================

      const newSlides = [];

      projectData.forEach((project) => {
        const projectImages = images
          .filter(
            (image) =>
              image.project_id === project.id
          )
          .sort(
            (a, b) =>
              Number(a.display_order || 0) -
              Number(b.display_order || 0)
          );

        const projectVideos = videos
          .filter(
            (video) =>
              video.project_id === project.id
          )
          .sort(
            (a, b) =>
              Number(a.display_order || 0) -
              Number(b.display_order || 0)
          );

        // --------------------------------------
        // ADD ALL IMAGES
        // --------------------------------------

        projectImages.forEach((image) => {
          if (!image.image_url) {
            return;
          }

          newSlides.push({
            id: `image-${image.id}`,

            projectId: project.id,

            type: "image",

            mediaUrl: image.image_url,

            title:
              project.title ||
              "Premium Steel Solutions",

            description:
              project.description ||
              "Professional steel fabrication and aluminium solutions delivered with quality craftsmanship and attention to detail.",

            category:
              project.category ||
              "HALOGEN STEEL VENTURES",

            displayDuration:
              Number(
                project.display_duration
              ) > 0
                ? Number(
                    project.display_duration
                  )
                : 7000,
          });
        });

        // --------------------------------------
        // ADD ALL VIDEOS
        // --------------------------------------

        projectVideos.forEach((video) => {
          if (!video.video_url) {
            return;
          }

          newSlides.push({
            id: `video-${video.id}`,

            projectId: project.id,

            type: "video",

            mediaUrl: video.video_url,

            title:
              project.title ||
              "Premium Steel Solutions",

            description:
              project.description ||
              "Professional steel fabrication and aluminium solutions delivered with quality craftsmanship and attention to detail.",

            category:
              project.category ||
              "HALOGEN STEEL VENTURES",

            displayDuration:
              Number(
                project.display_duration
              ) > 0
                ? Number(
                    project.display_duration
                  )
                : 7000,
          });
        });
      });

      setSlides(newSlides);
      setCurrent(0);
    } catch (error) {
      console.error(
        "Error loading hero media:",
        error
      );

      // If anything goes wrong, use the
      // normal Hero instead of breaking it.
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // AUTOMATIC SLIDE
  // ==========================================

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const slide = slides[current];

    // Admin stores:
    // 5000 = 5 seconds
    //
    // Therefore we DO NOT multiply by 1000.

    const duration =
      Number(slide?.displayDuration) > 0
        ? Number(slide.displayDuration)
        : 7000;

    // Videos advance themselves when they finish.
    if (slide?.type === "video") {
      return;
    }

    const timer = setTimeout(() => {
      setCurrent(
        (previous) =>
          (previous + 1) % slides.length
      );
    }, duration);

    return () => clearTimeout(timer);
  }, [slides, current]);

  // ==========================================
  // RESET CURRENT SLIDE
  // ==========================================

  useEffect(() => {
    if (
      slides.length > 0 &&
      current >= slides.length
    ) {
      setCurrent(0);
    }
  }, [slides, current]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="hero hero-loading">
        <div className="hero-content">
          <span className="hero-tag">
            HALOGEN STEEL VENTURES
          </span>

          <h1>
            Premium Steel &
            <br />
            Aluminium Solutions.
          </h1>

          <p>
            Professional steel fabrication,
            stainless steel and aluminium
            solutions built with quality
            craftsmanship.
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // NO MEDIA
  //
  // YOUR NORMAL HERO REMAINS.
  // ==========================================

  if (slides.length === 0) {
    return (
      <section className="hero hero-empty">
        <div className="hero-content">
          <span className="hero-tag">
            STAINLESS STEEL • ENGINEERING EXCELLENCE
          </span>

          <h1>
            Premium Stainless Steel
            <br />
            Solutions Built To Last.
          </h1>

          <p>
            Halogen Stainless & Steel Ventures
            delivers premium stainless steel
            railings, electric fencing, modern
            gates, carports, cubicles and custom
            fabrication.
          </p>

          <div className="hero-buttons">
            <Link
              to="/contact"
              className="hero-btn-primary"
            >
              Get Free Quote
              <FaArrowRight />
            </Link>

            <Link
              to="/products"
              className="hero-btn-secondary"
            >
              Browse Products
            </Link>
          </div>
        </div>

        <div className="scroll-indicator">
          <FaChevronDown />
        </div>
      </section>
    );
  }

  // ==========================================
  // CURRENT SLIDE
  // ==========================================

  const slide = slides[current];

  const isImage =
    slide.type === "image";

  const isVideo =
    slide.type === "video";

  // ==========================================
  // RENDER PROJECT MEDIA
  // ==========================================

  return (
    <section className="hero hero-project">

      {/* ======================================
          IMAGE
      ====================================== */}

      {isImage && (
        <div
          className="hero-background"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(8,22,40,.68),
                rgba(8,22,40,.78)
              ),
              url("${slide.mediaUrl}")
            `,
          }}
        />
      )}

      {/* ======================================
          VIDEO
      ====================================== */}

      {isVideo && (
        <video
          key={slide.mediaUrl}
          className="hero-video"
          src={slide.mediaUrl}
          autoPlay
          muted
          playsInline
          onEnded={() => {
            setCurrent(
              (previous) =>
                (previous + 1) %
                slides.length
            );
          }}
        />
      )}

      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="hero-content">

        <span className="hero-tag">
          {slide.category}
        </span>

        <h1>
          {slide.title}
        </h1>

        <p>
          {slide.description}
        </p>

        <div className="hero-buttons">

          <Link
            to={`/projects/${slide.projectId}`}
            className="hero-btn-primary"
          >
            View Project
            <FaArrowRight />
          </Link>

          <Link
            to="/contact"
            className="hero-btn-secondary"
          >
            Get Free Quote
          </Link>

        </div>

        {/* ====================================
            SLIDE INDICATORS
        ==================================== */}

        {slides.length > 1 && (
          <div className="hero-project-indicators">

            {slides.map(
              (item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    index === current
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrent(index)
                  }
                  aria-label={`View slide ${
                    index + 1
                  }`}
                />
              )
            )}

          </div>
        )}

      </div>

      {/* ======================================
          PROJECT LABEL
      ====================================== */}

      <div className="hero-project-label">

        <span>
          PROJECT {current + 1} /{" "}
          {slides.length}
        </span>

        {isVideo && (
          <span className="video-indicator">
            <FaPlay />
            VIDEO
          </span>
        )}

      </div>

      {/* ======================================
          SCROLL
      ====================================== */}

      <div className="scroll-indicator">
        <FaChevronDown />
      </div>

    </section>
  );
}

