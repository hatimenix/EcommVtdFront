import { Fragment, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';

export const RequireAuth = ({ element }) => {
  const { token, setToken, setRefresh } = useStateContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (localStorage.getItem("mutumCustomer") && localStorage.getItem("tsaroCustomer")) {
      setEmail(decryptString(localStorage.getItem("mutumCustomer"), 25))
      setPassword(decryptString(localStorage.getItem("tsaroCustomer"), 25))
    }
  }, [])



  //store actual time in second
  function storeActualTime() {
    const currentTime = new Date();
    const storedTime = currentTime.toISOString(); // Convert to ISO date-time format
    localStorage.setItem('refreshTimeCustomer', storedTime);
  }


  //check refresh expiration
  function getStoredTimeDifferenceInSeconds() {
    const storedTime = localStorage.getItem('refreshTimeCustomer');

    if (!storedTime) {
      console.log('No stored time found.');
      return null;
    }

    const currentTime = new Date();
    const storedTimeObject = new Date(storedTime);
    const timeDifferenceInSeconds = Math.floor((currentTime - storedTimeObject) / 1000);

    return timeDifferenceInSeconds;
  }




  //decryption function
  function decryptString(encryptedText, shift) {
    if (!Number.isInteger(shift) || shift < 1 || shift > 25) {
      throw new Error("Shift must be an integer between 1 and 25.");
    }

    const decryptedArray = [];
    for (let i = 0; i < encryptedText.length; i++) {
      let charCode = encryptedText.charCodeAt(i);

      // Decrypt uppercase letters
      if (charCode >= 65 && charCode <= 90) {
        charCode = ((charCode - 65 - shift + 26) % 26) + 65;
      }
      // Decrypt lowercase letters
      else if (charCode >= 97 && charCode <= 122) {
        charCode = ((charCode - 97 - shift + 26) % 26) + 97;
      }

      decryptedArray.push(String.fromCharCode(charCode));
    }

    return decryptedArray.join("");
  }

  const refreshToken = () => {

    const payload = {
      email,
      password,
    }
    // console.log('here is the time diffrence', getStoredTimeDifferenceInSeconds())

    //refresh time inferieur à 15 minutes
    if (getStoredTimeDifferenceInSeconds() < 900) {
      axiosClient.post('token/customer/', payload)
        .then(({ data }) => {
          // console.log("token dataaaaaaa", data)
          setToken(data.access)
          setRefresh(data.refresh)
          navigate(-1)
          //withdraw the stored refresh time
          localStorage.removeItem('refreshTimeCustomer');

        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      <span>lol</span>
      
    }
  }

  useEffect(() => {
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');

    if (tokenExpirationTime && new Date().getTime() > tokenExpirationTime) {
      // Token has expired, remove it from state and localStorage
      setToken(null)
      localStorage.removeItem('tokenExpirationTime');

      //stocker le refresh time
      storeActualTime()

    } else if (token) {
      // Set timeout to remove token when expiration time is reached
      const expirationTime = 60 * 60 * 2000; // 2Hours in milliseconds
      // const expirationTime = 5 * 1000; // 5s in milliseconds
      const timeoutId = setTimeout(() => {
        setToken(null);
        localStorage.removeItem('tokenExpirationTime');


        //stocker le refresh time
        storeActualTime()


      }, expirationTime);
      localStorage.setItem('tokenExpirationTime', new Date().getTime() + expirationTime);
      return () => clearTimeout(timeoutId);
    }
  }, [token, setToken, refreshToken]);

  

  if (!token) {
    return <Navigate to="/" replace />
  }

  return (
    <Fragment>
      {element}
    </Fragment>
  )
}

export default RequireAuth;