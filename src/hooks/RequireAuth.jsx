import { Fragment, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';

export const RequireAuth = ({ element }) => {
  const { token, setToken, setRefresh } = useStateContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // useEffect(() => {
  //   if (localStorage.getItem("mutumCustomer") && localStorage.getItem("tsaroCustomer")) {
  //     setEmail(decryptString(localStorage.getItem("mutumCustomer"), 25))
  //     setPassword(decryptString(localStorage.getItem("tsaroCustomer"), 25))
  //   }
  // }, [])



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
  // function decryptString(encryptedText, shift) {
  //   if (!Number.isInteger(shift) || shift < 1 || shift > 25) {
  //     throw new Error("Shift must be an integer between 1 and 25.");
  //   }

  //   const decryptedArray = [];
  //   for (let i = 0; i < encryptedText.length; i++) {
  //     let charCode = encryptedText.charCodeAt(i);

  //     // Decrypt uppercase letters
  //     if (charCode >= 65 && charCode <= 90) {
  //       charCode = ((charCode - 65 - shift + 26) % 26) + 65;
  //     }
  //     // Decrypt lowercase letters
  //     else if (charCode >= 97 && charCode <= 122) {
  //       charCode = ((charCode - 97 - shift + 26) % 26) + 97;
  //     }

  //     decryptedArray.push(String.fromCharCode(charCode));
  //   }

  //   return decryptedArray.join("");
  // }

  
  // const refreshToken = () => {
  //   toast.dismiss(); // Close all previous toasts
   

  //   const payload = {
  //     email,
  //     password,
  //   };
  
  //   if (getStoredTimeDifferenceInSeconds() < 900) {
  //     axiosClient.post('token/customer/', payload)
  //       .then(({ data }) => {
  //         setToken(data.access);
  //         setRefresh(data.refresh);
  //         navigate(-1);
  //         localStorage.removeItem('refreshTimeCustomer');
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } else {
  //     toast.warning("Impossible de prolonger la session !\nVous avez dépassé 15 minutes avant de prolonger.");
  //   }
  // };

  // useEffect(() => {
  //   const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
  
  //   if (tokenExpirationTime && new Date().getTime() > tokenExpirationTime) {
  //     setToken(null);
  //     localStorage.removeItem('tokenExpirationTime');
  //     storeActualTime();
  
  //     toast.warning("Session expiré !\nVotre session a expiré. Veuillez vous reconnecter.");
  //   }
  //   if (token) {
  //     const expirationTime = 60 ; // 2 hours in milliseconds
  //     const timeoutId = setTimeout(() => {
  //       setToken(null);
  //       localStorage.removeItem('tokenExpirationTime');
  //       storeActualTime();
  //       console.log('okkkkkkkkkkkkk yes')
  //     //   toast.success("Session expiré !\nVotre session a expiré. Veuillez vous reconnecter.", {
  //     //     position: toast.POSITION.TOP_CENTER,
  //     //     autoClose: 4000,
  //     // });
  //     if (window.confirm("Session expiré !\nVotre session a expiré. Veuillez vous reconnecter.")){
  //       refreshToken();
  //     }

  //     }, expirationTime*10);
  //     localStorage.setItem('tokenExpirationTime', new Date().getTime() + expirationTime);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [token, setToken, refreshToken]);
  

  if (!token) {
    return <Navigate to="/" replace />
  }

  return (
    <Fragment>
      {element}
      {/* <Button onClick={refreshToken}>Refresh Token</Button>
      <ToastContainer /> */}
    </Fragment>
  )
}

export default RequireAuth;