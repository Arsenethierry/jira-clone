
import { getCurrentUser } from '@/features/auth/queries';
import { getWorkspace } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import React from 'react';

interface WorkspaceIdPageProps {
    params: {
        workspaceId: string
    }
}
async function WorkspaceIdPage({ params: { workspaceId } }: WorkspaceIdPageProps) {
    const user = await getCurrentUser();

    if (!user) redirect("/sign-in");

    const workspace = await getWorkspace({ workspaceId });
    if(!workspace) redirect("/")
    return (
        <div>
            workspaceId page: {JSON.stringify(workspace)}
        </div>
    );
}

export default WorkspaceIdPage;