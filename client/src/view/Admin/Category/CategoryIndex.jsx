import React, { useEffect, useState } from "react";
import toast from "../../../utility/toast";
import api from "../../../api/axios";
import HeaderSection from "../../Components/HeaderSection";
import Loading from "../../Common/Loading";
import CategoryTable from "./CategoryTable";

export default function CategoryIndex() {
  const [loding, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchDataFromApi = async () => {
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

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  if (loding) {
    return <Loading />;
  }
  return (
    <>
      <HeaderSection
        title={"Category List"}
        createLink={"/admin/category/create"}
      ></HeaderSection>

      <div>
        <CategoryTable categories={categories}></CategoryTable>
      </div>
    </>
  );
}
