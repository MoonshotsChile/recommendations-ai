import React, { useContext, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { ContextApi, Coord, NAVBAR_ACTIONS } from "../context-api/ContextApi";
import Navbar from "../components/navbar/Navbar";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import { Benefit, benefitsDecorator } from "../domain/entity/Benefit";
import { mapMarkerGoogle } from "../assets";
import TinderCard from "react-tinder-card";
import OfferCard from "../components/offer-card/OfferCard";
import TinderButtonNotLike from "../components/buttons/TinderButtonNotLike";
import TinderButtonLater from "../components/buttons/TinderButtonLater";
import TinderButtonLike from "../components/buttons/TinderButtonLike";


const LocationsPage = (): JSX.Element => {

    const lastCardRef = useRef(null)

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBq68YKL3kEk-LYRpksaOYmyntKvYXZ-LM"
    })

    const useCase = new BenefitsUseCase()

    const [map, setMap] = useState(null)
    const {location, saveContext} = useContext(ContextApi)
    const [center, setCenter] = useState({lat: location?.latitude, lng: location?.longitude})
    const [benefit, setBenefit] = useState<Benefit>()
    const [zoom, setZoom] = useState(12)
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
            setZoom(11)
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

    const onLike = () => {
        // @ts-ignore
        lastCardRef.current?.swipe('right')

    }

    const onNotLike = () => {
        // @ts-ignore
        lastCardRef.current?.swipe('left')
    }

    const onLater = () => {
        // @ts-ignore
        lastCardRef.current?.swipe('down')
    }

    return (
        <div className="container">
            <Navbar selected={NAVBAR_ACTIONS.locations}/>
            <section className="locations">
                {benefit && (
                    <TinderCard
                        ref={lastCardRef}
                        {...{className: 'tinder-cards__card', style: {'zIndex': 1}}}
                        key={benefit.id}
                        preventSwipe={['up']}
                        onCardLeftScreen={() => setBenefit(undefined)}
                    >
                        <OfferCard
                            benefit={benefit}
                        />
                    </TinderCard>
                )}
                {isLoaded && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
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
                    <div className='modal-card'>
                        <div className="card-footer hero-foot is-borderless">
                            <p className="card-footer-item cursor-pointer is-borderless">
                                <TinderButtonNotLike onClick={onNotLike}/>
                            </p>
                            <p className="card-footer-item cursor-pointer is-borderless">
                                <TinderButtonLater onClick={onLater}/>
                            </p>
                            <p className="card-footer-item cursor-pointer is-borderless">
                                <TinderButtonLike onClick={onLike}/>
                            </p>
                        </div>
                    </div>)}
            </section>
        </div>
    )
};

export default LocationsPage;
