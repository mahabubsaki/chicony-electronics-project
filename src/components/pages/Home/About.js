import React from 'react';
import { Circle, LayerGroup, MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

const About = () => {
    return (
        <div className="flex items-center flex-col sm:flex-row my-5">
            <div className="w-4/5 text-center sm:w-1/2 mx-auto">
                <h1 className="text-3xl">About Our Company</h1>
                <p className="my-3">We Are a established company in this area for last 3 years. We have currently a lot of customers and many of them are repeat customers. Below showen our company's roadmap through year.</p>
                <ul class="steps w-full">
                    <li class="step step-primary">Established on 2019</li>
                    <li class="step step-primary">Went online on 2020</li>
                    <li class="step step-primary">Reached whole country on 2021</li>
                    <li class="step">Became a international brand in 2023</li>
                </ul>
                <div>
                    <h1 className="text-center text-3xl">Company Address</h1>
                    <address>Rd No. 12, Dhanmondi Lake, Dhanmondi, Dhaka-1207, Bangladesh</address>
                </div>
            </div>
            <div className="w-full border-4 flex justify-center items-center sm:w-1/2">
                <MapContainer center={[23.75005494868502, 90.37491877181348]} zoom={15} style={{ height: '300px', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LayerGroup>
                        <Circle
                            center={[23.749623157201363, 90.37721997237244]}
                            pathOptions={{ color: 'green', fillColor: 'green' }}
                            radius={50}
                        />
                    </LayerGroup>
                    <Marker position={[23.749623157201363, 90.37721997237244]}>
                        <Tooltip>Chicony Electronics</Tooltip>
                    </Marker>
                </MapContainer>
            </div>

        </div >
    );
};

export default About;