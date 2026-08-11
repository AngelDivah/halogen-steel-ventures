import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaProjectDiagram,
  FaImage,
  FaVideo,
  FaUpload,
  FaTimes,
} from "react-icons/fa";

import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";

import "./Projects.css";

const EMPTY_FORM = {
  title: "",
  description: "",
  display_duration: 5000,
  display_order: 0,
  published: true,
  featured: false,
};

const IMAGE_BUCKET = "project-images";
const VIDEO_BUCKET = "project-videos";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchProjects();

    return () => {
      cleanupPreviews();
    };
  }, []);

  // =========================================================
  // PREVIEW CLEANUP
  // =========================================================

  function cleanupPreviews() {
    imagePreviews.forEach((preview) => {
      if (preview?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(preview.url);
      }
    });

    videoPreviews.forEach((preview) => {
      if (preview?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(preview.url);
      }
    });
  }

  function clearPreviewUrls() {
    imagePreviews.forEach((preview) => {
      if (preview?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(preview.url);
      }
    });

    videoPreviews.forEach((preview) => {
      if (preview?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(preview.url);
      }
    });
  }

  // =========================================================
  // FETCH PROJECTS
  // =========================================================

  async function fetchProjects() {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setProjects(data || []);
    } catch (error) {
      console.error("Error loading projects:", error);

      alert(
        error.message || "Unable to load projects."
      );

      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // FORM HELPERS
  // =========================================================

  function resetMediaState() {
    clearPreviewUrls();

    setImageFiles([]);
    setVideoFiles([]);

    setImagePreviews([]);
    setVideoPreviews([]);

    setExistingImages([]);
    setExistingVideos([]);
  }

  function resetForm() {
    resetMediaState();

    setForm({
      ...EMPTY_FORM,
    });

    setEditingProject(null);
    setShowForm(false);
  }

  function openAddForm() {
    resetMediaState();

    setForm({
      ...EMPTY_FORM,
    });

    setEditingProject(null);
    setShowForm(true);
  }

  // =========================================================
  // FORM CHANGE
  // =========================================================

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  // =========================================================
  // IMAGE SELECTION
  // =========================================================

  function handleImageChange(e) {
    const files = Array.from(
      e.target.files || []
    );

    e.target.value = "";

    if (!files.length) {
      return;
    }

    const validFiles = files.filter((file) => {
      return (
        file.type.startsWith("image/") ||
        /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(
          file.name
        )
      );
    });

    if (validFiles.length !== files.length) {
      alert(
        "Some files were skipped because they are not valid image files."
      );
    }

    if (!validFiles.length) {
      return;
    }

    const previews = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImageFiles((previous) => [
      ...previous,
      ...validFiles,
    ]);

    setImagePreviews((previous) => [
      ...previous,
      ...previews,
    ]);
  }

  // =========================================================
  // VIDEO SELECTION
  // =========================================================

  function handleVideoChange(e) {
    const files = Array.from(
      e.target.files || []
    );

    e.target.value = "";

    if (!files.length) {
      return;
    }

    const validFiles = files.filter((file) => {
      return (
        file.type.startsWith("video/") ||
        /\.(mp4|webm|mov|m4v)$/i.test(
          file.name
        )
      );
    });

    if (validFiles.length !== files.length) {
      alert(
        "Some files were skipped because they are not valid video files."
      );
    }

    if (!validFiles.length) {
      return;
    }

    const previews = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setVideoFiles((previous) => [
      ...previous,
      ...validFiles,
    ]);

    setVideoPreviews((previous) => [
      ...previous,
      ...previews,
    ]);
  }

  // =========================================================
  // REMOVE NEW IMAGE
  // =========================================================

  function removeSelectedImage(index) {
    const preview = imagePreviews[index];

    if (preview?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(preview.url);
    }

    setImageFiles((previous) =>
      previous.filter(
        (_, fileIndex) =>
          fileIndex !== index
      )
    );

    setImagePreviews((previous) =>
      previous.filter(
        (_, previewIndex) =>
          previewIndex !== index
      )
    );
  }

  // =========================================================
  // REMOVE NEW VIDEO
  // =========================================================

  function removeSelectedVideo(index) {
    const preview = videoPreviews[index];

    if (preview?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(preview.url);
    }

    setVideoFiles((previous) =>
      previous.filter(
        (_, fileIndex) =>
          fileIndex !== index
      )
    );

    setVideoPreviews((previous) =>
      previous.filter(
        (_, previewIndex) =>
          previewIndex !== index
      )
    );
  }

  // =========================================================
  // REMOVE EXISTING MEDIA FROM FORM
  // =========================================================

  function removeExistingImage(id) {
    setExistingImages((previous) =>
      previous.filter(
        (image) => image.id !== id
      )
    );
  }

  function removeExistingVideo(id) {
    setExistingVideos((previous) =>
      previous.filter(
        (video) => video.id !== id
      )
    );
  }

  // =========================================================
  // UPLOAD FILE
  // =========================================================

  async function uploadFile(
    file,
    bucket,
    folder
  ) {
    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "file";

    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    const uniqueName = [
      Date.now(),
      Math.random()
        .toString(36)
        .slice(2, 9),
      baseName,
    ].join("-");

    const filePath =
      `${folder}/${uniqueName}.${extension}`;

    const { error } =
      await supabase.storage
        .from(bucket)
        .upload(
          filePath,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

    if (error) {
      throw error;
    }

    const { data } =
      supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return {
      url: data.publicUrl,
      path: filePath,
    };
  }

  // =========================================================
  // DELETE STORAGE FILE
  // =========================================================

  async function deleteStorageFile(
    url,
    bucket
  ) {
    if (!url) {
      return;
    }

    const marker =
      `/storage/v1/object/public/${bucket}/`;

    if (!url.includes(marker)) {
      console.warn(
        "Could not determine Storage path:",
        url
      );

      return;
    }

    const filePath =
      url.split(marker)[1];

    if (!filePath) {
      return;
    }

    const { error } =
      await supabase.storage
        .from(bucket)
        .remove([filePath]);

    if (error) {
      console.error(
        "Storage deletion error:",
        error
      );

      throw error;
    }
  }

  // =========================================================
  // LOAD PROJECT MEDIA
  // =========================================================

  async function loadProjectMedia(
    projectId
  ) {
    const [
      imagesResult,
      videosResult,
    ] = await Promise.all([
      supabase
        .from("project-images")
        .select("*")
        .eq(
          "project_id",
          projectId
        )
        .order("display_order", {
          ascending: true,
        }),

      supabase
        .from("project-videos")
        .select("*")
        .eq(
          "project_id",
          projectId
        )
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

    setExistingImages(
      imagesResult.data || []
    );

    setExistingVideos(
      videosResult.data || []
    );
  }

  // =========================================================
  // EDIT PROJECT
  // =========================================================

  async function editProject(project) {
    resetMediaState();

    setEditingProject(project);

    setForm({
      title: project.title || "",

      description:
        project.description || "",

      display_duration:
        project.display_duration ??
        5000,

      display_order:
        project.display_order ?? 0,

      published:
        project.published ?? true,

      featured:
        project.featured ?? false,
    });

    setShowForm(true);

    try {
      await loadProjectMedia(project.id);
    } catch (error) {
      console.error(
        "Media loading error:",
        error
      );

      alert(
        error.message ||
          "Unable to load project media."
      );
    }
  }

  // =========================================================
  // DELETE REMOVED EXISTING MEDIA
  // =========================================================

  async function deleteRemovedImages(
    projectId,
    originalImages
  ) {
    const remainingIds =
      new Set(
        existingImages.map(
          (image) => image.id
        )
      );

    const removedImages =
      originalImages.filter(
        (image) =>
          !remainingIds.has(image.id)
      );

    for (const image of removedImages) {
      await deleteStorageFile(
        image.image_url,
        IMAGE_BUCKET
      );

      const { error } =
        await supabase
          .from("project-images")
          .delete()
          .eq(
            "id",
            image.id
          );

      if (error) {
        throw error;
      }
    }
  }

  // =========================================================
  // DELETE REMOVED EXISTING VIDEOS
  // =========================================================

  async function deleteRemovedVideos(
    projectId,
    originalVideos
  ) {
    const remainingIds =
      new Set(
        existingVideos.map(
          (video) => video.id
        )
      );

    const removedVideos =
      originalVideos.filter(
        (video) =>
          !remainingIds.has(video.id)
      );

    for (const video of removedVideos) {
      await deleteStorageFile(
        video.video_url,
        VIDEO_BUCKET
      );

      const { error } =
        await supabase
          .from("project-videos")
          .delete()
          .eq(
            "id",
            video.id
          );

      if (error) {
        throw error;
      }
    }
  }

  // =========================================================
  // UPLOAD PROJECT IMAGES
  // =========================================================

  async function uploadProjectImages(
    projectId,
    startingOrder
  ) {
    for (
      let index = 0;
      index < imageFiles.length;
      index++
    ) {
      const file = imageFiles[index];

      const uploaded =
        await uploadFile(
          file,
          IMAGE_BUCKET,
          `projects/${projectId}`
        );

      const { error } =
        await supabase
          .from("project-images")
          .insert({
            project_id:
              projectId,

            image_url:
              uploaded.url,

            display_order:
              startingOrder + index,
          });

      if (error) {
        throw error;
      }
    }
  }

  // =========================================================
  // UPLOAD PROJECT VIDEOS
  // =========================================================

  async function uploadProjectVideos(
    projectId,
    startingOrder
  ) {
    for (
      let index = 0;
      index < videoFiles.length;
      index++
    ) {
      const file = videoFiles[index];

      const uploaded =
        await uploadFile(
          file,
          VIDEO_BUCKET,
          `projects/${projectId}`
        );

      const { error } =
        await supabase
          .from("project-videos")
          .insert({
            project_id:
              projectId,

            video_url:
              uploaded.url,

            display_order:
              startingOrder + index,
          });

      if (error) {
        throw error;
      }
    }
  }

  // =========================================================
  // SAVE PROJECT
  // =========================================================

  async function saveProject(e) {
    e.preventDefault();

    if (saving) {
      return;
    }

    const title =
      form.title.trim();

    if (!title) {
      alert(
        "Project title is required."
      );

      return;
    }

    if (
      !editingProject &&
      imageFiles.length === 0
    ) {
      alert(
        "Please upload at least one project image."
      );

      return;
    }

    setSaving(true);

    try {
      // -----------------------------------------------------
      // AUTH CHECK
      // -----------------------------------------------------

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession();

      if (!session) {
        throw new Error(
          "Your admin session has expired. Please log in again."
        );
      }

      // -----------------------------------------------------
      // SAVE ORIGINAL MEDIA BEFORE WE CHANGE ANYTHING
      // -----------------------------------------------------

      const originalImages =
        [...existingImages];

      const originalVideos =
        [...existingVideos];

      // -----------------------------------------------------
      // FEATURED / HERO
      // -----------------------------------------------------

      if (form.featured) {
        let query =
          supabase
            .from("projects")
            .update({
              featured: false,
            })
            .eq(
              "featured",
              true
            );

        if (editingProject) {
          query = query.neq(
            "id",
            editingProject.id
          );
        }

        const { error } =
          await query;

        if (error) {
          throw error;
        }
      }

      // -----------------------------------------------------
      // PROJECT DATA
      // -----------------------------------------------------

      const projectData = {
        title,

        description:
          form.description.trim(),

        display_duration:
          Number(
            form.display_duration
          ) || 5000,

        display_order:
          Number(
            form.display_order
          ) || 0,

        published:
          Boolean(form.published),

        featured:
          Boolean(form.featured),
      };

      let projectId;

      // -----------------------------------------------------
      // UPDATE
      // -----------------------------------------------------

      if (editingProject) {
        const { error } =
          await supabase
            .from("projects")
            .update(projectData)
            .eq(
              "id",
              editingProject.id
            );

        if (error) {
          throw error;
        }

        projectId =
          editingProject.id;

        // IMPORTANT:
        // Delete removed media BEFORE adding
        // new media.
        await deleteRemovedImages(
          projectId,
          originalImages
        );

        await deleteRemovedVideos(
          projectId,
          originalVideos
        );
      }

      // -----------------------------------------------------
      // CREATE
      // -----------------------------------------------------

      else {
        const {
          data,
          error,
        } =
          await supabase
            .from("projects")
            .insert(projectData)
            .select()
            .single();

        if (error) {
          throw error;
        }

        projectId = data.id;
      }

      // -----------------------------------------------------
      // UPLOAD NEW IMAGES
      // -----------------------------------------------------

      await uploadProjectImages(
        projectId,
        existingImages.length
      );

      // -----------------------------------------------------
      // UPLOAD NEW VIDEOS
      // -----------------------------------------------------

      await uploadProjectVideos(
        projectId,
        existingVideos.length
      );

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      alert(
        editingProject
          ? "Project updated successfully."
          : "Project added successfully."
      );

      resetForm();

      await fetchProjects();
    } catch (error) {
      console.error(
        "Project save error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while saving the project."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // DELETE PROJECT
  // =========================================================

  async function deleteProject(project) {
    const confirmed =
      window.confirm(
        `Delete "${project.title}" permanently?`
      );

    if (!confirmed) {
      return;
    }

    try {
      // -----------------------------------------------------
      // LOAD MEDIA
      // -----------------------------------------------------

      const [
        imagesResult,
        videosResult,
      ] = await Promise.all([
        supabase
          .from("project-images")
          .select("*")
          .eq(
            "project_id",
            project.id
          ),

        supabase
          .from("project-videos")
          .select("*")
          .eq(
            "project_id",
            project.id
          ),
      ]);

      if (imagesResult.error) {
        throw imagesResult.error;
      }

      if (videosResult.error) {
        throw videosResult.error;
      }

      const images =
        imagesResult.data || [];

      const videos =
        videosResult.data || [];

      // -----------------------------------------------------
      // DELETE STORAGE FILES
      // -----------------------------------------------------

      for (const image of images) {
        await deleteStorageFile(
          image.image_url,
          IMAGE_BUCKET
        );
      }

      for (const video of videos) {
        await deleteStorageFile(
          video.video_url,
          VIDEO_BUCKET
        );
      }

      // -----------------------------------------------------
      // DELETE MEDIA RECORDS
      // -----------------------------------------------------

      const [
        imageDelete,
        videoDelete,
      ] = await Promise.all([
        supabase
          .from("project-images")
          .delete()
          .eq(
            "project_id",
            project.id
          ),

        supabase
          .from("project-videos")
          .delete()
          .eq(
            "project_id",
            project.id
          ),
      ]);

      if (imageDelete.error) {
        throw imageDelete.error;
      }

      if (videoDelete.error) {
        throw videoDelete.error;
      }

      // -----------------------------------------------------
      // DELETE PROJECT
      // -----------------------------------------------------

      const { error } =
        await supabase
          .from("projects")
          .delete()
          .eq(
            "id",
            project.id
          );

      if (error) {
        throw error;
      }

      await fetchProjects();
    } catch (error) {
      console.error(
        "Delete project error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete project."
      );
    }
  }

  // =========================================================
  // TOGGLE PUBLISHED
  // =========================================================

  async function togglePublished(
    project
  ) {
    try {
      const { error } =
        await supabase
          .from("projects")
          .update({
            published:
              !project.published,
          })
          .eq(
            "id",
            project.id
          );

      if (error) {
        throw error;
      }

      await fetchProjects();
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Unable to update project status."
      );
    }
  }

  // =========================================================
  // TOGGLE FEATURED
  // =========================================================

  async function toggleFeatured(
    project
  ) {
    try {
      // -----------------------------------------------------
      // REMOVE HERO
      // -----------------------------------------------------

      if (project.featured) {
        const { error } =
          await supabase
            .from("projects")
            .update({
              featured: false,
            })
            .eq(
              "id",
              project.id
            );

        if (error) {
          throw error;
        }

        await fetchProjects();

        return;
      }

      // -----------------------------------------------------
      // REMOVE HERO FROM EVERY OTHER PROJECT
      // -----------------------------------------------------

      const { error: resetError } =
        await supabase
          .from("projects")
          .update({
            featured: false,
          })
          .eq(
            "featured",
            true
          );

      if (resetError) {
        throw resetError;
      }

      // -----------------------------------------------------
      // MAKE THIS PROJECT HERO
      // -----------------------------------------------------

      const { error } =
        await supabase
          .from("projects")
          .update({
            featured: true,
          })
          .eq(
            "id",
            project.id
          );

      if (error) {
        throw error;
      }

      await fetchProjects();
    } catch (error) {
      console.error(
        "Featured project error:",
        error
      );

      alert(
        error.message ||
          "Unable to update featured project."
      );
    }
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <Layout>
      <div className="admin-projects">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="projects-header">

          <div>
            <span className="projects-label">
              PROJECT MANAGEMENT
            </span>

            <h1>Projects</h1>

            <p>
              Manage completed projects,
              photos and videos displayed
              on the Halogen website.
            </p>
          </div>

          <button
            className="add-project-btn"
            onClick={openAddForm}
            type="button"
          >
            <FaPlus />
            Add Project
          </button>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        {showForm && (
          <div className="project-form-card">

            <div className="form-header">

              <div>
                <h2>
                  {editingProject
                    ? "Edit Project"
                    : "Add New Project"}
                </h2>

                <p>
                  Add as many project
                  photos and videos as
                  you need.
                </p>
              </div>

              <button
                className="close-form-btn"
                onClick={resetForm}
                type="button"
                disabled={saving}
              >
                <FaTimes />
              </button>

            </div>

            <form onSubmit={saveProject}>

              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <div className="form-grid">

                <div className="form-group full-width">

                  <label>
                    Project Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Modern Stainless Steel Gate"
                    required
                  />

                </div>

                <div className="form-group full-width">

                  <label>
                    Project Description
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the completed project..."
                  />

                </div>

              </div>

              {/* =================================================
                  IMAGES
              ================================================= */}

              <div className="upload-section">

                <div className="upload-title">

                  <FaImage />

                  <div>
                    <h3>
                      Project Images
                    </h3>

                    <p>
                      Upload multiple
                      photos of this
                      completed project.
                    </p>
                  </div>

                </div>

                <label className="upload-box">

                  <FaUpload />

                  <strong>
                    Click to upload images
                  </strong>

                  <span>
                    JPG, JPEG, PNG, WEBP,
                    HEIC
                  </span>

                  <input
                    type="file"
                    multiple
                    accept="image/*,.heic,.heif"
                    onChange={handleImageChange}
                  />

                </label>

                {existingImages.length > 0 && (
                  <div className="media-grid">

                    {existingImages.map(
                      (image) => (
                        <div
                          className="media-item"
                          key={image.id}
                        >

                          <img
                            src={image.image_url}
                            alt="Project"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeExistingImage(
                                image.id
                              )
                            }
                            disabled={saving}
                          >
                            <FaTimes />
                          </button>

                        </div>
                      )
                    )}

                  </div>
                )}

                {imagePreviews.length > 0 && (
                  <div className="media-grid">

                    {imagePreviews.map(
                      (image, index) => (
                        <div
                          className="media-item"
                          key={`${image.url}-${index}`}
                        >

                          <img
                            src={image.url}
                            alt="Preview"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeSelectedImage(
                                index
                              )
                            }
                            disabled={saving}
                          >
                            <FaTimes />
                          </button>

                        </div>
                      )
                    )}

                  </div>
                )}

                <div className="upload-count">

                  {existingImages.length +
                    imageFiles.length}{" "}
                  image
                  {existingImages.length +
                    imageFiles.length !==
                  1
                    ? "s"
                    : ""}{" "}
                  selected

                </div>

              </div>

              {/* =================================================
                  VIDEOS
              ================================================= */}

              <div className="upload-section">

                <div className="upload-title">

                  <FaVideo />

                  <div>

                    <h3>
                      Project Videos
                    </h3>

                    <p>
                      Upload multiple
                      videos showing
                      the finished work.
                    </p>

                  </div>

                </div>

                <label className="upload-box">

                  <FaUpload />

                  <strong>
                    Click to upload videos
                  </strong>

                  <span>
                    MP4, WEBM, MOV, M4V
                  </span>

                  <input
                    type="file"
                    multiple
                    accept="video/mp4,video/webm,video/quicktime,.m4v"
                    onChange={handleVideoChange}
                  />

                </label>

                {existingVideos.length > 0 && (
                  <div className="video-grid">

                    {existingVideos.map(
                      (video) => (
                        <div
                          className="video-item"
                          key={video.id}
                        >

                          <video
                            src={video.video_url}
                            controls
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeExistingVideo(
                                video.id
                              )
                            }
                            disabled={saving}
                          >
                            <FaTimes />
                          </button>

                        </div>
                      )
                    )}

                  </div>
                )}

                {videoPreviews.length > 0 && (
                  <div className="video-grid">

                    {videoPreviews.map(
                      (video, index) => (
                        <div
                          className="video-item"
                          key={`${video.url}-${index}`}
                        >

                          <video
                            src={video.url}
                            controls
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeSelectedVideo(
                                index
                              )
                            }
                            disabled={saving}
                          >
                            <FaTimes />
                          </button>

                        </div>
                      )
                    )}

                  </div>
                )}

                <div className="upload-count">

                  {existingVideos.length +
                    videoFiles.length}{" "}
                  video
                  {existingVideos.length +
                    videoFiles.length !==
                  1
                    ? "s"
                    : ""}{" "}
                  selected

                </div>

              </div>

              {/* =================================================
                  SETTINGS
              ================================================= */}

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Display Duration
                  </label>

                  <input
                    type="number"
                    name="display_duration"
                    value={form.display_duration}
                    onChange={handleChange}
                    min="1000"
                    step="500"
                  />

                  <small>
                    Example: 5000 = 5 seconds
                  </small>

                </div>

                <div className="form-group">

                  <label>
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="display_order"
                    value={form.display_order}
                    onChange={handleChange}
                    min="0"
                  />

                  <small>
                    Lower numbers appear first.
                  </small>

                </div>

              </div>

              {/* =================================================
                  OPTIONS
              ================================================= */}

              <div className="project-options">

                <label className="checkbox-label">

                  <input
                    type="checkbox"
                    name="published"
                    checked={form.published}
                    onChange={handleChange}
                  />

                  <span>
                    Published
                  </span>

                </label>

                <label className="checkbox-label">

                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                  />

                  <span>
                    Featured / Hero Project
                  </span>

                </label>

              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-project-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Uploading..."
                    : editingProject
                    ? "Update Project"
                    : "Save Project"}
                </button>

              </div>

            </form>

          </div>
        )}

        {/* =================================================
            PROJECT LIST
        ================================================= */}

        <div className="projects-section">

          <div className="section-heading">

            <div>

              <h2>
                All Projects
              </h2>

              <span>
                {projects.length} project
                {projects.length !== 1
                  ? "s"
                  : ""}
              </span>

            </div>

          </div>

          {loading ? (
            <div className="projects-loading">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (

            <div className="empty-projects">

              <FaProjectDiagram />

              <h3>
                No projects yet
              </h3>

              <p>
                Add your first completed
                project to start building
                your showcase.
              </p>

              <button
                onClick={openAddForm}
                type="button"
              >
                <FaPlus />
                Add First Project
              </button>

            </div>

          ) : (

            <div className="projects-table-wrapper">

              <table className="projects-table">

                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Order</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Hero</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {projects.map(
                    (project) => (
                      <tr
                        key={project.id}
                      >

                        <td>

                          <div className="project-info">

                            <div className="project-no-image">
                              <FaProjectDiagram />
                            </div>

                            <div>

                              <strong>
                                {project.title}
                              </strong>

                              <span>
                                Completed Project
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>
                          {project.display_order}
                        </td>

                        <td>
                          {(
                            Number(
                              project.display_duration
                            ) / 1000
                          ).toFixed(1)}
                          s
                        </td>

                        <td>

                          <button
                            type="button"
                            className={
                              project.published
                                ? "status published"
                                : "status unpublished"
                            }
                            onClick={() =>
                              togglePublished(
                                project
                              )
                            }
                          >

                            {project.published ? (
                              <>
                                <FaEye />
                                Published
                              </>
                            ) : (
                              <>
                                <FaEyeSlash />
                                Hidden
                              </>
                            )}

                          </button>

                        </td>

                        <td>

                          <button
                            type="button"
                            className={
                              project.featured
                                ? "hero-toggle active"
                                : "hero-toggle"
                            }
                            onClick={() =>
                              toggleFeatured(
                                project
                              )
                            }
                            title={
                              project.featured
                                ? "Remove from hero"
                                : "Make hero project"
                            }
                          >
                            <FaStar />
                          </button>

                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              type="button"
                              className="edit-btn"
                              onClick={() =>
                                editProject(
                                  project
                                )
                              }
                              title="Edit project"
                            >
                              <FaEdit />
                            </button>

                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() =>
                                deleteProject(
                                  project
                                )
                              }
                              title="Delete project"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </Layout>
  );
}