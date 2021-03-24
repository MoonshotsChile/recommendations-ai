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
import { UserdataUseCase } from "../domain/UserdataUseCase";
import { dataLayerPush } from "../config/analytics";


const LocationsPage = (): JSX.Element => {

    const lastCardRef = useRef(null)
    const userdataUseCase = new UserdataUseCase()

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBq68YKL3kEk-LYRpksaOYmyntKvYXZ-LM"
    })

    const useCase = new BenefitsUseCase()

    const [map, setMap] = useState(null)
    const {location, saveContext, rut} = useContext(ContextApi)
    const { userdata } = useContext(ContextApi)
    // @ts-ignore
    const [center, setCenter] = useState({lat: parseFloat(location?.latitude), lng: parseFloat(location?.longitude)})
    const [benefit, setBenefit] = useState<Benefit>()
    const [zoom, setZoom] = useState(12)
    const [nearestPlaces, setNearestPlaces] = useState([])

    const containerStyle = {
        width: '100%',
        height: '90vh'
    };


    useEffect(() => {
        initLocation()
    }, [])

    const initLocation = () => {
        const onSuccess = (geolocation: { coords: GeolocationCoordinates, timestamp: number }) => {
            const location: Coord = {
                latitude: geolocation.coords.latitude,
                longitude: geolocation.coords.longitude
            }
            saveContext({location})
            const center = {
                lat: location?.latitude,
                lng: location?.longitude
            }
            setCenter(center);
            setTimeout(() => {
                setZoom(11)
                initLocation()
            }, 3000)
        }
        const onError = (error: any) => {
            console.error(error)
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

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
        console.log('unmount', map);
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

    const saveLater = () => {
        if (userdata && benefit) {
            const later = [...userdata.later, ...[benefit]]
            userdata.later = later
            saveContext({userdata})
            userdataUseCase.later(rut!, later)
        }
    }

    const saveLike = () => {
        if (userdata && benefit) {
            const likes = [...userdata.likes, ...[benefit]]
            userdata.likes = likes
            saveContext({userdata})
            userdataUseCase.like(rut!, likes)
        }
    }

    const saveNotLike = () => {
        if (userdata && benefit) {
            const later = [...userdata.later, ...[benefit]]
            userdata.later = later
            saveContext({userdata})
            userdataUseCase.notLike(rut!, later)
        }
    }

    function onSwipe(direction: string) {
        switch (direction) {
            case 'right':
                dataLayerPush({
                    event: 'reaction',
                    eventProps: {
                        category: 'locations',
                        action: 'swipe',
                        label: 'like',
                        value: benefit
                    }
                })
                // @ts-ignore
                saveLike()
                break
            case 'left':
                dataLayerPush({
                    event: 'reaction',
                    eventProps: {
                        category: 'locations',
                        action: 'swipe',
                        label: 'not-like',
                        value: benefit
                    }
                })
                saveNotLike()
                break
            case 'down':
                dataLayerPush({
                    event: 'reaction',
                    eventProps: {
                        category: 'locations',
                        action: 'swipe',
                        label: 'later',
                        value: benefit
                    }
                })
                saveLater()
                break
        }
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
                        onSwipe={onSwipe}
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
