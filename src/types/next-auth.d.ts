// next-auth.d.ts
import { DefaultSession, DefaultUser, Profile as DefaultProfile } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { SpotifyProfile } from "next-auth/providers/spotify";

declare module "next-auth" {
  // 1) Sessão ganha token e user.id
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & { id: string };
    token: DefaultJWT;
  }

  // 2) Se em algum ponto você usar `user` puro
  interface User extends DefaultUser {
    id: string;
  }

  // 3) O profile que vem do Spotify
  interface Profile extends SpotifyProfile {}
}

declare module "next-auth/jwt" {
  // 4) Nosso JWT interno ganha esses campos
  interface JWT extends DefaultJWT {
    access_token: string;
    refresh_token?: string;
    expires_at?: number;
    sub?: string;
  }
}
