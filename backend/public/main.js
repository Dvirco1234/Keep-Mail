import { noteService } from './services/note.service.js'
import { userService } from './services/user.service.js'
import { utilService } from './services/util.service.js'

console.log('Simple driver to test some API calls')

window.onLoadNotes = onLoadNotes
window.onLoadUsers = onLoadUsers
window.onAddNote = onAddNote
window.onGetNoteById = onGetNoteById
window.onRemoveNote = onRemoveNote
window.onAddNoteMsg = onAddNoteMsg

async function onLoadNotes() {
    const notes = await noteService.query()
    render('Notes', notes)
}
async function onLoadUsers() {
    const users = await userService.query()
    render('Users', users)
}

async function onGetNoteById() {
    const id = prompt('Note id?')
    if (!id) return
    const note = await noteService.getById(id)
    render('Note', note)
}

async function onRemoveNote() {
    const id = prompt('Note id?')
    if (!id) return
    await noteService.remove(id)
    render('Removed Note')
}

async function onAddNote() {
    await userService.login({ username: 'muki', password: '123' })
    const savedNote = await noteService.save(noteService.getEmptyNote())
    render('Saved Note', savedNote)
}

async function onAddNoteMsg() {
    await userService.login({ username: 'muki', password: '123' })
    const id = prompt('Note id?')
    if (!id) return

    const savedMsg = await noteService.addNoteMsg(id, 'some msg')
    render('Saved Msg', savedMsg)
}

function render(title, mix = '') {
    console.log(title, mix)
    const output = utilService.prettyJSON(mix)
    document.querySelector('h2').innerText = title
    document.querySelector('pre').innerHTML = output
}

