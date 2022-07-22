import Card from "@mui/material/Card";
import sucursalTable from "layouts/billing/components/Table/data/sucursalTable";
import DataTable from "examples/Tables/DataTable";

function Table() {
  const { columns, rows } = sucursalTable();
  return (
    <Card id="delete-account">
      <DataTable
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
    </Card>
  );
}

export default Table;
