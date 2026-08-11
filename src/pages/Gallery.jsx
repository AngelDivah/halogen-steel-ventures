
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaTimes,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa";

import supabase from "../lib/supabase";
import "./Gallery.css";

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] =
    useState(false);
  const [commentSubmitting, setCommentSubmitting] =
    useState(false);

  const [commentForm, setCommentForm] = useState({
    name: "",
    comment: "",
  });

  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD PROJECTS
  // ==========================================

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);

      const {
        data: projectData,
        error: projectError,
      } = await supabase
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
        setProjects([]);
        return;
      }

      const projectIds = projectData.map(
        (project) => project.id
      );

      const {
        data: imageData,
        error: imageError,
      } = await supabase
        .from("project-images")
        .select("*")
        .in("project_id", projectIds)
        .order("display_order", {
          ascending: true,
        });

      if (imageError) {
        throw imageError;
      }

      const projectsWithImages =
        projectData
          .map((project) => {
            const images =
              (imageData || []).filter(
                (image) =>
                  image.project_id ===
                  project.id
              );

            return {
              ...project,
              images,
            };
          })
          .filter(
            (project) =>
              project.images.length > 0
          );

      setProjects(projectsWithImages);
    } catch (error) {
      console.error(
        "Gallery loading error:",
        error
      );

      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // OPEN PROJECT
  // ==========================================

  async function openProject(project) {
    setSelectedProject(project);

    setCommentForm({
      name: "",
      comment: "",
    });

    await loadComments(project.id);
  }

  // ==========================================
  // CLOSE PROJECT
  // ==========================================

  function closeProject() {
    setSelectedProject(null);
    setComments([]);
    setCommentForm({
      name: "",
      comment: "",
    });
  }

  // ==========================================
  // LOAD COMMENTS
  // ==========================================

  async function loadComments(projectId) {
    try {
      setCommentsLoading(true);

      const {
        data,
        error,
      } = await supabase
        .from("project_comments")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setComments(data || []);
    } catch (error) {
      console.error(
        "Comment loading error:",
        error
      );

      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  }

  // ==========================================
  // COMMENT FORM
  // ==========================================

  function handleCommentChange(e) {
    const {
      name,
      value,
    } = e.target;

    setCommentForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // ==========================================
  // SUBMIT COMMENT
  // ==========================================

  async function submitComment(e) {
    e.preventDefault();

    if (
      !selectedProject ||
      commentSubmitting
    ) {
      return;
    }

    const name =
      commentForm.name.trim();

    const comment =
      commentForm.comment.trim();

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!comment) {
      alert("Please enter a comment.");
      return;
    }

    if (comment.length < 3) {
      alert(
        "Your comment is too short."
      );
      return;
    }

    try {
      setCommentSubmitting(true);

      const {
        data,
        error,
      } = await supabase
        .from("project_comments")
        .insert({
          project_id:
            selectedProject.id,
          name,
          comment,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setComments((previous) => [
          data,
          ...previous,
        ]);
      }

      setCommentForm({
        name: "",
        comment: "",
      });
    } catch (error) {
      console.error(
        "Comment submission error:",
        error
      );

      alert(
        error.message ||
          "Unable to submit your comment."
      );
    } finally {
      setCommentSubmitting(false);
    }
  }

  // ==========================================
  // FORMAT COMMENT DATE
  // ==========================================

  function formatCommentDate(date) {
    if (!date) {
      return "";
    }

    return new Date(
      date
    ).toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="gallery-page">
        <div className="gallery-container">

          <div className="gallery-heading">
            <span>
              OUR COMPLETED WORK
            </span>

            <h1>
              Project Gallery
            </h1>

            <p>
              Loading completed
              projects...
            </p>
          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <>
      <section className="gallery-page">

        <div className="gallery-container">

          {/* HEADER */}

          <div className="gallery-heading">

            <span>
              OUR COMPLETED WORK
            </span>

            <h1>
              Projects We Are
              <br />
              Proud Of
            </h1>

            <p>
              Explore completed steel,
              stainless steel and
              aluminium projects by
              Halogen Steel Ventures.
            </p>

          </div>

          {/* PROJECTS */}

          {projects.length === 0 ? (

            <div className="gallery-empty">

              <h2>
                No completed projects yet.
              </h2>

              <p>
                Completed projects added
                from the admin panel will
                appear here.
              </p>

            </div>

          ) : (

            <div className="gallery-grid">

              {projects.map(
                (project) => {

                  const coverImage =
                    project.images[0]
                      ?.image_url;

                  return (
                    <article
                      className="gallery-project-card"
                      key={project.id}
                      onClick={() =>
                        openProject(
                          project
                        )
                      }
                    >

                      <div className="gallery-project-image">

                        <img
                          src={coverImage}
                          alt={
                            project.title
                          }
                          loading="lazy"
                        />

                        <div className="gallery-project-overlay">

                          <span>
                            {project.category ||
                              "COMPLETED PROJECT"}
                          </span>

                          <h2>
                            {project.title}
                          </h2>

                          <button
                            type="button"
                            className="gallery-view-btn"
                          >
                            View Project
                            <FaArrowRight />
                          </button>

                        </div>

                      </div>

                      <div className="gallery-project-info">

                        <span>
                          {project.images.length}{" "}
                          {project.images
                            .length === 1
                            ? "photo"
                            : "photos"}
                        </span>

                        <h3>
                          {project.title}
                        </h3>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          )}

        </div>

      </section>

      {/* ==========================================
          PROJECT MODAL
      ========================================== */}

      {selectedProject && (

        <div
          className="gallery-modal"
          onClick={closeProject}
        >

          <div
            className="gallery-modal-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              className="gallery-modal-close"
              onClick={closeProject}
              aria-label="Close project"
            >
              <FaTimes />
            </button>

            {/* PROJECT HEADER */}

            <div className="gallery-modal-header">

              <span>
                COMPLETED PROJECT
              </span>

              <h2>
                {selectedProject.title}
              </h2>

              {selectedProject.description && (
                <p>
                  {
                    selectedProject.description
                  }
                </p>
              )}

            </div>

            {/* PROJECT IMAGES */}

            <div className="gallery-modal-grid">

              {selectedProject.images.map(
                (image) => (

                  <div
                    className="gallery-modal-image"
                    key={image.id}
                  >

                    <img
                      src={image.image_url}
                      alt={
                        selectedProject.title
                      }
                      loading="lazy"
                    />

                  </div>

                )
              )}

            </div>

            {/* ======================================
                COMMENTS
            ====================================== */}

            <section className="project-comments">

              <div className="comments-heading">

                <span>
                  PROJECT FEEDBACK
                </span>

                <h3>
                  What do you think
                  about this work?
                </h3>

                <p>
                  Leave a comment about
                  this completed project.
                </p>

              </div>

              {/* COMMENT FORM */}

              <form
                className="comment-form"
                onSubmit={
                  submitComment
                }
              >

                <div className="comment-form-row">

                  <div className="comment-form-group">

                    <label htmlFor="comment-name">
                      Your Name
                    </label>

                    <input
                      id="comment-name"
                      type="text"
                      name="name"
                      value={
                        commentForm.name
                      }
                      onChange={
                        handleCommentChange
                      }
                      placeholder="Enter your name"
                      maxLength="100"
                      required
                    />

                  </div>

                </div>

                <div className="comment-form-group">

                  <label htmlFor="project-comment">
                    Your Comment
                  </label>

                  <textarea
                    id="project-comment"
                    name="comment"
                    value={
                      commentForm.comment
                    }
                    onChange={
                      handleCommentChange
                    }
                    placeholder="Tell us what you think about this project..."
                    rows="5"
                    maxLength="1000"
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="comment-submit-btn"
                  disabled={
                    commentSubmitting
                  }
                >

                  <FaPaperPlane />

                  {commentSubmitting
                    ? "Posting..."
                    : "Post Comment"}

                </button>

              </form>

              {/* EXISTING COMMENTS */}

              <div className="comments-list">

                <div className="comments-list-header">

                  <h3>
                    Comments
                  </h3>

                  <span>
                    {comments.length}
                  </span>

                </div>

                {commentsLoading ? (

                  <div className="comments-loading">
                    Loading comments...
                  </div>

                ) : comments.length === 0 ? (

                  <div className="comments-empty">

                    <FaUser />

                    <p>
                      No comments yet.
                      Be the first to
                      share your thoughts
                      about this project.
                    </p>

                  </div>

                ) : (

                  <div className="comments-items">

                    {comments.map(
                      (item) => (

                        <article
                          className="comment-item"
                          key={item.id}
                        >

                          <div className="comment-avatar">
                            {item.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="comment-body">

                            <div className="comment-meta">

                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                {formatCommentDate(
                                  item.created_at
                                )}
                              </span>

                            </div>

                            <p>
                              {
                                item.comment
                              }
                            </p>

                          </div>

                        </article>

                      )
                    )}

                  </div>

                )}

              </div>

            </section>

            {/* PROJECT DETAILS */}

            <div className="gallery-modal-footer">

              <Link
                to={`/projects/${selectedProject.id}`}
                className="gallery-details-btn"
              >
                View Project Details
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </div>

      )}

    </>
  );
}
