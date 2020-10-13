import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const Admin = () =>{
    const [notes, setNotes] = useState('');
    const [list, setList] = useState([]);
    const [addNote, setAddNote] = useState('');
    const [addDetail, setAddDetail] = useState('');
    const [detail, setDetail]= useState();

    const handleAddNote = (e) => {
        e.preventDefault();
        if (addNote) {
            list.push({ id: uuidv4(), title: addNote, detail: [] });         
            setNotes(list)
             setAddNote('');         
         }
    }
    const handleAddDetail = (e) => {
        if (addDetail) {
            e.push({ id: uuidv4(), itemDetail: addDetail, list: [] });
            setAddDetail('')
        }
    }
    const onDetail = (todo) => {
        setDetail(todo);
        localStorage.setItem('id', todo.id)
    }
    const handleDelete = (idDelete) => {
        const arrDelete = notes.filter(idx => idx.id !== idDelete)
        setNotes(arrDelete);
    }

    return (
        <div className="admin">
            <div className = "row">
                <div className = "col-6">
                    <h3>All Note</h3>
                    <div className="search">
                        <div className="row-form">
                            <input type="text" className="form-control"  placeholder="Search..." />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </div>
                    <div className="admin-add">
                        <input type="text" className="form-control" value = {addNote} onChange = {e => setAddNote(e.target.value)} placeholder="Add item..." />
                        <button className="btn btn-primary" style = {{display: "flex"}} onClick = {handleAddNote}>Add<i className="fas fa-address-card" style = {{paddingTop: "6%"}}></i></button>
                    </div>
                    <div className="col-6">
                        {notes ? notes.map((item, index) => (
                            <div key={index} className="d-flex w-100 admin-detail">
                                <div className="col-10 detail">
                                    <div className = "title" ><h4 onClick = {() => onDetail(item)}>{item.title}</h4></div>                                  
                                </div>
                                <div className="col-2 " style = {{marginTop: "1%"}}><button type="button" className="" onclick = {() => handleDelete(item.id)}><i className="fas fa-trash-alt"></i></button></div>
                            </div>
                        )) : ""}
                    </div>
                </div>
                <div className = "col-6">
                    <h3>My Note</h3>
                    { detail ? detail.map((items, ind) => (
                        <div key = {ind}>
                            <div className = "detail">
                                <div className="admin-add-detail">
                                    <input type="text" className="form-control" value = {addDetail} onChange = {e => setAddDetail(e.target.value)} placeholder="Add item..." />
                                    <button className="btn btn-primary" style = {{display: "flex"}} onClick = { () => handleAddDetail(items.detail)}>Add Detail<i className="fas fa-address-card" style = {{paddingTop: "6%"}}></i></button>
                                </div>
                            </div>
                            <div className = "list-detail">
                                { items.detail ? items.detail.map((a, idx) => (
                                    <div key={idx} className="d-flex w-100 admin-detail">
                                        <div className="col-10 detail">
                                            <div className = "title" ><h4 >{a.itemDetail}</h4></div>                                  
                                        </div>
                                        <div className="col-2 " style = {{marginTop: "1%"}}><button type="button" className=""><i className="fas fa-trash-alt"></i></button></div>
                                    </div>
                                )) : ""}
                            </div>
                        </div>
                        
                    )) : ('') }
                </div>
            </div>
        </div>
    );
}

export default Admin;