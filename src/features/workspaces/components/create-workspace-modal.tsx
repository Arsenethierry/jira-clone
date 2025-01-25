"use client";

import React from 'react';
import { CreateWorkspaceForm } from './create-workspace-form';
import { useCreateWorkspaceModal } from '../hooks/use-create-workspace-modal';
import { ResponsiveModal } from '@/components/responsive-use';

export const CreateWorkspaceModal = () => {
    const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close} />
        </ResponsiveModal>
    );
}