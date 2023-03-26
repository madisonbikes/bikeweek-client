import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CircleMarker, LatLngTuple } from "leaflet";
import { useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker as LeafletMarker,
  TileLayer,
} from "react-leaflet";

export type LocationType = LatLngTuple;

type Props = {
  open: boolean;

  initialLocation: LocationType;

  onConfirm: (location: LocationType) => void;
  onClose: () => void;
};

export const ChooseLocation = ({
  open,
  onClose,
  onConfirm,
  initialLocation,
}: Props) => {
  const [position, setPosition] = useState<LatLngTuple>(initialLocation);

  return (
    <Dialog
      open={open}
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Choose Location"}</DialogTitle>
      <DialogContent>
        <Map initialLocation={position} onLocation={setPosition} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onConfirm(position);
            onClose();
          }}
          autoFocus
        >
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

type MapProps = {
  initialLocation: LocationType;
  onLocation: (location: LocationType) => void;
};

const Map = ({ initialLocation, onLocation }: MapProps) => {
  return (
    <MapContainer
      center={initialLocation}
      zoom={17}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "500px", margin: "0 auto" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        onLocation={onLocation}
        initialLocation={initialLocation}
      />
    </MapContainer>
  );
};

const DraggableMarker = ({ onLocation, initialLocation }: MapProps) => {
  //const [draggable, setDraggable] = useState(false);

  const markerRef = useRef(null); // FIXME these typings are wrong but it works
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        // FIXME typings for useRef
        const marker = markerRef.current as CircleMarker | null;
        if (marker) {
          const ll = marker.getLatLng();
          onLocation([ll.lat, ll.lng]);
        }
      },
    }),
    [onLocation]
  );

  //const toggleDraggable = useCallback(() => {
  //  setDraggable((d) => !d);
  //}, []);
  /*
      
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
      */

  return (
    <LeafletMarker
      draggable={true}
      eventHandlers={eventHandlers}
      position={initialLocation}
      ref={markerRef}
    />
  );
};
