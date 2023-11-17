import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Poruka() {
    const [emailChecked , setEmailChecked ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = "https://api.example.com/emailChecked"; 
        
        const fetchData = async () => {
          try {
            const response = await fetch(apiUrl, {
              method: 'GET', 
              headers: {
                'Content-Type': 'application/json', 
              },
            });
    
            const result = await response.json();
            setEmailChecked(result.emailChecked);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []); 

  useEffect(() => {
    if (emailChecked) {
      navigate("/emailChecked");
    }
  }, [emailChecked, navigate]);


    return(
        <div class='poruka'>
            Potvrdite registraciju na mail-u.
        </div>
    );
}

export default Poruka;
