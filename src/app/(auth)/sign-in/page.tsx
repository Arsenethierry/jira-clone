import { getCurrentUser } from '@/features/auth/queries';
import { SignInCard } from '@/features/auth/components/sign-in-card';
import { redirect } from 'next/navigation';
import React from 'react';

async function page() {
    const user = await getCurrentUser();
    
      if(user) redirect("/");

    return <SignInCard />
}

export default page;