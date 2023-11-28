import React from 'react'
import CreateForm from './CreateForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Project - Dashboard',
  description: 'Create a new project page',
}

const CreateProjectPage = () => {
  return (
    <>
      <main className='w-[85%] p-5 my-[60px] mx-auto bg-[var(--bg)] rounded-lg'>
        <h1 className='text-center text-[var(--textColor)] text-5xl'>
          Create Project
        </h1>
        <CreateForm />
      </main>
    </>
  )
}

export default CreateProjectPage