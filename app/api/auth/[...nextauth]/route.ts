// app/api/auth/[...nextauth].ts

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email))
                    .then((res) => res[0]);

                if (user && user.password === credentials.password) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };