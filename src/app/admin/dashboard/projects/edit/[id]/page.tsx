import React from 'react'
import prisma from '@/app/lib/prisma';
import EditForm from './EditForm';

type Params = {
  params: {
    id: string
  }
}

const getProject = async (id: string) => {
  const res = await prisma.project.findUnique({
    where: {
      id: id
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  if (!res) {
    throw new Error('Something went wrong')
  }
  return JSON.parse(JSON.stringify(res))
}

const EditProjectPage = async ({ params }: Params) => {
  const { id } = params
  const project = await getProject(id)
  return (
    <div className='max-h-[calc(100vh-100px)] overflow-y-auto'>
      <EditForm project={project} />
    </div>
  );
}

export default EditProjectPage