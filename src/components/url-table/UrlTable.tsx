import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import DeleteForever from "@mui/icons-material/DeleteForever";
import { UrlTableProps } from "./types";
 
export const UrlTable = ({ urls, deleteUrl }: UrlTableProps) => {
  const openUrl = (url: string) => {
    try {
      chrome.tabs.create({url: url, active: false});
    } catch (ignore) {
    }
  };

  return (
    <TableContainer sx={{ maxHeight: 300, width: 700, mt: 1 }}>
      <Table sx={{ border: "2px solid primary" }} stickyHeader size="small">
        <TableBody>
          {urls.map((url, index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontWeight: "bold", width: 0 }} align="left" onClick={() => openUrl(url.url)}>{url.alias}</TableCell>
              <TableCell align="left" onClick={() => openUrl(url.url)}>{url.url}</TableCell>
              <TableCell align="right">
                <DeleteForever color="primary" onClick={() => deleteUrl(url.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
