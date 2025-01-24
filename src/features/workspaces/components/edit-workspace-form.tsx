"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editWorkspaceSchema } from "../schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowBigLeft, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";

interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: Workspace;
}
export const EditWorkspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {
    const { mutate, isPending } = useUpdateWorkspace();
    
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof editWorkspaceSchema>>({
        resolver: zodResolver(editWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? "",
        }
    });

    const onSubmit = (values: z.infer<typeof editWorkspaceSchema>) => {
        const finalVaues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        };

        mutate({
            form: finalVaues,
            param: { workspaceId: initialValues.$id }
        }, {
            onSuccess: ({ data }) => {
                form.reset();
                router.push(`/workspaces/${data.$id}`);
            }
        });
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
        }
    }

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    <div className="flex items-center gap-2">
                        <Button variant={'outline'}>
                            <ArrowBigLeft />
                            Back
                        </Button>
                        {initialValues.name}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workspace Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter workspace name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex items-center gap-x-5">
                                        {field.value ? (
                                            <div className="relative size-[75px] rounded-md overflow-hidden">
                                                <Image src={
                                                    field.value instanceof File
                                                        ? URL.createObjectURL(field.value)
                                                        : field.value
                                                }
                                                    fill
                                                    className="object-cover"
                                                    alt="Image"
                                                />
                                            </div>
                                        ) : (
                                            <Avatar className="size-32 mt-2">
                                                <AvatarFallback>
                                                    <ImageIcon className="size-[36px] text-neutral-400" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="flex flex-col">
                                            <p className="text-sm">Workspace Icon</p>
                                            <p className="text-sm text-muted-foreground">JPG, PNG, SVG or JPEG, max 1mb</p>
                                            <input
                                                className="hidden"
                                                type="file"
                                                accept=".jpg, .png, .svg, .jpeg"
                                                ref={inputRef}
                                                disabled={isPending}
                                                onChange={handleImageChange}
                                            />
                                            <Button
                                                type="button"
                                                disabled={isPending}
                                                variant="teritary"
                                                size={"xs"}
                                                className="w-fit mt-2"
                                                onClick={() => inputRef.current?.click()}
                                            >
                                                Upload Image
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />

                        <DottedSeparator className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                variant={'secondary'}
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && "invisible")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}