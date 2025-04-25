import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "user-read-email playlist-read-private user-read-private playlist-read-collaborative",
          show_dialog: true,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token!;
        token.refresh_token = account.refresh_token!;
        token.expires_at = account.expires_at! * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
};
