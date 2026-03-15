import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderSection from "../../Components/HeaderSection";
import { AuthContext } from "../../../context/AuthContext";
import LabeledInput from "../../Components/LabeledInput";
import SubmitBtn from "../../Components/SubmitBtn";
import LabeledTextarea from "../../Components/LabeledTextarea";
import { useApiHook, useImagePreview } from "../../../hook/customHook";
import Loading from "../../layouts/Shared/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { imageUrl } from "../../../utility/imageUrl";
import RichTextEditor from "../../Components/RichTextEditor";
import slugify from "slugify";

export default function StorieForm() {
  const { previewImage, handleImageChange } = useImagePreview();

  const navigator = useNavigate();
  // const { auth } = useContext(AuthContext);
  const { id } = useParams();

  // CRUD
  const { createData, updateData } = useApiHook("/admin/storie"); // custom hook

  // Single data (edit)
  const { data: storie, loading } = useApiHook(
    id ? `/admin/storie/${id}` : null,
  ); // custom hook

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
    if (storie) {
      reset(storie);
    }
  }, [storie, reset]);

  // ==========================
  // Submit
  // ==========================
  const onSubmit = async (data) => {
    // console.log(data);
    data.slug = slugify(data?.title, {
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
      navigator("/admin/storie");
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
        title={`Storie ${id ? "Edit" : "Create"}`}
        backLink={"/admin/storie"}
      ></HeaderSection>

      <div className="shadow-lg p-4 rounded mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-2/3 p-2">
              <LabeledInput
                name="title"
                required={true}
                register={register}
                errors={errors}
              />
              {/* <LabeledTextarea name="description" register={register} /> */}
              <RichTextEditor
                label="Description"
                name="description"
                control={control}
                errors={errors}
              ></RichTextEditor>
            </div>
            <div className="w-full md:w-1/3 p-2">
              <div>
                <img
                  className="w-14 h-14 mb-2 object-cover rounded"
                  src={previewImage?.image || imageUrl(storie?.image)}
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

              <LabeledTextarea
                name="short_description"
                register={register}
                errors={errors}
              />
            </div>
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
