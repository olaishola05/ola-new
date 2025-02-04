import React from "react";
import { Drafts } from "@/components";
import CreateButton from "@/components/Button/CreateProjectBtn";
import Noprojects from "@/components/Projects/NoProject";
import { Metadata } from "next";
import prisma from "@/app/lib/prisma";

export const metadata: Metadata = {
  title: "Project Drafts - Dashboard",
  description: "Project drafts page",
};

const getProjects = async () => {
  return await prisma.project.findMany({});
};

async function Projects() {
  const projects = await getProjects();
  return (
    <>
      <div className="my-0 mx-auto">
        {projects?.length > 0 && (
          <div className="flex justify-end mt-8">
            <CreateButton />
          </div>
        )}
        <h1 className="text-4xl font-bold text-center text-[var(--textColor)] mt-5">
          Project Drafts
        </h1>
        {projects?.length === 0 && <Noprojects />}
        {projects?.length > 0 && <Drafts projects={projects} />}
      </div>
    </>
  );
}

export default Projects;

