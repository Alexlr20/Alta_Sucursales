// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

export default function Geocoding() {
  // const PUBLIC_GOOGLE_MAPS_API_KEY = "AIzaSyDRX0D21tjCpNmpABQp8bnfNyA99pscQrM ";
  const PUBLIC_GOOGLE_MAPS_API_KEY = "AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  return (
    <GoogleMap zoom={10} center={{ lat: 44, lng: -80 }} mapContainerClassName="map-container" />
  );
}
// function coordConvertion() {
//   const geocoder = new google.maps.Geocoder();
//   const address = "new york";

//   geocoder.geocode({ address }, (results, status) => {
//     if (status == google.maps.GeocoderStatus.OK) {
//       const latitude = results[0].geometry.location.lat();
//       const longitude = results[0].geometry.location.lng();

//       alert(`${latitude} ${longitude}`);
//     }
//   });
// }

// function iniciarMap() {
//   const coord = { lat: -34.5956145, lng: -58.4431949 };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 10,
//     center: coord,
//   });
//   const marker = new google.maps.Marker({
//     position: coord,
//     map,
//   });
// }
