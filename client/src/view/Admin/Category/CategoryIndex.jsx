import React, { useEffect, useState } from "react";
import toast from "../../../utility/toast";
import api from "../../../api/axios";
import HeaderSection from "../../Components/HeaderSection";
import Loading from "../../Common/Loading";
import { imageUrl } from "../../../utility/imageUrl";

export default function CategoryIndex() {
  const [loding, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/admin/category`);

      if (res?.data?.status === "success") {
        setCategories(res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  if (loding) {
    return <Loading />;
  }

  return (
    <>
      <HeaderSection
        title={"Category List"}
        createLink={"/admin/category/create"}
      ></HeaderSection>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.sort().map((category, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="w-10 h-10"
                    src={imageUrl(category?.image)}
                    alt=""
                  />
                </td>
                <td>{category?.name ?? "-"}</td>
                <td>{category?.slug ?? "-"}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
