import { useForm } from "react-hook-form";
import { RegisterFormData } from "../tying";
import { useMutation, useQueryClient } from "react-query";
import * as apiCLient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Register() {
  const queryClient = useQueryClient();
  const naviagte = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const mutation = useMutation(apiCLient.registerApi, {
    onSuccess: async () => {
      showToast({ message: "Registration successful!", type: "SUCESS" });
      await queryClient.invalidateQueries("validateToken");
      naviagte("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5 ">
        <label className="text-gray-700 text-sm font-bold flex-1 ">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is requierd" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is requierd" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your Password do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex  items-center justify-between">
        <span className="text-sm">
          Already Registered ?{" "}
          <Link className="underline" to={"/sign-in"}>
            Login
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-500 p-2 font-bold"
        >
          Create Account
        </button>
      </span>
    </form>
  );
}

export default Register;
