import AuthForm from "../components/AuthForm";

const Signup = () => {
  return <AuthForm mode={"signup"}></AuthForm>;
};

Signup.authPage = true;

export default Signup;
