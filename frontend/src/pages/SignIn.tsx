import { useForm } from "react-hook-form";
import { SignInFormType } from "../tying";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function SignIn() {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormType>();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful! ", type: "SUCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: async (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold ">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is requierd" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is requierd",
            minLength: {
              value: 6,
              message: "Password must be at least 6",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to={"/register"}>
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-500 p-2 font-bold"
        >
          Login
        </button>
      </span>
    </form>
  );
}

export default SignIn;
