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
            const response = await fetch("/waitEmail", {
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
              navigate("/emailChecked", {state: {username: username}});
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
