import React from "react";

// import '../../../styles/Table.css';
// require('../../../styles/Table.css');

function Table({ data, column }) {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item) => (
            <TableHeadItem item={item} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow item={item} column={column} />
        ))}
      </tbody>
    </table>
  );
}

function TableHeadItem({ item }) {
  return <th>{item.heading}</th>;
}

function TableRow({ item, column }) {
  return (
    <tr>
      {column.map((columnItem) => {
        if (columnItem.value.includes(".")) {
          const itemSplit = columnItem.value.split(".");
          return <td>{item[itemSplit[0]][itemSplit[1]]}</td>;
        }

        return <td>{item[`${columnItem.value}`]}</td>;
      })}
    </tr>
  );
}

export default Table;
