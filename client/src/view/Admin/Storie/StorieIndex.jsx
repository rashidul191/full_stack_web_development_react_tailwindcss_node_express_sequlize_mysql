import HeaderSection from "../../Components/HeaderSection";
import TableData from "../../../lib/TableData";
import { imageUrl } from "../../../utility/imageUrl";
import { Eye, PenBoxIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useApiHook } from "../../../hook/customHook";
import Loading from "../../layouts/Shared/Loading";

export default function StorieIndex() {
  const { data: stories, loading, deleteData } = useApiHook("/admin/Storie");
  const columns = [
    {
      name: "Image",
      width: "90px",
      cell: (row) => (
        <img className="w-10 h-8" src={imageUrl(row.image)} alt="" />
      ),
    },
    {
      name: "Title",
      selector: (row) =>
        row.title.length > 20 ? row.title.slice(0, 20) + "..." : row.title,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) =>
        row.slug.length > 20 ? row.slug.slice(0, 20) + "..." : row.slug,
    },
    {
      name: "Short Description",
      selector: (row) =>
        row.short_description.length > 50
          ? row.short_description.slice(0, 50) + "..."
          : row.short_description,
    },
    {
      name: "Action",
      width: "150px",
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          {/* <Link to={`show/${row.id}`}>
            <Eye className="size-5 cursor-pointer transition-all duration-200 hover:scale-110" />
          </Link> */}
          <Link to={`edit/${row.id}`}>
            <PenBoxIcon className="size-5 cursor-pointer transition-all duration-200 hover:scale-110" />
          </Link>

          <Trash2
            className="size-5 cursor-pointer transition-all duration-200 hover:scale-110"
            onClick={() => deleteData(row.id)}
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <HeaderSection
        title={"Storie List"}
        createLink={"/admin/storie/create"}
      ></HeaderSection>

      <div className="shadow">
        <TableData
          columns={columns}
          data={stories || []}
          searchKeys={["title", "slug"]}
        />
      </div>
    </>
  );
}
