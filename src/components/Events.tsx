import { IconButton } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../common";
import { BikeWeekEvent } from "../common";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getAllEvents } from "../api/events";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useState } from "react";
import ConfirmEventDelete from "./ConfirmEventDelete";

export const Events = () => {
  const auth = useAuth();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [activeRowId, setActiveRowId] = useState("");

  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery<BikeWeekEvent[], Error>(
    "events",
    () => {
      return getAllEvents(auth);
    }
  );

  const queryClient = useQueryClient();
  const deleteMutation = useMutation<void, Error, string>(
    async (data) => {
      await deleteEvent(auth, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
      },
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
      field: "eventDays",
      headerName: "Event Dates",
      valueFormatter: (params: GridValueFormatterParams<Date[]>) => {
        let retval = "";
        for (const d of params.value) {
          if (retval.length > 0) {
            retval += "\n";
          }
          retval += format(d, "MM/dd/yyyy");
        }
        return retval;
      },
      sortComparator: (v1: Date[], v2: Date[]) => {
        if (v1.length === 0) {
          return -1;
        }
        if (v2.length === 0) {
          return 1;
        }
        return v1[0].getTime() - v2[0].getTime();
      },
    },
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
          <IconButton
            onClick={() => {
              setShowDeleteConfirmation(true);
              setActiveRowId(params.row.id);
            }}
          >
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
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            sorting: { sortModel: [{ field: "createDate", sort: "desc" }] },
          }}
          getRowClassName={(params) => `event-row-${params.row.status}`}
        />
      </div>
      <ConfirmEventDelete
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={() => deleteMutation.mutate(activeRowId)}
      />
    </>
  );
};

export default Events;
