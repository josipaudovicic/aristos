import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS
import 'leaflet.heat';

const Map = () => {
    const location = useLocation();
    const actionName = location.state?.action.actionName || '';
    const username = location.state?.username || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/explorer/action/${actionName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        username: username,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log(data);

                const mapContainer = document.getElementById('map');
    
                if (mapContainer && !mapContainer._leaflet_id) {
                    const map = L.map(mapContainer, {
                        center: [45.1, 16.3],
                        zoom: 7,
                        
                    });
            
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                        maxZoom: 15,
                    }).addTo(map);

                    const markers = data.map((marker) => ({
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                        vehicleId: marker.vehicleId,
                    }));
            
                    const heatmapData = markers.map((marker) => [marker.latitude, marker.longitude, marker.vehicleId * 5]);

                    L.heatLayer(heatmapData, {
                        radius: 25
                    }).addTo(map);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [actionName, username]);

    return <div id="map" style={{ height: '150vh', width: '150vh' }} />;
};

const App = () => {
    return (
        <div className="App">
            <Map />
        </div>
    );
};

export default App;
