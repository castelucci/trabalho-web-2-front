import api from "./services/api"

export async function estaAutenticado () {
  return await api.get('estaautenticado',{headers: {Authorization: 'Bearer '+localStorage.getItem('token')}}).then(
    (response) => {return true}).catch(function(error) {return false})
 }