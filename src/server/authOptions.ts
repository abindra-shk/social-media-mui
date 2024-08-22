// server/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import client from "../../apollo.config";
import { GOOGLE_SIGNIN_MUTATION, LOGIN_MUTATION } from "@/graphql/mutations";

export interface ILoginCredential {
  email: string;
  password: string;
}

const handleProvider = async (account: any) => {
  console.log("account===>", account);
  switch (account?.provider) {
    case "google":
      try {
        const responseGoogle = await client.mutate({
          mutation: GOOGLE_SIGNIN_MUTATION,
          variables: {
            accessToken: account.id_token,
          },
        });
        console.log("responseGoogle====>", responseGoogle);
        if (responseGoogle?.errors) {
          throw new Error(responseGoogle?.errors[0].message);
        }
        if (responseGoogle?.data) {
          const returnData = responseGoogle?.data?.loginWithGoogle;
          console.log("returnData =====>", returnData);
          return {
            id: returnData?.user?.id || "",
            user: returnData?.user,
            access_token: returnData?.accessToken,
            refresh_token: returnData?.refreshToken,
          };
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
        return false;
      }

    default:
      return false;
  }
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "Enter your email",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Enter your password",
    //     },
    //   },
    //   async authorize(credentials: any): Promise<any> {
    //     await dbConnect();
    //     console.log("credentials in authoptions", credentials);
    //     try {
    //       const user = await UserModel.findOne({
    //         $or: [
    //           { email: credentials.email },
    //           { username: credentials.email },
    //         ],
    //       });
    //       console.log("user===>", user);
    //       if (!user) {
    //         throw new Error("No user found with this email");
    //       }

    //       const isPasswordCorrect = await bcrypt.compare(
    //         credentials.password,
    //         user.password
    //       );
    //       if (isPasswordCorrect) {
    //         return user;
    //       } else {
    //         throw new Error("Incorrect password");
    //       }
    //     } catch (err: any) {
    //       throw new Error(err);
    //     }
    //   },
    // }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials as ILoginCredential;
        try {
          console.log("email", email);
          console.log("password", password);
          const res = await client.mutate<{
            login: ISignInResponse;
          }>({
            mutation: LOGIN_MUTATION,
            variables: {
              loginInput: {
                email,
                password,
              },
            },
          });
          console.log("response===>", res);
          if (res?.errors && res.errors.length > 0) {
            // Log the error messages or process them as needed
            console.error("GraphQL errors:", res.errors);
            throw new Error(res.errors[0].message);
          }

          if (res?.data?.login?.accessToken) {
            const data = res.data.login;

            return {
              id: data.user?.id || "",
              user: data.user,
              access_token: data.accessToken,
              refresh_token: data.refreshToken,
              emailVerified: data.user.isEmailVerified,
            };
          }

          return null;
        } catch (error: any) {
          // Handle the error here
          console.error("Error in authorization:", error);
          throw new Error(error.message || "Authorization failed");
        }
      },
    }),
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
    async signIn({ user, account, profile }: any) {
      const providerData = await handleProvider(account);
      console.log("provided data===>", providerData);
      if (providerData) {
        user.id = providerData.id;
        user.user = providerData.user;
        user.access_token = providerData.access_token;
        user.refresh_token = providerData.refresh_token;
        return true;
      }
      return true;
    },
    async jwt({ token, user }: any) {
      console.log("user===>", user);
      if (user) {
        const userDetail = user as ISignInResponse;

        return {
          access_token: userDetail?.accessToken,
          refresh_token: userDetail?.refreshToken,
          user: userDetail?.user,
        };
      }
      return token;
    },

    async session({ session, token }: any) {
      console.log("token===>", token);
      
      session.user.image = token.user.profile.avatar;
      session.user.name = token.user.userName;
      session.user.email = token.user.email;
      // session.user = token.user;
      console.log("session===>", session);
      return session;
    },
    // async jwt({ token, user, account }) {
    //   if (user) {
    //     token.id = user.id;
    //     token.name = user.name;
    //     token.email = user.email;
    //     token.image = user.image;
    //   }
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   console.log("token", token);
    //   session.user = token;
    //   session.user.image = token.picture;
    //   return session;
    // },
  },
  pages: {
    signIn: "/login",
  },
};
