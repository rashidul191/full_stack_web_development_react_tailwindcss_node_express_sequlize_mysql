import HeaderSection from "../../Components/HeaderSection";
import TableData from "../../../lib/TableData";
import { imageUrl } from "../../../utility/imageUrl";
import { Eye, PenBoxIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useApiHook } from "../../../hook/customHook";
import Loading from "../../layouts/Shared/Loading";
import { getCommonStatusName } from "../../../enum/commonStatus";

export default function SubMenuIndex() {
  const { data: menus, loading, deleteData } = useApiHook("/admin/menu");
  const subMenus = menus?.sort()?.filter((item) => item.parent_id !== null);

  console.log(subMenus);

  const columns = [
    {
      name: "Page Banner Image",
      width: "90px",
      cell: (row) => (
        <img className="w-10 h-8" src={imageUrl(row.banner_image)} alt="" />
      ),
    },
    {
      name: "Sub Menu Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Top Menu",
      selector: (row) => row.parent?.name ?? "--",
    },
    {
      name: "Serial",
      selector: (row) => row.serial,
    },
    {
      name: "Status",
      selector: (row) => getCommonStatusName[row.status],
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
        title={"Sub Menu List"}
        createLink={"create"}
      ></HeaderSection>

      <div className="shadow">
        <TableData
          columns={columns}
          data={subMenus || []}
          searchKeys={["title", "sub_title"]}
        />
      </div>
    </>
  );
}
