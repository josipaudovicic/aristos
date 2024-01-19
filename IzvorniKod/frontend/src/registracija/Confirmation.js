import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from '../config';

function Confirmation() {
    const location = useLocation();
    const navigate = useNavigate();

  useEffect(() => {
    
    const confirmEmail = async () => {

      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");

      if (!token) {
        console.error("Token is undefined");
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}/mail?token=${token}`, {
          method: "GET"
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Response:", data.username);

          navigate("/emailChecked", {state: {username: data.username, role: data.role}});
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    confirmEmail();
  }, [location.search, navigate]);

  return null;
}

export default Confirmation;
