"use client";

import React, { useState } from "react";
import {
  TabPanel,
  AllProjects,
  BackendProjects,
  FrontendProjects,
  FullstackProjects,
  CustomCard,
  ProjectModal,
} from "@/components";
import { tabs } from "@/app/utils";

type props = {
  data: {
    id: string;
    name: string;
    description: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    coverImgUrl: string | null;
    stacks: string[];
    modalImgUrl: string | null;
    tag: string | null;
    authorId: string | null;
  }[]
};

const ProjectSection = ({ data }: props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [project, setProject] = useState({});

  const handleOpenModal = (id: string) => {
    setOpenModal(!openModal);
    const project = data?.find((item) => item.id === id);
    setProject(project || {});
  };

  const handleChange = (
    event: null,
    newValue: React.SetStateAction<number>,
  ) => {
    setActiveTab(newValue);
  };

  const switchComponent = (value: string) => {
    switch (value) {
      case "all":
        return <AllProjects data={data} handleOpenModal={handleOpenModal} />;
      case "frontend":
        return (
          <FrontendProjects projects={data} handleOpenModal={handleOpenModal} />
        );
      case "backend":
        return (
          <BackendProjects projects={data} handleOpenModal={handleOpenModal} />
        );
      case "fullstack":
        return (
          <FullstackProjects
            projects={data}
            handleOpenModal={handleOpenModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="my-works"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      className="md:px-2 pb-9 w-full mb-10"
    >
      {openModal && (
        <ProjectModal
          open={openModal}
          handleClose={handleOpenModal}
          project={project}
        />
      )}

      <div className="w-full flex flex-col gap-2">
        <p
          className="info text-[var(--textColor)] text-center text-base md:text-xl font-light"
          data-aos="zoom-in-up"
          data-aos-duration="8000"
        >
          Visit my portfolio for my latest projects
        </p>
        <h1 className="text-2xl md:text-6xl text-center">My Recent Works</h1>

        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="md:hidden lg:hidden flex flex-col gap-10 mt-5"
        >
          {data?.map((project: any) => (
            <CustomCard
              key={project.id}
              image={project.coverImgUrl}
              overlayText="View Project"
              name={project.name}
              role={project.tag}
              description={project.description}
              onClick={() => handleOpenModal(project.id)}
            />
          ))}
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="hidden md:block"
        >
          <ul className="w-90 flex justify-center gap-5 mx-auto mt-10 md:mb-7 lg:mb-0">
            {tabs.map((tab, index) => (
              <li key={tab.label}>
                <button
                  onClick={() => handleChange(null, index)}
                  className={`px-4 py-2 border border-[var(--cta)] hover:bg-[var(--cta)] hover:text-[var(--ctaText)]  rounded-full ${activeTab === index ? "bg-[var(--btnMode)] text-white" : "text-primary"}`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          {tabs.map((tab, index) => (
            <TabPanel key={tab.label} value={activeTab} index={index}>
              {switchComponent(tab.value)}
            </TabPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
