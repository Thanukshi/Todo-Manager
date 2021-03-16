import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddNewTodo = ({ modal, toggle, sendListData }) => {

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
        sendListData(item);
        setColour("");
        setContent("");
        setPriority("");
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Todo</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <textarea style={{ height: "150px" }} rows="10" className="form-control" onChange={(event) => {
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
                            <option value="#0984e3">Red</option>
                            <option value="#6c5ce7">Green</option>
                            <option value="#fd79a8">Yellow</option>
                            <option value="#fdcb6e">Blue</option>
                        </select>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" style={{ width: "500px" }} color="primary" onClick={toggle} onClick={handleSubmit}>Add New</Button>{' '}
            </ModalFooter>
        </Modal>
    );
};

export default AddNewTodo;