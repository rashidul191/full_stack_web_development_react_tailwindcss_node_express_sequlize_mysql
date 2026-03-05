import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import LabeledInput from "../Components/LabeledInput";
import SubmitBtn from "../Components/SubmitBtn";
import { Link, Navigate } from "react-router-dom";
import ApplicationLogo from "../Components/ApplicationLogo";
import { URL } from "../../config/app";
import toast from "../../utility/toast";

const LoginUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${URL}/login`, data);
      //  axios.post(`${URL}/login`, data.then(res) => console.log(res.data));
      if (res.status === 200) {
        const token = res.data.data;
        localStorage.setItem("access-token", token);
        toast.success(res.data.message);
        // navigate("/"); // home
        <Navigate to="/user/dashboard"></Navigate>;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <ApplicationLogo className={"h-32"} />

          {/* Card */}
          <div className="bg-white shadow-lg rounded-lg px-6 py-8">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5">
              Login
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <LabeledInput
                type="email"
                name="email"
                required={true}
                register={register}
                errors={errors}
              />

              <LabeledInput
                type="password"
                name="password"
                required={true}
                register={register}
                errors={errors}
              />

              {/* Forgot + Button */}
              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition underline"
                >
                  Forgot your password?
                </Link>

                <SubmitBtn className="" value="Login" />
              </div>
            </form>

            {/* Register */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;
