import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from '../config';


function Poruka() {
    const [emailChecked , setEmailChecked ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username
    const role = location.state.role
    console.log(username)

    useEffect(() => { 
        
        const fetchData = async () => {
          try {
            const response = await fetch(`${BASE_URL}/waitEmail`, {
              method: 'GET', 
              headers: {
                'Content-Type': 'application/json', 
                'username': username
              },
            });
    
            const result = await response.json();
            console.log(result);
            if (result){
              console.log(result)
              navigate("/emailChecked", {state: {username: username, role: role}});
            }
            setEmailChecked(result.emailChecked);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [navigate, username]); 

  useEffect(() => {
    if (emailChecked) {
      navigate("/emailChecked", {state: {username: username, role: role}});
    }
  }, [emailChecked, navigate]);


    return(
        <div class='poruka'>
            Potvrdite registraciju na mail-u.
        </div>
    );
}

export default Poruka;
