import fetcher from "./fetcher";

export interface Credentials {
  email: string;
  password: string;
}

export type AuthMode = "signin" | "signup";

export const auth = (mode: AuthMode, body: Credentials) => {
  return fetcher(`/${mode}`, body);
};
