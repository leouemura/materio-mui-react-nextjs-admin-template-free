import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"
import { Stripe } from "stripe"

export default NextAuth({
    providers: [
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_CLIENT_ID,
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url
                }
            }
        }),
    ],
    pages: {
        signIn: "/pages/login",
      },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, user }) => {
            console.log("******************************")
            console.log("creating session :>>", session)
            console.log("******************************")
            console.log("******************************")
            console.log("creating user :>>", user)
            console.log("******************************")
            return({
            ...session,
            user: {
                ...session.user,
                id: user.id,
                username: user.username,
            },
        })}
    },
    events: {
        createUser: async ({ user }) => {
            console.log("******************************")
            console.log("creating user :>>", user)
            console.log("******************************")

            // Create stripe API client using the secret key env variable
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
                apiVersion: "2022-08-01",
            });

            // Create a stripe customer for the user with their email address
            await stripe.customers
                .create({
                    email: user.email!,
                })
                .then(async (customer) => {
                    console.log("customer :>>",customer)
                    // Use the Prisma Client to update the user in the database with their new Stripe customer ID
                    return prisma.user.update({
                        where: { id: user.id },
                        data: {
                            stripeCustomerId: customer.id,
                        },
                    });
                });
        }
    }
})