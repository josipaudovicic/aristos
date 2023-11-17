import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmailChecked() {
    const [adminChecked, setAdminChecked] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = "https://api.example.com/checkAdmin";
    
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json', 
            },
          });

        const result = await response.json();
        setAdminChecked(result.adminChecked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (adminChecked) {
      navigate("/welcome");
    }
  }, [adminChecked, navigate]);



    return(
        <div class='poruka'>
            Uspješna potvrda mail-a! <br/>
            Pričekajte da Vas administrator potvrdi.
        </div>
    );
}

export default EmailChecked;


  