import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";

import { setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";

const app = new Hono()
    .post(
        "/login",
        zValidator("json", loginSchema),
        (c) => {
            const { email, password } = c.req.valid("json");
            console.log(email, password)
            return c.json({ email, password });
        }
    )
    .post(
        "/register",
        zValidator("json", registerSchema),
        async (c) => {
            const { account } = await createAdminClient();
            const { email, password, username } = c.req.valid("json");
            const user = await account.create(ID.unique(), email, password, username);
            
            const session = await account.createEmailPasswordSession(email, password);

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                maxAge: 60 * 60 * 24 * 30
            });

            return c.json({ data: user });
        }
    )

export default app;