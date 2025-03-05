import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import User from "./model/User";
import dbConnect from "./lib/mongodb";
import { createUser } from "./actions/createUser";
import { getUserByEmail } from "./actions/getUserByEmail";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (account.provider === "google") {
          const isVerified =
            profile.email_verified && profile.email.endsWith("@itbhu.ac.in");
          if (!isVerified) return false;

          await dbConnect();
          const existingUser = await getUserByEmail(profile.email);

          if (!existingUser?.success) {

            const creationResult = await createUser({
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              branch: "NA", // Explicit default
              isAlloted: false,
              roomAlloted: 0,
            });

            if (!creationResult?.success) {
              console.error("User creation failed:", creationResult.error);
              return false;
            }
          }
          return true;
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      try {
        await dbConnect();
        if (user) {
         
          token = {
            ...token,
            name: user.name,
            email: user.email,
            picture: user.image,
          };
        }

        const userResult = await getUserByEmail(token.email);
        if (userResult?.success && userResult.data) {
          return {
            ...token,
            ...userResult.data,
            id: userResult.data._id?.toString(),
            createdAt: userResult.data.createdAt.toISOString(),
          };
        }
        return token;
      } catch (error) {
        console.error("JWT error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
          id: token.id,
          createdAt: token.createdAt,
        },
      };
    },
  },

  pages: {
    signIn: "/",
    error: "/",
    signOut: "/",
  },

  // Important for production
  debug: process.env.NODE_ENV !== "development",
  secret: process.env.AUTH_SECRET,
});
