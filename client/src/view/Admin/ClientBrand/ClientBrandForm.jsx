import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderSection from "../../Components/HeaderSection";
import { AuthContext } from "../../../context/AuthContext";
import LabeledInput from "../../Components/LabeledInput";
import SubmitBtn from "../../Components/SubmitBtn";
import { useNavigate, useParams } from "react-router-dom";
import { imageUrl } from "../../../utility/imageUrl";
import { useApiHook, useImagePreview } from "../../../hook/customHook";
import Loading from "../../layouts/Shared/Loading";

export default function ClientBrandForm() {
  const { previewImage, handleImageChange } = useImagePreview();

  const navigator = useNavigate();
  // const { auth } = useContext(AuthContext);
  const { id } = useParams();

  // CRUD
  const { createData, updateData } = useApiHook("/admin/client-brand");

  // Single data (edit)
  const { data: clientBrand, loading } = useApiHook(
    id ? `/admin/client-brand/${id}` : null,
  );

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // ==========================
  // Load single data in form
  // ==========================
  useEffect(() => {
    if (clientBrand) {
      reset(clientBrand);
    }
  }, [clientBrand, reset]);

  // ==========================
  // Submit
  // ==========================
  const onSubmit = async (data) => {
    let res;
    if (id) {
      res = await updateData(id, data, true); // true for image
    } else {
      res = await createData(data, true); // true for image
    }

    if (res) {
      navigator("/admin/client-brand");
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
        title={`Client Brand ${id ? "Edit" : "Create"}`}
        backLink={"/admin/client-brand"}
      />

      <div className="shadow-lg p-4 rounded mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-wrap">
            {/* IMAGE */}
            <div className="w-full p-1">
              <img
                className="w-14 h-14 mb-2 object-cover rounded"
                src={previewImage?.image || imageUrl(clientBrand?.image)}
                alt=""
              />

              <LabeledInput
                label="Image (170x170px)"
                type="file"
                name="image"
                onChange={handleImageChange}
                register={register}
                required={!id}
                errors={errors}
              />
            </div>
            <LabeledInput
              name="name"
              className="w-full md:w-1/2 p-1"
              register={register}
              errors={errors}
            />
            <LabeledInput
              name="link"
              className="w-full md:w-1/2 p-1"
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex justify-end mt-4">
            <SubmitBtn value={id ? "Update" : "Publish"} />
          </div>
        </form>
      </div>
    </>
  );
}
