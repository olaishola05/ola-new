import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteFormState {
  error?: string;
  success?: boolean;
}

export async function deleteProject(
  id: string,
  _formState: DeleteFormState,
): Promise<DeleteFormState> {
  if (!id) {
    return {
      error: "Invalid project id",
    };
  }

  try {
    const response = await prisma.project.delete({
      where: {
        id,
      },
    });

    if (!response) {
      return {
        error: "Project not found",
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
  }

  revalidatePath("/admin/dashboard/projects");
  revalidatePath("/");
  redirect("/admin/dashboard/projects");
}
