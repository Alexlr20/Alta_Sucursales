/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */

import React from "react";


const ScheduleTable = React.memo(({data, column})=>{
    console.log('Tabla renderizada');
    console.log('data', data);
    console.log('column', column);
    // console.log('data in OrgTable -> ', data);
    // console.log('column in OrgTable -> ', column);

    return (
        <table className="org-table">
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
});

// function ScheduleTable({ data, column }) {
//     console.log('Tabla renderizada');
//     // console.log('data in OrgTable -> ', data);
//     // console.log('column in OrgTable -> ', column);

//     return (
//         <table className="org-table">
//             <thead>
//                 <tr>
//                     {column.map((item) => (
//                         <TableHeadItem item={item} />
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((item) => (
//                     <TableRow item={item} column={column} />
//                 ))}
//             </tbody>
//         </table>
//     );
// }

// const MemoizedScheduleTable = useMemo((data, column) =>  ScheduleTable(data, column));
// const MemoizedScheduleTable = React.memo(ScheduleTable);


  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

function TableHeadItem({ item }) {
    return <th>{item.heading}</th>;
}

function TableRow({ item, column }) {
    // console.log(item['hora_final']);
    return (
        <tr>
            {column.map((columnItem) => {
                if (columnItem.value.includes(".")) {
                    const itemSplit = columnItem.value.split(".");
                    return <td>{item[itemSplit[0]][itemSplit[1]]}</td>;
                }
                if (columnItem.value === 'hora_inicial' || columnItem.value === 'hora_final') {
                    return <td style={{ fontSize: "1rem" }}> {
                        tConvert(item[`${columnItem.value}`])
                    }
                </td>;
                }

                return <td style={{ fontSize: "1rem" }}>
                    {
                        item[`${columnItem.value}`]
                    }
                </td>;
            })}
        </tr>
    );
}

export default ScheduleTable;
