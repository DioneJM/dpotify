import AuthForm from "../components/AuthForm";

const Signin = () => {
  return <AuthForm mode="signin" />;
};

Signin.publicPage = true;

export default Signin;
