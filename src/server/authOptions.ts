// server/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/users";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const user = await getUserByEmail(email);
          if (!user) {
            throw new Error("No user found with the provided email.");
          }

          // Assuming you have a function to compare passwords
          const isMatch = user.password === password;

          if (!isMatch) {
            throw new Error("Invalid password.");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authorization failed.");
        }
      },
    }),
    // CredentialsProvider({
    //   type: 'credentials',
    //   credentials: {},
    //   async authorize(credentials) {
    //     if (!credentials) return null;

    //     const { email, password, deviceId } = credentials as ILoginCredential;
    //     try {
    //       const res = await client.mutate<{ loginWithEmailPassword: ISignInResponse }>({
    //         mutation: LOGIN_MUTATION,
    //         variables: {
    //           body: {
    //             email,
    //             password,
    //             deviceId
    //           }
    //         }
    //       });

    //       if (res?.errors) {
    //         throw new Error(res?.errors[0].message);
    //       }

    //       if (res?.data?.loginWithEmailPassword?.token) {
    //         const data = res.data.loginWithEmailPassword;

    //         return {
    //           id: data.user?._id || '',
    //           user: data.user,
    //           access_token: data.token.accessToken,
    //           refresh_token: data.token.refreshToken,
    //           expires_at: data.token.accessTokenExpiresIn,
    //           emailVerified: data.user.status !== 'email_verification_pending'
    //         };
    //       }

    //       if (res?.data?.loginWithEmailPassword?.user?.status === 'email_verification_pending') {
    //         const data = res.data.loginWithEmailPassword;
    //         return {
    //           id: data?.user?._id || '',
    //           user: data?.user,
    //           expiry: data?.expiry,
    //           emailVerified: false
    //         };
    //       }

    //       return null;
    //     } catch (error: any) {
    //       throw new Error(error);
    //     }
    //   }
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn(data) {
      // console.log('account====>',account)
      console.log("data===>", data);
      // console.log('profile====>',profile)
      // Custom sign-in logic
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // Add the user, account, and profile data to the token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token", token);
      session.user = token;
      session.user.image = token.picture;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
