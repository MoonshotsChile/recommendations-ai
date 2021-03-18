import React from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useContext, useEffect, useState } from "react";
import { ContextApi, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";


const LocationsPage = (): JSX.Element => {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBq68YKL3kEk-LYRpksaOYmyntKvYXZ-LM"
    })

    const [map, setMap] = useState(null)
    const { location, saveContext } = useContext(ContextApi)
    const [ center, setCenter ] = useState({lat: location?.latitude, lng: location?.longitude})

    const containerStyle = {
        width: '100%',
        height: '80vh'
    };



    useEffect(() => {
        function onSuccess(coord: any) {
            console.log(coord)
            saveContext({ location: coord });
            setCenter({
                lat: location?.latitude,
                lng: location?.longitude
            });
        }

        function onError(error: any) {
            console.error(error)
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }, [])

    const onLoad = React.useCallback(function callback(map) {
        // @ts-ignore
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <>
            <Navbar selected={NAVBAR_ACTIONS.locations}/>
            <section>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={3}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            </section>
        </>
    ) : <></>
};

export default LocationsPage;
