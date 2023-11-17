import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EmailChecked() {
    const [adminChecked, setAdminChecked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username
    console.log(username)

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("process.env.REACT_APP_API_BASE_URL/emailChecked", {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json', 
              'username': username
            },
          });

        const result = await response.json();
        if(result){
          navigate("/welcome");
        }
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


  