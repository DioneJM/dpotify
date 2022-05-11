import fetcher from "./fetcher";

export interface Credentials {
  email: string;
  password: string;
}

export const auth = (mode: "signin" | "signup", body: Credentials) => {
  return fetcher(`/${mode}`, body);
};
