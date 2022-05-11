import AuthForm from "../components/AuthForm";
import Signup from "./signup";

const Signin = () => {
  return <AuthForm mode={"signin"}></AuthForm>;
};

Signin.authPage = true;

export default Signin;
