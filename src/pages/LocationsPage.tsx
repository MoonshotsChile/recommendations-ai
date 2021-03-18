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
        height: '70vh'
    };


    useEffect(() => {
        let allLocations: Benefit[]

        useCase.list('?latitude_ne=null')
            .then(response => response.json())
            .then((benefits: Benefit[]) => {
                // @ts-ignore
                setNearestPlaces(benefitsDecorator(benefits))
            })

        const onSuccess = (geolocation: { coords: GeolocationCoordinates, timestamp: number }) => {
            const location: Coord = {
                latitude: geolocation.coords.latitude,
                longitude: geolocation.coords.longitude
            }
            saveContext({location});
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

    const onLoad = React.useCallback(function callback(map) {
        // @ts-ignore
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const showBenefitCard = (benefit: Benefit) => {
        // @ts-ignore
        setBenefit(benefit)
    }

    return (
        <>
            <Navbar selected={NAVBAR_ACTIONS.locations}/>
            <section>
                {isLoaded && <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={14}
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
                </GoogleMap>}
                {benefit && (
                    <div className="modal-card">
                        <div className="modal-card-body">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img src={benefit.covers[0]}
                                             alt="Placeholder image"/>
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">{benefit.title}</p>
                                    <p className="subtitle is-6">{benefit.category}</p>
                                </div>
                            </div>

                            <div className="content" dangerouslySetInnerHTML={{__html: benefit.description}} />
                            <div className="content" dangerouslySetInnerHTML={{__html: benefit.conditions}} />
                        </div>
                    </div>)}
            </section>
        </>
    )
};

export default LocationsPage;
