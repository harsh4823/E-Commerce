import React, { useEffect, useState } from 'react'

export const Location = () => {
    const [location, setLocation] = useState({
        country: "",
        state: "",
        city: "",
        street: "",
        pincode: "",
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                        const data  = await res.json();
                        
                        setLocation({
                            country: data.address.country || "",
                            state: data.address.state || "",
                            city: data.address.city || data.address.town || data.address.village || "",
                            street: data.address.residential || "",
                            pincode: data.address.postcode || "",
                        });

                        // const APIKEY = "7ed38ddce4aa43038786c06fab8e33c0";
                        // const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${APIKEY}&q=${encodeURIComponent(latitude + ',' + longitude)}`);
                        // const data = await res.json();

                        // setLocation({
                        //     country: data.results[0].components.country || "",
                        //     state: data.results[0].components.state || "",
                        //     city: data.results[0].components.city || "",
                        //     street: data.results[0].components.residential || "",
                        //     pincode: data.results[0].components.postcode || "",
                        // });

                    } catch (error) {
                        console.log("Error fetching location data : ", error);
                    }
                },
                (error) => {
                    console.log("Error geting location", error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    },[])
    
    return location;
};