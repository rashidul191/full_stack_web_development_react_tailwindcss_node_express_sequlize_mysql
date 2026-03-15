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
import LabeledSelected from "../../Components/LabeledSelected";

export default function ContentManageForm() {
  const { previewImage, handleImageChange } = useImagePreview();

  const navigator = useNavigate();
  // const { auth } = useContext(AuthContext);
  const { id } = useParams();

  // CRUD
  const { data: menus } = useApiHook("/admin/menu");
  const { createData, updateData } = useApiHook("/admin/content-manage"); // custom hook

  // Single data (edit)
  const { data: contentManage, loading } = useApiHook(
    id ? `/admin/content-manage/${id}` : null,
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
    if (contentManage) {
      reset(contentManage);
    }
  }, [contentManage, reset]);

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
      navigator("/admin/content-manage");
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
        title={`Content Manage ${id ? "Edit" : "Create"}`}
        backLink={"/admin/content-manage"}
      ></HeaderSection>

      <div className="shadow-lg p-4 rounded mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Submit + Button */}
          <div className="flex items-center justify-end text-sm">
            <SubmitBtn className="" value={`${id ? "Update" : "Publish"}`} />
          </div>

          <div className="w-full flex flex-wrap">
            <div className="w-full p-1">
              <img
                className="w-14 h-14 mb-2 object-cover rounded"
                src={previewImage?.image || imageUrl(contentManage?.image)}
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

            <LabeledSelected
              label="Select Menu"
              name="menu_id"
              register={register}
              required={true}
              className="w-full md:w-1/2 p-1"
            >
              <option value="" disabled>
                Select Menu
              </option>
              {menus?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </LabeledSelected>

            <LabeledInput
              name="title"
              required={true}
              register={register}
              errors={errors}
              className="w-full md:w-1/2 p-1"
            />

            <RichTextEditor
              label="Short Description"
              name="short_description"
              control={control}
              errors={errors}
              className="w-full p-1"
            ></RichTextEditor>
            <RichTextEditor
              label="Long Description"
              name="description"
              control={control}
              errors={errors}
              className="w-full p-1"
            ></RichTextEditor>

            <LabeledInput
              name="meta_title"
              register={register}
              errors={errors}
              className="w-full p-1"
            />

            <LabeledTextarea
              label="Meta Keywords (,)"
              name="meta_keywords"
              register={register}
              errors={errors}
              className="w-full md:w-1/2 p-1"
            />
            <LabeledTextarea
              name="meta_description"
              register={register}
              errors={errors}
              className="w-full md:w-1/2 p-1"
            />
          </div>

          {/* Submit + Button */}
          <div className="flex items-center justify-end text-sm">
            <SubmitBtn className="" value={`${id ? "Update" : "Publish"}`} />
          </div>
        </form>
      </div>
    </>
  );
}
