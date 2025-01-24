import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspacesAction } from "@/features/workspaces/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if(!user) redirect("/sign-in");
  
  const workspaces = await getWorkspacesAction();
  if(workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
