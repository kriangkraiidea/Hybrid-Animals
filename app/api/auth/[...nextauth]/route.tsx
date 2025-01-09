import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/model/User";
import { connectMongoDB } from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

// กำหนด type สำหรับ credentials

// ขยาย DefaultSession และ User interfaces
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials = ", credentials);
        if (!credentials) {
          return null;
        }
    
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });
        console.log("user in api auth", user);
        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          console.error("Invalid email or password");
          throw new Error("Invalid email or password");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === "google") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              return true; // Returning true on success
            }
          }
        } catch (error) {
          console.log(error);
          return false; // Returning false on error
        }
      }

      return true; // Returning true for other providers
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const userWithIdAndRole = user as { id: string; role: string }; // Type assertion
        token.id = userWithIdAndRole.id;
        token.role = userWithIdAndRole.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };