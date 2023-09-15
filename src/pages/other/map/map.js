import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // Make sure to install mapbox-gl

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const Map = () => {
    const mapContainerRef = useRef(null);

    // useEffect(() => {
    //     const map = new mapboxgl.Map({
    //         container: mapContainerRef.current,
    //         style: 'mapbox://styles/mapbox/streets-v11', // You can change the map style
    //         center: [0, 0], // Initial center of the map [longitude, latitude]
    //         zoom: 10, // Initial zoom level
    //     });

    //     // Clean up the map when the component unmounts
    //     return () => map.remove();
    // }, []);

    return (
        <div>
            {/* <div
                ref={mapContainerRef}
                style={{ width: '100%', height: '400px' }} // Adjust the size as needed
            /> */}
        </div>
    );
};

export default Map;
