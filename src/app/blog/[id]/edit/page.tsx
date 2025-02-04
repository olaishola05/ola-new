import EditParent from "@/components/Posts/edit/edit-parent";
import { redirect } from "next/navigation";

export default function EdithPage({ params }: { params: { id: string } }) {

  if (!params.id) {
    redirect('/blog')
  }
  return (
    <div>
      <EditParent params={params} />
    </div>
  );
}
