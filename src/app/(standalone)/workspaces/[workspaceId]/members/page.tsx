import { getCurrentUser } from '@/features/auth/queries';
import { MembersList } from '@/features/workspaces/components/members-list';
import { redirect } from 'next/navigation';
import React from 'react';

const WorkspaceMembersPage = async () => {
    const user = await getCurrentUser();

    if (!user) redirect("/sign-in");
    return <MembersList />;
}

export default WorkspaceMembersPage;