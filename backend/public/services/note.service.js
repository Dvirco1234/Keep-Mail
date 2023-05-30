
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'



export const noteService = {
    query,
    getById,
    save,
    remove,
    getEmptyNote,
    addNoteMsg
}
window.cs = noteService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('note', filterBy)
}
function getById(noteId) {
    return httpService.get(`note/${noteId}`)
}

async function remove(noteId) {
    return httpService.delete(`note/${noteId}`)
}
async function save(note) {
    var savedNote
    if (note._id) {
        savedNote = await httpService.put(`note/${note._id}`, note)

    } else {
        savedNote = await httpService.post('note', note)
    }
    return savedNote
}

async function addNoteMsg(noteId, txt) {
    const savedMsg = await httpService.post(`note/${noteId}/msg`, {txt})
    return savedMsg
}


function getEmptyNote() {
    return {
        // vendor: 'Susita-' + (Date.now() % 1000),
        // price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





