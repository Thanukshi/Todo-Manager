import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const TodoList = () => {

    const [key, setKey] = useState();
    const [content, setContent] = useState();
    const [priority, setPriority] = useState();
    const [colour, setColour] = useState();
    const [editable, setEditable] = useState(false);
    const [modal, setModal] = useState(false);
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const [indexoflist, setIndexoflist] = useState();
    const [indexInData, setIndexInData] = useState();

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
        setKey(e.key);
        setContent(e.content);
        setPriority(e.priority);
        setColour(e.colour);
        setEditable(true);

        var array = [...list];
        var array2 = [...data];
        var index = array.indexOf(e);
        setIndexoflist(index);

        var index2 = array2.indexOf(e);
        setIndexInData(index2);
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

        if (index !== -1) {
            array.splice(index, 1);
            array.push(item);
            setList(array);
            setData(array);
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
            setData(array);
        }
    }

    const removeItem = (e) => {
        var array = [...list];
        var index = array.indexOf(e)
        if (index !== -1) {
            array.splice(index, 1);
            setList(array);
            setData(array);
        }
    }


    const handleSubmit = () => {

        if (editable && key != null) {
            var item = {
                key: key,
                content: content,
                priority: priority,
                colour: colour,
                isCompleted: false,
            }

            if (item.content == null || item.content == "") {
                toast.error("Todo content cannot be null!");
            }

            if (item.content != null && item.content != "") {
                list[indexoflist] = item;
                data[indexInData] = item;
                toast.success("Updated!");

                setColour("");
                setContent("");
                setPriority("");
                setEditable(false);
            }
        }

        else {
            var item = {
                key: Date.now(),
                content: content,
                priority: priority,
                colour: colour,
                isCompleted: false,
            }

            if (item.content == null || item.content == "") {
                toast.error("Todo content cannot be null!");
            }

            if (item.content != null && item.content != "") {
                list.push(item);
                toast.success("Added!");

                setColour("");
                setContent("");
                setPriority("");
                setData(list);
            }
        }
    }

    let btn_class_high = priority == "High" ? "btn btn-danger" : "btn btn-secondary";
    let btn_class_medium = priority == "Medium" ? "btn btn-success" : "btn btn-secondary";
    let btn_class_low = priority == "Low" ? "btn btn-warning" : "btn btn-secondary";


    return (
        <div className="container-fluid p-3">
            <div className="container-fluid p-3 bg-dark text-white">
                <h2>Todo Manager</h2>

                <div className="row mt-3">
                    <div className="col-9">
                        <input className="search_input" type="text" placeholder="Search.." onChange={handleChangeFilter} />
                    </div>

                    <div className="col-3">
                        <button className="btn btn-info" style={{ width: '345px', height: '50px' }} onClick={() => setModal(true)}>Add New</button>
                    </div>

                </div>


                <div className="row mt-5">
                    <div className="col-4">
                        <h5>Filter by</h5>
                    </div>

                    <div className="col-4">
                        <select className="form-control" onChange={handleChangeFilter}>
                            <option value="All">All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="col-4">
                        <select className="form-control" onChange={handleChangeFilter}>
                            <option value="All">All</option>
                            <option value="#0984e3">Blue</option>
                            <option value="#6c5ce7">Purple</option>
                            <option value="#fd79a8">Pink</option>
                            <option value="#fdcb6e">Yellow</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
            <div className="todo-list-container">
                {
                    list.length > 0 && list.map((e) => (
                        (e !== null) ? (
                            (
                                <div className="row m-3 p-3" key={e.key} style={{ background: `${e.colour}` }}>
                                    <div className="col-1">
                                        <b>{e.priority ? e.priority : null}</b>
                                    </div>
                                    <div className="col-9">
                                        {e.isCompleted ? <strike>{e.content}</strike> : e.content}
                                    </div>
                                    <div className="col-2">
                                        <i title="complete task" className="fa fa-check-circle fa-lg" onClick={() => { completeItem(e) }}></i>&nbsp;&nbsp;
                                        {e.isCompleted ? <i title="uncomplete task" className="fa fa-minus-circle fa-lg" onClick={() => { unCompleteItem(e) }}></i> : null}&nbsp;&nbsp;
                                        <i title="update task" className="fa fa-edit fa-lg" onClick={() => updateItem(e)}></i>&nbsp;&nbsp;
                                        <i title="remove task" className="fa fa-times-circle fa-lg" onClick={() => { removeItem(e) }}></i>
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
                            <textarea rows="5" className="form-control" value={content} onChange={(event) => {
                                setContent(event.target.value);
                            }}>

                            </textarea>
                        </div>

                        <div class="row">

                            <div class="col">
                                <button type="button" className={btn_class_high} onClick={(event) => {
                                    setPriority(event.target.value);
                                }} value="High">High</button>&nbsp;&nbsp;
                                <button type="button" className={btn_class_medium} onClick={(event) => {
                                    setPriority(event.target.value);
                                }} value="Medium">Medium</button>&nbsp;&nbsp;
                                <button type="button" className={btn_class_low} onClick={(event) => {
                                    setPriority(event.target.value);
                                }} value="Low">Low</button>
                            </div>

                            <div className="col">
                                <select className="form-control" style={{ float: "right" }} onChange={(event) => {
                                    setColour(event.target.value);
                                }} value={colour} >
                                    <option value="select">select</option>
                                    <option value="#0984e3">Blue</option>
                                    <option value="#6c5ce7">Purple</option>
                                    <option value="#fd79a8">Pink</option>
                                    <option value="#fdcb6e">Yellow</option>
                                </select>
                            </div>

                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" style={{ width: "500px" }} color="primary" onClick={toggle} onClick={handleSubmit}>{editable ? 'Update' : 'Add'}</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default TodoList;
