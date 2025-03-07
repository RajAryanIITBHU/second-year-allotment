import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import dbConnect from "./lib/mongodb";
import { getUserByEmail } from "./actions/userAction";
import { createUser } from "./actions/userAction";


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
            const branch =
              profile.name.split(" ")[profile.name.split(" ").length - 2];

            const creationResult = await createUser({
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              branch,
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

    async jwt({ token, user,trigger }) {
      try {
        await dbConnect();

        if (user) {
          token = {
            ...token,
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            branch: user.branch,
            isAlloted: user.isAlloted,
            roomAlloted: user.roomAlloted,
          };
        }

        if (trigger === "update") {
          const updatedUser = await getUserByEmail(token.email);
          if (updatedUser?.success) {
            token.isAlloted = updatedUser.data.isAlloted;
            token.roomAlloted = updatedUser.data.roomAlloted;
          }
        }
       
        const userResult = await getUserByEmail(token.email);
        if (userResult?.success && userResult.data) {
          token = {
            ...token,
            ...userResult.data,
            id: userResult.data._id,
            branch: userResult.data.branch,
            isAlloted: userResult.data.isAlloted,
            roomAlloted: userResult.data.roomAlloted,
          };
        }

         


        return token;
      } catch (error) {
        console.error("JWT error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.image,
        branch: token.branch,
        isAlloted: token.isAlloted,
        roomAlloted: token.roomAlloted,
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
    signOut: "/",
  },
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.AUTH_SECRET,
});
