import { IconButton } from "@mui/material";
import { useQuery } from "react-query";
import { useAuth } from "../common";
import { BikeWeekEvent } from "../common";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../api/events";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useState } from "react";
import EventDelete from "./EventDelete";

export const Events = () => {
  const auth = useAuth();
  const [showDelete, setShowDelete] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery<BikeWeekEvent[], Error>(
    "events",
    () => {
      return getAllEvents(auth);
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const onModifyClicked = (id: number) => {
    navigate(`/events/${id}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "status", headerName: "Status" },
    {
      field: "createDate",
      headerName: "Date Submitted",
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return format(params.value, "MM/dd/yyyy");
      },
    },
    {
      field: "buttons",
      headerName: "Ops",
      renderCell: (params: GridRenderCellParams<BikeWeekEvent>) => (
        <>
          <IconButton onClick={() => onModifyClicked(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => setShowDelete(params.row.id)}>
            <DeleteForever />
          </IconButton>
        </>
      ),
    },
  ];
  if (!data) {
    throw new Error("data should always exist");
  }

  return (
    <>
      <h2>Events</h2>
      <div
        style={{
          width: "100%",
          height: 800,
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </div>
      <EventDelete id={showDelete} onClose={() => setShowDelete(undefined)} />
    </>
  );
};

export default Events;
