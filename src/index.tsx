import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";

import "./index.css";

import Layout from "./pages/layout/Layout";
import NoPage from "./pages/NoPage";
import Chat from "./pages/chat/Chat";
import { HomePage } from "./pages/home/Home";
import { fecthApi } from "./api"
import { store } from './store';
import { Provider } from 'react-redux';

initializeIcons();


export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [projectData, setProjectData] = useState("");
    const [latitude, setLatitude] = useState<number | null>(0);
    const [longitude, setLongitude] = useState<number | null>(0);

    const getProjectData = async () => {
        try {
            const response = await fecthApi("ui-content-data")
            setIsLoaded(true)
            setProjectData(response)
        }
        catch (error) {
            setIsLoaded(true)
            setProjectData("")
        }
    }
    useEffect(() => {
        if (!isLoaded) {
            getProjectData();
        }
    }, [isLoaded]);


    useEffect(() => {
        const hasPermission = localStorage.getItem("geolocationPermissionGranted");    
        if (hasPermission === null) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              localStorage.setItem("geolocationPermissionGranted", "true");
              localStorage.setItem("latitude", `${position.coords.latitude}`);
              localStorage.setItem("longitude", `${position.coords.longitude}`);
            },
            (error) => {
              console.error("Error getting location:", error.message);
            }
          );
        }
      }, []);


    return (
        <BrowserRouter>
            <Routes>
                {isLoaded && (
                    <Route path="/" element={<Layout projectData={projectData} />}>
                        <Route index element={<Chat projectData={projectData} />} />
                        <Route path="/home" element={<HomePage projectData={projectData} />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>)
                }
            </Routes>
        </BrowserRouter >
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
           
        <App />
       
        </Provider>
    </React.StrictMode>
);
