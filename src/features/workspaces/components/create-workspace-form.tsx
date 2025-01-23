"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";

interface CreateWorkspaceFormProps {
    onCancel: () => void;
}
export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
    const { mutate, isPending } = useCreateWorkspace();

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        mutate({ json: values });
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new workspace
                </CardTitle>
            </CardHeader>
            <CardContent className="p-7">
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

                        <DottedSeparator className="py-7" />  
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                variant={'secondary'}
                                onClick={onCancel}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                            >
                                Create workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}