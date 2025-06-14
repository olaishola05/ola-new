import React from "react";
import { CustomButton } from "@/components";
import { BsGithub as GitHubIcon } from "react-icons/bs";
import { BiLinkExternal as LinkIcon } from "react-icons/bi";
import Image from "next/image";
import ConditionalHeader from "./ConditionalHeader";
import DeleteProject from "./DeleteProject";
import Link from "next/link";
import { Metadata } from "next";
import prisma from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Project Details",
  description: "Project details page",
};

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({});

  return projects.map((project) => ({
    params: {
      id: project.id,
    },
  }));
}

const getProjectWithGeneratedParams = async (id: string) => {
  const res = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return res;
};

const ProjectPage = async ({ params }: Props) => {
  const { id } = params;
  const project = await getProjectWithGeneratedParams(id);

  if (!project || project === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-[var(--textColor)]">
          Project not found
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="w-[85%] max-h-[calc(100vh-250px)] overflow-y-auto grid grid-cols-1 md:grid-cols-1 gap-1 p-5 my-[100px] mx-auto bg-[var(--contactBg)] rounded-lg">
        <div className="relative h-[408px] p-4 md:p-0">
          <Image
            src={project?.coverImgUrl || project?.images[0]}
            alt={project?.coverImgUrl || project?.images[0]}
            fill
            className="w-full absolute object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col p-3 gap-5">
          <div className="flex items-center justify-between">
            <h6 className="text-[var(--textColor)] text-lg font-semibold capitalize">
              {project?.tag}
            </h6>
            <ConditionalHeader project={project} />
          </div>
          {project?.description.map((text: string, index: number) => (
            <p
              key={index}
              className="text-textColor text-lg font-normal mb-4"
            >
              {text}
            </p>
          ))}
          <ul className="flex flex-wrap gap-2">
            Tech Stacks:{" "}
            {project?.stacks.map((stack: string, idx: number) => (
              <li key={idx}>{stack}</li>
            ))}
          </ul>
          <div className="btn-container flex items-center justify-between w-full gap-5">
            <div className="flex items-center  gap-5">
              {project?.liveUrl && (
                <CustomButton variant="contained" color="primary" width="180px">
                  <Link
                    className="flex gap-3 items-center"
                    href={project?.liveUrl}
                    target="_blank"
                  >
                    Live Demo <LinkIcon />
                  </Link>
                </CustomButton>
              )}

              {project?.githubUrl && (
                <CustomButton variant="outlined" color="primary" width="180px">
                  <Link
                    className="flex gap-3 items-center"
                    href={project?.githubUrl}
                  >
                    Source Code <GitHubIcon />
                  </Link>
                </CustomButton>
              )}
            </div>
            <DeleteProject project={project} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;

