import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
    const providers = [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { login, password } = credentials as any;
                if (login !== "qwerty" || password !== "12345") {
                    return null;
                }

                return { id: login }
            }
        })
    ]

    return await NextAuth(req, res, {
        providers,
        session: {
            strategy: "jwt",
        },
        pages: {
            signIn: '/signin',
        },
    })
}