import React from "react";
import { useForm } from "react-hook-form";
import LabeledInput from "../Components/LabeledInput";
import SubmitBtn from "../Components/SubmitBtn";
import { Link, Navigate } from "react-router-dom";
import ApplicationLogo from "../Components/ApplicationLogo";
import api from "../../api/axios";

const LoginAdmin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const storeData = {
      title: data.title,
      content: data.content,
    };
    await api.post(`/admin/login`, storeData).then((res) => {
      if (res.data.statusCode === 200) {
        <Navigate to="/admin/dashboard"></Navigate>;
      } else {
        alert(res.data.message);
      }
    });
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
              Admin Login
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
                  to="/admin/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition underline"
                >
                  Forgot your password?
                </Link>

                <SubmitBtn className="" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
