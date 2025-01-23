"use client";

import { DottedSeparator } from '@/components/dotted-separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginSchema } from '../schemas';
import { useLogin } from '../api/use-login';
import { Loader } from 'lucide-react';
export const SignInCard = () => {

    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({ json: values });
    }

    return (
        <Card className='w-full h-full md:w-[487px] border-none shadow-none space-y-6'>
            <CardHeader className='flex items-center justify-center text-center'>
                <CardTitle className='text-2xl'>
                    Welcome back!
                </CardTitle>
            </CardHeader>
            <div className='px-7'>
                <DottedSeparator />
            </div>
            <CardContent className="space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} className='w-full' size={'lg'}>
                            <Loader className={isPending ? "animate-spin" : "hidden"} /> {" "}
                            Login
                        </Button>
                    </form>
                </Form>
                <div className='px-7'>
                    <DottedSeparator />
                </div>
                <Button disabled={isPending} variant={'outline'} className='w-full'>Log In with Google</Button>
                <Button disabled={isPending} variant={'outline'} className='w-full'>Log In with Github</Button>
            </CardContent>
        </Card>
    );
}