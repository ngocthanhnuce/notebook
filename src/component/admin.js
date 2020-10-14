import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Fuse from 'fuse.js';

const Admin = () => {
    const [notes, setNotes] = useState([]);
    localStorage.getItem('dataNote', JSON.stringify(notes));
    const [listSearch, setListSearch] = useState([]);
    const [search, setSearch] = useState('');
    const [addNote, setAddNote] = useState('');

    const [addDetail, setAddDetail] = useState('');
    const [detail, setDetail] = useState();
    const [arrSearch,setArrSearch] = useState('')

    const handleChange= (e) => {
        setSearch(e);
        if(e === ''){
            setArrSearch('');
            setNotes(listSearch);
        }
    }
    //Add notes
    const handleAdd = (e) => {
        e.preventDefault();
        if (addNote) {
            listSearch.push({ id: uuidv4(), title: addNote, note: [] });        
            setNotes(listSearch);
            setAddNote('');         
        }
    }
    //Show detail
    const onDetail = (detail) => {
        setDetail([detail]);
    }
    //Add detail
    const handleAddDetail = (arr) => {
        if (addDetail) {
            arr.push({ id: uuidv4(), titleDetail: addDetail, arrDetail: [] });
            setAddDetail('');
        }
    }
    //Delete note
    const handleDelete = (idDelete) => {
        const arrDelete = notes.filter(item => item.id !== idDelete);
        setNotes(arrDelete);

        setListSearch(listSearch.filter(item => item.id !== idDelete)) ;  
        setDetail('');
    }
    const handleSearch = (e) => {
        setArrSearch(true);
        if (search !== '' && listSearch !== '') {
            setArrSearch(true);
            const options = {
                includeScore: true,
                keys: ['title']
            }
            const fuse = new Fuse(listSearch, options);
            const results = fuse.search(search);
            const listResult = [];
            listResult.push(results.map(el => el.item));
            setNotes(listResult[0]);
        }
        else {
            setNotes(listSearch);
            setArrSearch('');
        }
        e.preventDefault();
    }

    // Sort by Name
    const sortName = () =>{
        // eslint-disable-next-line array-callback-return
        let sortName = notes.sort((a, b) => {
        if(a.title>b.title){
            return 1;
        }
        else if(a.title<b.title){
            return -1;
        }
        });
        setNotes([...sortName]);
    }
    //Delete detail
    const deleteDetail = (listDetail, itemId) => {
        const lists = [...notes];
        const noteList = detail.map(list => list.note);        
        const detailNote = noteList[0].filter(idx => idx.id !== listDetail.id);
        const arrDelete = lists.map(arrNote => {

            if (arrNote.id === itemId) {
                return { ...arrNote, note: detailNote }
            }
            return arrNote;
        });
    const arrSearch = [...listSearch];
        const arrDetailNote = noteList[0].filter(idx => idx.id !== listDetail.id);
        const newArrSearch = arrSearch.map(arrNote => {

            if (arrNote.id === itemId) {
                return { ...arrNote, note: arrDetailNote }
            }
            return arrNote;
        });
        const newDetail = detail.map(listItem => {
            if (listItem.id === itemId) {
                return { ...listItem, note: detailNote }
            }
            return listItem;
        });
        setDetail(newDetail);
        setNotes(arrDelete);
        setListSearch(newArrSearch);
    }

    return (
        <div className="admin">
            <h1>NoteBook</h1>
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
                            <input type="text" className="form-control" value = {addNote} onChange = {e => setAddNote(e.target.value)} placeholder="Add note..." />                
                            { arrSearch ? <button className="btn btn-primary arr-note" type="button">Add<i className="fas fa-address-card mt icon"></i></button> : 
                            <button className="btn btn-primary arr-note" style = {{display: "flex"}} onClick = {handleAdd}>Add<i className="fas fa-address-card mt" style = {{paddingTop: "6%"}}></i></button>}
                        </form>
                        <button className = "btn btn-primary sort" onClick={ sortName } style = {{width: "20%", marginLeft: "15%", height: "1%"}}>Sort by name<i className="fas fa-file-signature mt"></i></button>
                    </div>
                    <div className = "col-6">
                        { notes ? notes.map((item, index) => (
                            <div key={index} className="col-12 add-note">
                                <div className="detail">
                                    <button className = "btn btn-primary notes" type = "button" onClick = {() => onDetail(item)}>{item.title}</button>                                  
                                    <button type="button" onClick={ () => handleDelete(item.id)} className="delete"><i className="fas fa-trash-alt"></i></button>
                                </div>      
                            </div>
                        )) : ('')}
                    </div>
                </div>
                <div className="col-6">
                    <h3>My Note</h3>
                    { detail ? detail.map((items, index) => (
                        <div key={index} className = "item-detail">
                            <div className="d-flex detail">
                                <div className="admin-add-detail">
                                    <input type="text" className="form-control" value = {addDetail} onChange = { e => setAddDetail(e.target.value)} placeholder="Add detail..." />
                                    <button className="btn btn-primary" style = {{display: "flex", width: "60%"}} onClick = { () => handleAddDetail(items.note)}>Add Detail<i className="fas fa-address-card mt icon" ></i></button>
                                </div>
                            </div>
                            <div className="list-detail">
                                { items.note ? items.note.map((detail, index) => (
                                    <div key={index} className="admin-detail-mt">
                                        <div className="add-note-mt">
                                            <button className = "btn btn-primary m-10" type = "button"> {detail.titleDetail}</button>                                  
                                            <button type="button" onClick={ () => deleteDetail(detail, items.id)} className="delete"><i className="fas fa-trash-alt"></i></button>                 
                                        </div>
                                    </div>
                                )) : ('')}
                            </div>
                        </div>
                    )) : ('')}
                </div>
            </div>
        </div>

    )
}

export default Admin;

