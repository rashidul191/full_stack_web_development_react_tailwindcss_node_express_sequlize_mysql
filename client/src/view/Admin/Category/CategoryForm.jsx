import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import HeaderSection from "../../Components/HeaderSection";
import { AuthContext } from "../../../context/AuthContext";
import toast from "../../../utility/toast";
import api from "../../../api/axios";
import LabeledInput from "../../Components/LabeledInput";
import SubmitBtn from "../../Components/SubmitBtn";
import LabeledTextarea from "../../Components/LabeledTextarea";
import useImagePreview from "../../../utility/useImagePreview";
import { createFormDataWithFile } from "../../../utility/formDataHelper";
import { useNavigate } from "react-router-dom";

export default function CategoryForm() {
  const { previewImage, handleImageChange } = useImagePreview(); // image preview custom hook
  const navigator = useNavigate();
  const { auth } = useContext(AuthContext);
  const id = false;
  console.log(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    // create slug
    const slug = data.name.toLowerCase().replace(/\s+/g, "-");
    data.slug = slug;
    const formData = createFormDataWithFile(data);
    try {
      const res = await api.post(`/admin/category`, formData);
      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
        navigator("/admin/category");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      <HeaderSection
        title={`Category ${id ? "Edit" : "Create"}`}
        backLink={"/admin/category"}
      ></HeaderSection>

      <div className="shadow-lg p-4 rounded mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="w-full flex flex-wrap">
            <div className="w-full p-1">
              {previewImage.image ? (
                <img className="w-12 h-12" src={previewImage.image} alt="" />
              ) : (
                ""
              )}

              <LabeledInput
                type="file"
                name="image"
                onChange={handleImageChange}
                register={register}
                errors={errors}
              />
            </div>
            <LabeledInput
              name="name"
              className="w-full p-1"
              required={true}
              register={register}
              errors={errors}
            />
          </div>

          {/* Forgot + Button */}
          <div className="flex items-center justify-end text-sm">
            <SubmitBtn className="" value={`${id ? "Update" : "Publish"}`} />
          </div>
        </form>
      </div>
    </>
  );
}
