"use client";

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerSchema } from '../schemas';
import { useRegister } from '../api/use-signup';

export const SignUpCard = () => {
    const { mutate } = useRegister();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        }
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
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
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="user name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                        <Input placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={false} className='w-full' size={'lg'}>Sign Up</Button>
                    </form>
                </Form>
                <div className='px-7'>
                    <DottedSeparator />
                </div>
                <Button variant={'outline'} className='w-full'>Log In with Google</Button>
                <Button variant={'outline'} className='w-full'>Log In with Github</Button>
            </CardContent>
        </Card>
    );
}