import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers/Wrappers";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  //console.log(data);
  //var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  //keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {/* {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))} */}
          <TableCell key="user_id_key">User ID</TableCell>
          <TableCell key="user_name_key">User Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ _id, name, user_id }) => (
          <TableRow key={_id}>
            <TableCell className="pl-3 fw-normal">{user_id}</TableCell>
            <TableCell>{name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
