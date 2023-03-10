//where the api calls for the wrestlers resource will live

import apiUrl from '../apiConfig'
import axios from 'axios'

// READ index
export const getAllWrestlers = () =>{
    return axios (`${apiUrl}/wrestlers`)
}

//READ show
export const getOneWrestler = (id) =>{
    return axios (`${apiUrl}/wrestlers/${id}`)
}

//Create
export const createWrestler = (user, newWrestler) => {
    console.log('this is the user', user)
    console.log('this is the newWrestler', newWrestler)
    return axios({
        url: `${apiUrl}/wrestlers`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { wrestler: newWrestler }
    })
}

//Update
export const updateWrestler = (user, updatedWrestler) => {
    return axios({
        url: `${apiUrl}/wrestlers/${updatedWrestler.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { wrestler: updatedWrestler}
    })
}

// Delete (delete a wrestler)
export const removeWrestler = (user, wrestlerId) => {
    return axios({
        url: `${apiUrl}/wrestlers/${wrestlerId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}