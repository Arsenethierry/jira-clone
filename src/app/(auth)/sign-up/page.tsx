import { getCurrentUser } from '@/features/auth/actions';
import { SignUpCard } from '@/features/auth/components/sign-up-card';
import { redirect } from 'next/navigation';
import React from 'react';

async function page() {
    const user = await getCurrentUser();

    if (user) redirect("/");
    return <SignUpCard />
}

export default page;