import { getCurrentUser } from '@/features/auth/queries';
import { getWorkspace } from '@/features/workspaces/queries';
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form';
import { redirect } from 'next/navigation';
import React from 'react';

interface WorkspaceIdSettingsPageProps {
    params: {
        workspaceId: string
    }
}
async function WorkspaceIdSettingsPage({ params: { workspaceId } }: WorkspaceIdSettingsPageProps) {
    const user = await getCurrentUser();

    if (!user) redirect("/sign-in");

    const initialValues = await getWorkspace({ workspaceId });

    if(!initialValues) return redirect(`/workspaces/${workspaceId}`)
    return (
        <div>
            <EditWorkspaceForm initialValues={initialValues}/>
        </div>
    );
}

export default WorkspaceIdSettingsPage;