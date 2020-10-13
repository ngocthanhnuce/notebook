import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Fuse from 'fuse.js';

const Admin = () => {
    const [notes, setNotes] = useState();
    const [listSearch, setListSearch] = useState([]);
    const [search, setSearch] = useState('');
    const [addNote, setAddNote] = useState('');
    const [addDetail, setAddDetail] = useState('');
    const [detail, setDetail] = useState();
    const [isSearch,setIsSearch] = useState('')

    const handleChange= (e) => {
        setSearch(e)
        if(e === ''){
            setNotes(listSearch)
            setIsSearch('')
        }
    }
    const handleAdd = (e) => {
        e.preventDefault();
        if (addNote) {
           listSearch.push({ id: uuidv4(), title: addNote, note: [] });        
            setNotes(listSearch)
            setAddNote('');         
        }
    }
    const onDetail = (detail) => {
        setDetail([detail])
        localStorage.setItem('id', detail.id)
    }
    
    const handleAddDetail = (e) => {
        if (addDetail) {
            e.push({ id: uuidv4(), titleDetail: addDetail, arrDetail: [] });
            setAddDetail('')
        }
    }
    const handleDelete = (idDelete) => {
        const arrDelete = notes.filter(item => item.id !== idDelete)
        setNotes(arrDelete);

        setListSearch(listSearch.filter(item => item.id !== idDelete))   
        setDetail('')
    }
    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearch(true)
        if (search !== '' && listSearch !== '') {
            setIsSearch(true)
            const options = {
                includeScore: true,
                keys: ['title']
            }
            const fuse = new Fuse(listSearch, options)
            const result = fuse.search(search);
            const listResult = [];
            listResult.push(result.map(el => el.item));
            setNotes(listResult[0]);
        }
        else {
            setNotes(listSearch);
            setIsSearch('')
        }
    }

    const deleteDetail = (listDetail, itemId) => {
        const lists = [...notes]
        const noteList = detail.map(list => list.note);
        const detailNote = noteList[0].filter(idx => idx.id !== listDetail.id);
        const arrSearch = [...listSearch];
        const arrDetailNote = noteList[0].filter(idx => idx.id !== listDetail.id);

        const arrDelete = lists.map(arrNote => {

            if (arrNote.id === itemId) {
                return { ...arrNote, note: detailNote }
            }
            return arrNote;
        })
        const newListSearch = arrSearch.map(arrNote => {

            if (arrNote.id === itemId) {
                return { ...arrNote, note: arrDetailNote }
            }
            return arrNote;
        })
        const newDetail = detail.map(el => {
            if (el.id === itemId) {
                return { ...el, note: detailNote }
            }
            return el;
        })
        setDetail(newDetail);
        setNotes(arrDelete)
        setListSearch(newListSearch)

    }

    return (
        <div className="admin">
            <div className="row">
                <div className="col-6">
                    <h3>All Note</h3>
                    <div className = "search">
                       <form onSubmit={handleSearch}>
                        <div className = "row-form">
                                <input type="text" className="form-control"  placeholder="Search..." value={search} onChange={e => handleChange(e.target.value)}/>
                                <button className="btn btn-primary" type="submit" >Search</button>
                            </div>
                       </form>
                    </div>
                    <div className="admin-add">
                        <form className = "form-group">
                            <input type="text" className="form-control" value = {addNote} onChange = {e => setAddNote(e.target.value)} placeholder="Add item..." />                
                            { isSearch ? <button type="button" style = {{display: "flex"}} disabled>Add Note</button> :  <button className="btn btn-primary" style = {{display: "flex"}} onClick = {handleAdd}>Add<i className="fas fa-address-card" style = {{paddingTop: "6%"}}></i></button>}
                        </form>
                    </div>
                    <div className = "col-6">
                        {notes ? notes.map((item, index) => (
                            <div key={index} className="col-12 add-note">
                                <div className="detail">
                                    <button style = {{marginLeft: "" ,width: "800%"}} className = "btn btn-primary" type = "button" onClick = {() => onDetail(item)}>{item.title}</button>                                  
                                    <button type="button" onClick={() => handleDelete(item.id)} className="delete"><i className="fas fa-trash-alt"></i></button>
                                </div>      
                            </div>
                        )) : ('')}
                    </div>
                </div>
                <div className="col-6">
                    <h3>My Note</h3>
                    {detail ? detail.map((items, index) => (
                        <div key={index}>
                            <div className="d-flex detail">
                                <div className="admin-add-detail">
                                    <input type="text" className="form-control" value = {addDetail} onChange = {e => setAddDetail(e.target.value)} placeholder="Add item..." />
                                    <button className="btn btn-primary" style = {{display: "flex", width: "60%"}} onClick = { () => handleAddDetail(items.note)}>Add Detail<i className="fas fa-address-card" style = {{paddingTop: "6%"}}></i></button>
                                </div>
                            </div>
                            <div className="list-detail">
                                {items.note ? items.note.map((detail, index) => (
                                    <div key={index} className="admin-detail">
                                        <div className="d-flex">
                                            <div className="col-10 detail">
                                                {detail.titleDetail}
                                            </div>
                                            <div className="col-2 " style = {{marginTop: "1%"}}><button type="button" onClick={() => deleteDetail(detail, items.id)} className="ml-3 pt-4 btn-close"><i className="fas fa-trash-alt"></i></button></div>                             
                                        </div>
                                    </div>
                                )) : ('')}
                            </div>
                        </div>
                    )) : ""}
                </div>
            </div>
        </div>

    )
}

export default Admin;

