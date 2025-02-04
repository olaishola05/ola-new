"use client";

import React from "react";
import { useTogglePublish, useNavigation } from "@/app/hooks";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

type Props = {
  project: any;
};

const initialState = {
  error: "",
  success: false,
};

export default function DeleteProject({ project }: Props) {
  const { navigate } = useNavigation();
  const { data: session } = useSession();

  const userHasValidSession = Boolean(session);
  const projectBelongsToUser = session?.user?.email === project?.author?.email;

  const { published, togglePublish } = useTogglePublish({
    id: project?.id,
    initialState: project?.published,
  });

  const [formState, action] = useFormState(
    actions.deleteProject.bind(null, project.id),
    initialState,
  );

  const handleProjectEdit = (id: string) => {
    navigate(`${process.env.NEXT_PUBLIC_ADMIN_URL}/projects/edit/${id}`);
  };

  return (
    <div>
      {userHasValidSession && projectBelongsToUser && (
        <div className="btn-container flex gap-5 w-[500px] mx-auto">
          <button onClick={() => togglePublish()}>
            {!published && userHasValidSession && projectBelongsToUser
              ? "Publish"
              : "Unpublish"}
          </button>

          <button onClick={() => handleProjectEdit(project.id)}>Edit</button>

          {userHasValidSession && projectBelongsToUser && (
            <form action={action}>
              <button>Delete</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
