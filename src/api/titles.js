import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /titles/:wrestlerId
export const createTitle = (wrestlerId, newTitle) => {
    return axios({
        url: `${apiUrl}/titles/${wrestlerId}`,
        method: 'POST',
        data: { title: newTitle }
    })
}

// UPDATE
// /titles/:wrestlerId/:titleId
export const updateTitle = (wrestlerId, user, updatedTitle) => {
    return axios({
        url: `${apiUrl}/titles/${wrestlerId}/${updatedTitle._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { title: updatedTitle }
    })
}
// DELETE
// /titles/:wrestlerId/:titleId
export const deleteTitle = (user, wrestlerId, titleId) => {
    return axios({
        url: `${apiUrl}/titles/${wrestlerId}/${titleId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}