import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


function Poruka() {
    const [emailChecked , setEmailChecked ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username
    console.log(username)

    useEffect(() => { 
        
        const fetchData = async () => {
          try {
            const response = await fetch("process.env.REACT_APP_API_BASE_URL/waitEmail", {
              method: 'GET', 
              headers: {
                'Content-Type': 'application/json', 
                'username': username
              },
            });
    
            const result = await response.json();
            console.log(result)
            if (result){
              console.log(result)
              navigate("process.env.REACT_APP_API_BASE_URL/emailChecked", {state: {username: username}});
            }
            setEmailChecked(result.emailChecked);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []); 

  useEffect(() => {
    if (emailChecked) {
      navigate("process.env.REACT_APP_API_BASE_URL/emailChecked");
    }
  }, [emailChecked, navigate]);


    return(
        <div class='poruka'>
            Potvrdite registraciju na mail-u.
        </div>
    );
}

export default Poruka;
