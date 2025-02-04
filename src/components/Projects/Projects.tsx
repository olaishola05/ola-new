import prisma from "@/app/lib/prisma";
import { ProjectSection } from "..";

export async function getProjects(state: boolean) {
  return await prisma.project.findMany({
    where: {
      published: state,
    },
  });
}

export async function Projects() {
  const projects = await getProjects(true);

  return <ProjectSection data={projects} />;
}
