import { getCurrentUser } from '@/features/auth/queries';
import { JoinWorkspaceForm } from '@/features/workspaces/components/join-workspace-form';
import { getWorkspaceInfo } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import React from 'react';

interface WorkspaceIdJoinPageProps {
    params: {
        workspaceId: string;
    }
}

const WorkspaceIdJoinPage = async ({ params: { workspaceId } }: WorkspaceIdJoinPageProps) => {
    const user = await getCurrentUser();

    if (!user) redirect("/sign-in");

    const workspace = await getWorkspaceInfo({ workspaceId });

    if(!workspace) redirect("/")

    return (
        <div className='w-full lg:max-w-xl'>
            <JoinWorkspaceForm initialValues={workspace} />
        </div>
    );
}

export default WorkspaceIdJoinPage;