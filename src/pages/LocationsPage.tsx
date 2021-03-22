import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { ContextApi, Coord, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import { Benefit, benefitsDecorator } from "../domain/entity/Benefit";
import { mapMarkerGoogle } from "../assets";


const LocationsPage = (): JSX.Element => {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBq68YKL3kEk-LYRpksaOYmyntKvYXZ-LM"
    })

    const useCase = new BenefitsUseCase()

    const [map, setMap] = useState(null)
    const {location, saveContext} = useContext(ContextApi)
    const [center, setCenter] = useState({lat: location?.latitude, lng: location?.longitude})
    const [benefit, setBenefit] = useState<Benefit>()
    const [nearestPlaces, setNearestPlaces] = useState([])

    const containerStyle = {
        width: '100%',
        height: '90vh'
    };


    useEffect(() => {
        const onSuccess = (geolocation: { coords: GeolocationCoordinates, timestamp: number }) => {
            const location: Coord = {
                latitude: geolocation.coords.latitude,
                longitude: geolocation.coords.longitude
            }
            saveContext({location})
            setCenter({
                lat: location?.latitude,
                lng: location?.longitude
            });
        }
        const onError = (error: any) => {
            console.error(error)
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])

    useEffect(() => {
        useCase.list('?latitude_ne=null')
            .then(response => response.json())
            .then((benefits: Benefit[]) => {
                // @ts-ignore
                setNearestPlaces(benefitsDecorator(benefits))
            })
    }, [])

    const onLoad = React.useCallback(function callback(map) {
        // @ts-ignore
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        console.log('unmount');
    }, [])

    const showBenefitCard = (benefit: Benefit) => {
        setBenefit(benefit)
    }

    return (
        <div className="container">
            <Navbar selected={NAVBAR_ACTIONS.locations}/>
            <section className="locations">
                {isLoaded && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        {nearestPlaces.map((benefit: Benefit, i: number) => (
                            <Marker
                                key={`market${i}`}
                                icon={mapMarkerGoogle}
                                position={{lat: parseFloat(benefit.latitude), lng: parseFloat(benefit.longitude)}}
                                onClick={(me) => showBenefitCard(benefit)}
                            />
                        ))}
                        <Marker position={{lat: center?.lat, lng: center?.lng}}/>
                    </GoogleMap>)}
                {benefit && (
                    <div className="modal-card">
                        <div className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img
                                            src={benefit.covers[0]}
                                            alt="Placeholder image"
                                        />
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-6">{benefit.title}</p>
                                    <p className="subtitle is-6">{benefit.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </section>
        </div>
    )
};

export default LocationsPage;
