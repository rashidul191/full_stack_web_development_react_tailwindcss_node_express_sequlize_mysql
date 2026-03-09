import React, { useEffect, useState } from "react";
import { imageUrl } from "../../../utility/imageUrl";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function CategoryTable(props) {
  const data = props.categories;

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    const result = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.slug.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredData(result);
  }, [search, data]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img className="w-10 h-10" src={imageUrl(row.image)} alt="" />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div>
          <Link to={`edit/${row.id}`}>Edit</Link>
          <button onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        // expandableRows
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search here..."
            className="input input-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        serial
        actions={<button>Export</button>}
      ></DataTable>
    </>
  );
}
