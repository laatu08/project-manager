import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/projectApi";
import ReactMarkdown from "react-markdown";
// import { Helmet } from "react-helmet-async";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AutoSlider from "../components/AutoSlider";
import AutoScrollDragSlider from "../components/AutoScrollDragSlider";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectById(id).then((res) => setProject(res));
  }, [id]);

  if (!project) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      {/* <Helmet>
        <title>{project.title}</title>
        <meta name="description" content={project.summary} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.summary} />
        {project.images?.[0] && (
          <meta property="og:image" content={project.images[0].url} />
        )}
      </Helmet> */}

      <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
      <p className="text-gray-600">{project.summary}</p>

      {/* Carousel */}
      {project.images?.length > 0 && (
        <div className="my-6">
          {/* <Swiper spaceBetween={20} slidesPerView={1}>
            {project.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img.url} alt={img.alt} className="rounded" />
              </SwiperSlide>
            ))}
          </Swiper> */}

          {/* <AutoSlider images={project.images} interval={3000} /> */}

          <AutoScrollDragSlider images={project.images} interval={2500} />
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4 mt-4">
        {project.githubUrl && (
          <a
            href={
              project.githubUrl.startsWith("http")
                ? project.githubUrl
                : "https://" + project.githubUrl
            }
            className="text-blue-600 underline"
            target="_blank"
          >
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={
              project.liveUrl.startsWith("http")
                ? project.liveUrl
                : "https://" + project.liveUrl
            }
            className="text-green-600 underline"
            target="_blank"
          >
            Live Demo
          </a>
        )}
      </div>

      {/* Tech Stack */}
      {project.techStack?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-gray-200 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {project.tags?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-blue-200 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Markdown Description */}
      <div className="mt-8 prose max-w-none">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </div>
    </div>
  );
}
