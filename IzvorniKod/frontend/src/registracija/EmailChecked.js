import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from '../config';

function rename(role){
  if (role==="Istraživač"){
    return "explorer"
  } else if (role==="Tragač"){
    return "tracker"
  } else if (role==="Admin"){
    return "admin";
  } else if (role==="Voditelj postaje"){
    return "manager";
  }
}

function EmailChecked() {
    const [adminChecked, setAdminChecked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username
    const role = location.state.role
    console.log(username)

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/emailChecked`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json', 
              'username': username
            },
          });

        const result = await response.json();
        if(result===2){
          const newRole = rename(role);
          navigate(`/${newRole}`, { state: {username: username}})
        } if (result===0){
          alert("Odbijeni ste!");
          navigate("/registration")
        }
        setAdminChecked(result.adminChecked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate, username]); 

  useEffect(() => {
    if (adminChecked) {
      const newRole = rename(role);
      navigate(`/${newRole}`, { state: {username: username}})
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


  