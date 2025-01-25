"use client";

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useInviteCode } from '../hooks/use-invite-code';
import { useJoinWorkspace } from '../api/use-join-workspace';
import { useWorkspaceId } from '../hooks/use-workspace-id';
import { useRouter } from 'next/navigation';

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    }
}
export const JoinWorkspaceForm = ({ initialValues: { name } }: JoinWorkspaceFormProps) => {
    const inviteCode = useInviteCode();
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useJoinWorkspace();

    const router = useRouter();

    const onSubmit = () => {
        mutate({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`)
            }
        })
    }

    return (
        <Card className='w-full h-full border-none shadow-none'>
            <CardHeader className='p-7'>
                <CardTitle className='text-xl font-bold'>
                    Join workspace
                </CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join <strong>{name}</strong> workspace.
                </CardDescription>
                <div className='px-7'>
                    <DottedSeparator />
                </div>
                <CardContent className='p-7'>
                    <div className='flex flex-col lg:flex-row items-center justify-between'>
                        <Button
                            variant={"secondary"}
                            type='button'
                            className='w-full lg:w-fit'
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            className='w-full lg:w-fit'
                            type='button'
                            onClick={onSubmit}
                            disabled={isPending}
                        >
                            Join workspace
                        </Button>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    );
}