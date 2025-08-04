"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";
import pomu1 from "../images/projects/pomu-1.jpg";
import pomu2 from "../images/projects/pomu-2.jpg";
import pomu3 from "../images/projects/pomu-3.jpg";
import stewards1 from "../images/projects/stewards-1.jpg";
import stewards2 from "../images/projects/stewards-2.jpg";
import stewards3 from "../images/projects/stewards-3.jpg";
import stewards4 from "../images/projects/stewards-4.jpg";
import momeChoix1 from "../images/projects/mome-1.jpg";
import momeChoix2 from "../images/projects/mome-2.jpg";

// Image carousel component
const ImageCarousel = ({ images, alt, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(images);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      {images.map((image, index) => (
        <div
          key={image}
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={clsx(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// Your actual projects with image carousels
const projects = [
  {
    id: 1,
    title: "Pomu",
    description:
      "Platform helping fashion brands find manufacturers. Participated in LvlUp Ventures, NYU startup bootcamp, and Innovention at Tandon Future Lab.",
    images: [pomu1, pomu2, pomu3],
    link: "https://pomu.io/",
    tags: ["Fashion Tech", "Manufacturing", "B2B Platform"],
    achievements: [
      { name: "LvlUp Ventures", link: "https://www.lvlup.vc/" },
      {
        name: "NYU Startup Bootcamp",
        link: "https://entrepreneur.nyu.edu/resource/bootcamps/",
      },
      {
        name: "Innovention",
        link: "https://engineering.nyu.edu/research-innovation/entrepreneurship/innovention",
      },
    ],
  },
  {
    id: 2,
    title: "StewardsAI",
    description:
      "Built a bus express route recommendation system as a developer. AI-powered transportation optimization focusing on intelligent route planning.",
    images: [stewards1, stewards2, stewards3, stewards4],
    link: "https://www.stewards.ai/",
    tags: ["AI", "Transportation", "Route Optimization", "Urban Planning"],
  },
  {
    id: 3,
    title: "Môme Choix",
    description:
      "Premier baby and kids clothing brand dedicated to high-quality products that combine comfort, sustainability, and style.",
    images: [momeChoix1, momeChoix2],
    link: "https://momechoix.vercel.app/",
    tags: ["Fashion", "E-commerce", "Sustainability", "Baby & Kids"],
  },
];

const ProjectCard = ({ project, className }) => {
  return (
    <div
      className={clsx(
        "group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      {/* Replace single image with carousel */}
      <ImageCarousel
        images={project.images}
        alt={project.title}
        className="aspect-[4/3] mb-4 rounded-lg bg-neutral-100"
      />

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-neutral-600 line-clamp-3">
          {project.description}
        </p>

        {/* Achievement badges for special projects */}
        {project.achievements && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-neutral-700">
              Achievements:
            </p>
            <div className="flex flex-wrap gap-1">
              {project.achievements.map((achievement) => (
                <a
                  key={achievement.name}
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200 transition-colors"
                >
                  {achievement.name}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Project
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectList = ({ className }) => {
  return (
    <FadeIn className={className}>
      <div className="h-full">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Recent Projects
          </h2>
          <p className="text-neutral-600 mt-2">
            From Korea to Beijing, Berkeley to NYU - my entrepreneurial journey
          </p>
        </div>

        <div className="h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
          <div className="space-y-6 pr-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default ProjectList;
