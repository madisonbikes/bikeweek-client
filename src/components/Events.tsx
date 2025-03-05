import { IconButton } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../common";
import { BikeWeekEvent } from "../api/contract/types";
import { useNavigate } from "react-router-dom";
import events from "../api/events";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowClassNameParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useState } from "react";
import { ConfirmEventDelete } from "./ConfirmEventDelete";

export const Events = () => {
  const auth = useAuth();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [activeRowId, setActiveRowId] = useState(0);

  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["events"],
    queryFn: () => {
      return events.getAllEvents(auth);
    },
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await events.deleteEvent(auth, id);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onModifyClicked = async (id: number) => {
    return navigate(`/events/${id}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "status", headerName: "Status" },
    {
      field: "eventDays",
      headerName: "Event Dates",
      valueFormatter: (value: Date[]) => {
        let retval = "";
        for (const d of value) {
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
      valueFormatter: (value: Date) => {
        return format(value, "MM/dd/yyyy");
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
          getRowClassName={(params: GridRowClassNameParams<BikeWeekEvent>) =>
            `event-row-${params.row.status}`
          }
        />
      </div>
      <ConfirmEventDelete
        open={showDeleteConfirmation}
        onClose={() => {
          setShowDeleteConfirmation(false);
        }}
        onConfirm={() => {
          deleteMutation.mutate(activeRowId);
        }}
      />
    </>
  );
};
