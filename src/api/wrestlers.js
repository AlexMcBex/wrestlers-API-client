//where the api calls for the pets resource will live

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

//Update

//Delete