import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CustomDocumentTitleHandler: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        
        let title = "McLaren Dash"; 
        if (path.includes("/dashboard")) {
            title = "Dashboard";
        } else if (path.includes("/race-data")) {
            title = "Race Data";
        } else if (path.includes("/sandbox")) {
            title = "Sandbox";
        } else if (path.includes("/predictive-models")) {
            title = "Predictive Models";
        } else if (path.includes("/my-data")) {
            title = "My Data";
        } else if (path.includes("/login")) {
            title = "Login";
        } else {
            title = "McLaren Dash";
        }

        document.title = title;
    }, [location]);

    return null;
};

export default CustomDocumentTitleHandler;
