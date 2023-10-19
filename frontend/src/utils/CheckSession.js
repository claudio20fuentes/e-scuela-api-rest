import { backend_url } from "../config/variables";
import axios from 'axios';

export const checkSessionFront = async () => {
    try {
        await axios.get(backend_url + '/api/check-session', {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token'),
              cliente: localStorage.getItem('cliente'),
            }
          })
            .then(response => {
              if (response.data && response.data.status === 'OK') {
                console.log('sesion activa');
                return true;
              } else {
                console.log('sesion no activa');
                return false;
              }
            })
            .catch(error => {
              console.error('Error:', error);
                return false;
            });
    } catch (error) {
        return false;
    }
};