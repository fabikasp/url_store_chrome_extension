import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForever from "@mui/icons-material/DeleteForever";
import { UrlTableProps } from "./types";
 
export const UrlTable = ({ urls, deleteUrl }: UrlTableProps) => {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    border: "2px solid",
    borderColor: theme.palette.primary.main
  }));

  const StyledTableHeadColumn = styled(TableCell)(({ theme }) => ({
    borderBottom: urls.length == 0 ? "0px" : "2px solid",
    borderColor: theme.palette.primary.main
  }));

  return (
    <StyledPaper sx={{ width: "40%", mt: "1%" }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table sx={{ border: "2px solid primary" }} stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledTableHeadColumn sx={{ fontSize: "90%", fontWeight: "bold" }} align="left">URL</StyledTableHeadColumn>
              <StyledTableHeadColumn align="right"></StyledTableHeadColumn>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url, index) => (
              <TableRow key={index}>
                <TableCell
                  scope="row"
                  onClick={() => window.open(url.url)}
                >{url.url}</TableCell>
                <TableCell align="right">
                  <DeleteForever sx={{ mt: 0.5 }} color="primary" onClick={() => deleteUrl(url.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};
