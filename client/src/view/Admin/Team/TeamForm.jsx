import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import HeaderSection from "../../Components/HeaderSection";
import { AuthContext } from "../../../context/AuthContext";
import LabeledInput from "../../Components/LabeledInput";
import SubmitBtn from "../../Components/SubmitBtn";
import { useApiHook, useImagePreview } from "../../../hook/customHook";
import Loading from "../../layouts/Shared/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { imageUrl } from "../../../utility/imageUrl";
import RichTextEditor from "../../Components/RichTextEditor";
import { CommonStatus } from "../../../enum/commonStatus";
import LabeledSelected from "../../Components/LabeledSelected";
import slugify from "slugify";

export default function TeamForm() {
  const { previewImage, handleImageChange } = useImagePreview();

  const navigator = useNavigate();
  // const { auth } = useContext(AuthContext);
  const { id } = useParams();

  // CRUD
  const { createData, updateData } = useApiHook("/admin/team"); // custom hook

  // Single data (edit)
  const { data: team, loading } = useApiHook(id ? `/admin/team/${id}` : null); // custom hook

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // ==========================
  // Load single data in form
  // ==========================
  useEffect(() => {
    if (team) {
      reset(team);
    }
  }, [team, reset]);

  // ==========================
  // Submit
  // ==========================
  const onSubmit = async (data) => {
    data.slug = slugify(data?.name, {
      lower: true,
      strict: true,
    });
    let res;
    if (id) {
      res = await updateData(id, data, true); // true for image
    } else {
      res = await createData(data, true); // true for image
    }

    if (res) {
      navigator("/admin/team");
    }
  };

  // ==========================
  // Loading
  // ==========================
  if (id && loading) {
    return <Loading />;
  }
  return (
    <>
      <HeaderSection
        title={`Team ${id ? "Edit" : "Create"}`}
        backLink={"/admin/team"}
      ></HeaderSection>

      <div className="shadow-lg p-4 rounded mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="w-full flex flex-wrap items-end">
            <div className="w-full md:w-1/2 p-1">
              <img
                className="w-14 h-14 mb-2 object-cover rounded"
                src={previewImage?.image || imageUrl(team?.image)}
                alt=""
              />
              <LabeledInput
                type="file"
                name="image"
                onChange={handleImageChange}
                required={!id}
                register={register}
                errors={errors}
              />
            </div>
            <LabeledInput
              className="w-full md:w-1/2 p-1"
              name="name"
              required={true}
              register={register}
              errors={errors}
            />
            <LabeledInput
              className="w-full md:w-1/2 p-1"
              name="designation"
              register={register}
              errors={errors}
            />

            <LabeledInput
              className="w-full md:w-1/2 p-1"
              name="serial"
              type="number"
              register={register}
              errors={errors}
            />

            <LabeledSelected
              name="status"
              register={register}
              errors={errors}
              className="w-full md:w-1/2 p-1"
            >
              {Object.entries(CommonStatus).map(([key, value]) => (
                <option
                  key={value}
                  value={value}
                  selected={value === CommonStatus.Active}
                >
                  {key}
                </option>
              ))}
            </LabeledSelected>

            {/* <LabeledInput
              className="w-full md:w-1/2 p-1"
              name="fb_link"
              register={register}
              errors={errors}
            /> */}
            {/* <LabeledInput
              className="w-full md:w-1/2 p-1"
              name="twitter_link"
              register={register}
              errors={errors}
            /> */}
            {/* <LabeledInput
              className="w-full md:w-1/2 p-1"
              name="instagram_link"
              register={register}
              errors={errors}
            /> */}
            {/* <LabeledInput
              className="w-full md:w-1/2 p-1"
              name="linkedin_link"
              register={register}
              errors={errors}
            /> */}
            {/* <LabeledInput
              className="w-full md:w-1/2 p-1"
              name="youtube_link"
              register={register}
              errors={errors}
            /> */}
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
