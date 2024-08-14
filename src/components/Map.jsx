import { useNavigate } from "react-router-dom";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../conext/CitiesContext";
import { useGeolocation } from "../Hooks/useGeoloacation";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [maPosition, setmaPosition] = useState([40, 0]);
console.log(cities);

  // Hooks

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [maplat, maplng] = useUrlPosition();
  useEffect(
    function () {
      if (maplat && maplng) setmaPosition([maplat, maplng]);
    },
    [maplat, maplng]
  );
  useEffect(
    function () {
      if (geoLocationPosition)
        setmaPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button>
      )}
      <MapContainer
        // center={maPosition}
        center={maPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={maPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
