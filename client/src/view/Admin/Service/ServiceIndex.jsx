import HeaderSection from "../../Components/HeaderSection";
import TableData from "../../../lib/TableData";
import { imageUrl } from "../../../utility/imageUrl";
import { Eye, PenBoxIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useApiHook } from "../../../hook/customHook";
import Loading from "../../layouts/Shared/Loading";

export default function ServiceIndex() {
  const { data: services, loading, deleteData } = useApiHook("/admin/service");

  const columns = [
    {
      name: "Image",
       width: "100px",
      cell: (row) => (
        <img className="w-10 h-10" src={imageUrl(row.image)} alt="" />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Content",
      selector: (row) =>
        row.content?.length > 50
          ? row.content.slice(0, 50) + "..."
          : row.content,
    },
    {
      name: "Action",
      width: "180px",
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
        title={"Service List"}
        createLink={"/admin/service/create"}
      ></HeaderSection>

      <div className="shadow">
        <TableData
          columns={columns}
          data={services?.sort((a, b) => b.id - a.id) || []}
          searchKeys={["name", "link"]}
        />
      </div>
    </>
  );
}
