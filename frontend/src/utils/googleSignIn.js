import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { backend_url } from '../config/variables';

function loadGSI() {
  return new Promise((resolve) => {
    const element = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.src = 'https://accounts.google.com/gsi/client';
    js.async = true;
    js.defer = true;
    element.parentNode.insertBefore(js, element);
    js.onload = async () => {
      resolve(window.google);
    };
  });
}

function handleCallbackResponse(response, setUserData, navigation) {
  const userObjet = jwt_decode(response.credential);
  if (userObjet.email_verified) {
    // another if to login and get session
    axios
      .post(`${backend_url}/api/login-google`, userObjet)
      .then((res) => {
        localStorage.setItem('token', res.data.body.token);
        localStorage.setItem('successStatus', res.data.success);
        localStorage.setItem('cliente', false);
        localStorage.setItem('clientes', res.data.body.clientes);
        localStorage.setItem('permisos', res.data.body.permisos);
        navigation('/');
        setUserData();
      })
      .catch((err) => console.error(err));
    // localStorage.setItem('success', JSON.stringify(userObjet));
  }
}

async function initGSI(setUserData, navigation) {
  const google = await loadGSI();
  google.accounts.id.initialize({
    client_id:
      '692776861649-llvkcpjbohlusseejetlekq1l7f6i7ve.apps.googleusercontent.com',
    callback: (response) =>
      handleCallbackResponse(response, setUserData, navigation),
  });
  // check if its initialized
  google.accounts.id.renderButton(document.getElementById('sign-in-div'), {
    type: "standard", size: "large", theme: "filled_red", // width: "300" width breaks the button
  });
   
}

export default initGSI;
