import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const TodoList = () => {

    const [colour, setColour] = useState();
    const [content, setContent] = useState();
    const [priority, setPriority] = useState();
    const [editable, setEditable] = useState(false);
    const [modal, setModal] = useState(false);
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const [completed, setCompleted] = useState([]);

    const toggle = () => {
        setModal(!modal);
    }

    const handleChangeFilter = (e) => {
        e.target.value && e.target.value != "All" ? 
            setList(
                list.filter((data) => data.priority.toLowerCase().includes(e.target.value.toLowerCase()) || data.colour.toLowerCase().includes(e.target.value.toLowerCase()) || data.content.toLowerCase().includes(e.target.value.toLowerCase()))
            )
        :

        setList(data)
    }

    const updateItem = (e) => {
        setModal(true);
        setContent(e.content);
        setPriority(e.priority);
        setColour(e.colour);
        setEditable(true);
        
        var array = [...list];
        var index = array.indexOf(e)
        if (index !== -1) {
            array.splice(index, 1);
            setList(array);
        }
    }

    const completeItem = (e) => {
        var array = [...list];
        var index = array.indexOf(e);

        var item = {
            key: e.key,
            content: e.content,
            priority: e.priority,
            colour: e.colour,
            isCompleted: true,
        };

        completed.push(item);

        if (index !== -1) {
            array.splice(index, 1);
            array.push(item);
            setList(array);
        }
    }

    const unCompleteItem = (e) => {

        var array = [...list];
        var index = array.indexOf(e);

        var item = {
            key: e.key,
            content: e.content,
            priority: e.priority,
            colour: e.colour,
            isCompleted: false,
        };

        if (index !== -1) {
            array.splice(index, 1);
            array.push(item);
            setList(array);
        }
    }

    const removeItem = (e) => {
        var array = [...list];
        var index = array.indexOf(e)
        if (index !== -1) {
            array.splice(index, 1);
            setList(array);
        }
    }

    const handleSubmit = () => {

        var item = {
            key: Date.now(),
            content: content,
            priority: priority,
            colour: colour,
            isCompleted: false
        }

        if (item.content == null || item.content == "") {
            toast.error("Todo content cannot be null!");
        }

        if(item.content != null && item.content != ""){
            list.push(item);
            toast.success("Process Done!");

            setColour("");
            setContent("");
            setPriority("");
            setEditable(false);
            setData(list);
        }
    }
    
    let btn_class_high = priority == "High" ? "btn btn-danger" : "btn btn-secondary";
    let btn_class_medium = priority == "Medium" ? "btn btn-success" : "btn btn-secondary";
    let btn_class_low = priority == "Low" ? "btn btn-warning" : "btn btn-secondary";


    return (
        <div>
            <div className="header-container">
                <h2>Todo Manager</h2>

                <div className="d-flex justify-content">
                    <div className="searchbar">
                        <input className="search_input" type="text" placeholder="Search.." onChange={handleChangeFilter}/>
                    </div>
                </div>

                <div className="button text-right">
                    <button className="btn btn-primary" style={{  width : '300px',height : '50px'}} onClick={() => setModal(true)}>Add New</button>
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
                    list.length > 0 && list.map((e) => (
                        (e !== null) ? (
                            (
                                <div key={e.key} style={{ background: `${e.colour}` }}>
                                    <div className="todo-content" >
                                        <span style={{ float: "right" }}><i title="remove task" className="fa fa-times-circle" onClick={() => { removeItem(e) }}></i></span>
                                        <span style={{ float: "right" }}><i title="complete task" className="fa fa-check-circle" onClick={() => { completeItem(e) }}></i></span>
                                        <span style={{ float: "right" }}><i title="uncomplete task" className="fa fa-minus-circle" onClick={() => { unCompleteItem(e) }}></i></span>
                                        <span style={{ float: "right" }}><i title="update task" className="fa fa-edit" onClick={() => updateItem(e)}></i></span>
                                        <h6>{e.priority}</h6><br/>
                                        {e.isCompleted ? <strike>{e.content}</strike> : e.content}
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
                        <button type="button" className={btn_class_high} onClick={(event) => {
                            setPriority(event.target.value);
                        }} value="High">High</button>&nbsp;
                        <button type="button" className={btn_class_medium} onClick={(event) => {
                            setPriority(event.target.value);
                        }} value="Medium">Medium</button>&nbsp;
                        <button type="button" className={btn_class_low} onClick={(event) => {
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
                <Button type="submit" style={{ width: "500px" }} color="primary" onClick={toggle} onClick={handleSubmit}>{editable? 'Update' : 'Add'}</Button>{' '}
            </ModalFooter>
        </Modal>
        </div>
    );
};

export default TodoList;
