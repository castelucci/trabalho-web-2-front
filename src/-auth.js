/*import api from "./services/api"

export const estaAutenticado = async () => {
   return await api.get('estaautenticado',{headers: {Authorization: 'Bearer '+localStorage.getItem('token')}}).then(
     (response) => {return true}).catch(function(error) {return false})
}*/

export const estaAutenticado = async () => false