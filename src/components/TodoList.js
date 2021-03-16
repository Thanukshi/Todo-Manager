import React, { useEffect, useState } from 'react';
import AddNewTodo from '../modals/AddNewTodo';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [listData, setListData] = useState([]);
    const [permanentData, setPermanentData] = useState([]);
    const [completedData, setCompletedData] = useState([]);

    const toggle = () => {
        setModal(!modal);
    }

    const handleChangeFilter = (e) => {
        if (e.target.value != null && e.target.value != "All") {
            setListData(
                listData.filter((data) => data.priority.includes(e.target.value) || data.colour.includes(e.target.value) || data.content.includes(e.target.value))
            )
        }

        else {
            setListData(permanentData);
        }
    }

    const updateItem = (e) => {

        setModal(true);
        setContent(e.content);
        setPriority(e.priority);
        setColour(e.colour);

        var array = [...listData];
        var index = array.indexOf(e);

        var item = {
            key: e.key,
            content: content,
            priority: priority,
            colour: colour,
            isCompleted: false
        };

        if (index !== -1) {
            array.splice(index, 1);
            array.push(item);
            setListData(array);
        }
    }

    const completeItem = (e) => {
        completedData.push(e);

        var array = [...listData];
        var index = array.indexOf(e);

        var item = {
            key: e.key,
            content: e.content,
            priority: e.priority,
            colour: e.colour,
            isCompleted: true,
        };

        if (index !== -1) {
            array.splice(index, 1);
            array.push(item);
            setListData(array);
        }
    }

    const removeItem = (e) => {
        var array = [...listData];
        var index = array.indexOf(e)
        if (index !== -1) {
            array.splice(index, 1);
            setListData(array);
        }
    }

    const [colour, setColour] = useState();
    const [content, setContent] = useState();
    const [priority, setPriority] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        var item = {
            key: Date.now(),
            content: content,
            priority: priority,
            colour: colour,
            isCompleted: false
        }

        if (item.content == null) {
            toast.error("Content cannot be null!");
        }

        if(item.content != null){
            listData.push(item);
            permanentData.push(item);
        }

        setColour(null);
        setContent(null);
        setPriority(null);
    }

    return (
        <div>
            <div className="header-container">
                <h1>Todo Manager</h1>

                <div className="d-flex justify-content">
                    <div className="searchbar">
                        <input className="search_input" type="text" placeholder="Search.." onChange={handleChangeFilter}/>
                    </div>
                </div>

                <div className="button text-right">
                    <button className="btn btn-primary" onClick={() => setModal(true)}>Add New</button>
                </div>
                <div className="d-flex align-items-center p-2">
                    <h5 className="p-2">Filter By</h5>
                    <h5 className="p-4">Priority : </h5>
                    <select className="form-select" aria-label="Default select example" onChange={handleChangeFilter}>
                        <option value="All">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <h5 className="p-4">Colour : </h5>
                    <select className="form-select" aria-label="Default select example" onChange={handleChangeFilter}>
                        <option value="All">All</option>
                        <option value="#0984e3">Blue</option>
                        <option value="#6c5ce7">Purple</option>
                        <option value="#fd79a8">Pink</option>
                        <option value="#fdcb6e">Yellow</option>
                    </select>
                </div>
            </div>
            <div className="todo-list-container">
                {
                    listData.length > 0 && listData.map((e) => (
                        (e !== null) ? (
                            (
                                <div key={e.key} style={{ background: `${e.colour}` }}>
                                    <div className="todo-content" >
                                        <span style={{ float: "right" }}><i className="fa fa-times-circle" onClick={() => { removeItem(e) }}></i></span>
                                        <span style={{ float: "right" }}><i className="fa fa-check-circle" onClick={() => { completeItem(e) }}></i></span>
                                        <span style={{ float: "right" }}><i className="fa fa-edit" onClick={() => updateItem(e)}></i></span>
                                        <span>{e.priority}</span><br/>
                                        <span>{e.isCompleted ? <strike>{e.content}</strike> : e.content} </span><br />
                                    </div>
                                </div>
                            )

                        ) : (null)
                    ))
                }
            </div>

            <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Todo</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <textarea style={{ height: "150px" }} rows="10" className="form-control"  value = {content} onChange={(event) => {
                            setContent(event.target.value);
                        }} value={content}>

                        </textarea>
                    </div>
                    <div className="tags">
                        <button type="button" onClick={(event) => {
                            setPriority(event.target.value);
                        }} value="High">High</button>
                        <button type="button" onClick={(event) => {
                            setPriority(event.target.value);
                        }} value="Medium">Medium</button>
                        <button type="button" onClick={(event) => {
                            setPriority(event.target.value);
                        }} value="Low">Low</button>

                        <select style={{ float: "right" }} onChange={(event) => {
                            setColour(event.target.value);
                        }} value={colour} >
                        <option value="select">select</option>
                        <option value="#0984e3">Blue</option>
                        <option value="#6c5ce7">Purple</option>
                        <option value="#fd79a8">Pink</option>
                        <option value="#fdcb6e">Yellow</option>
                        </select>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" style={{ width: "500px" }} color="primary" onClick={toggle} onClick={handleSubmit}>Add New</Button>{' '}
            </ModalFooter>
        </Modal>
        </div>
    );
};

export default TodoList;
