import React from 'react';
import CreateNoteTabCSS from "../createNoteTab/CreateNoteTab.module.css";
import Input from '../input/Input';
import Button from '../button/Button';
import { useState } from 'react';
import { useSaveNote } from '../../../hooks/custom/useSaveNote';


const CreateNoteTab = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')


    const { mutate } = useSaveNote();

    const handleCreateNoteClick = () => {
        console.log({ title, description });
        const note = { data: { title, description } };
        mutate(note);
    }




    return (
        <div className={CreateNoteTabCSS.container}>
            <div className={CreateNoteTabCSS.header}>
                <span className={CreateNoteTabCSS.nav}>Back</span>
                <h3>Create a new Note</h3>
            </div>
            <div className={CreateNoteTabCSS.layout}>
                <div className={CreateNoteTabCSS.note_info}>
                    <h3>Note info</h3>
                </div>
                <div>
                    <div className={CreateNoteTabCSS.input_label} >
                        <span className={CreateNoteTabCSS.input_title}>Note Title</span>
                        <Input onChange={(e) => setTitle(e.target.value)} placeholder='Hello'></Input>
                    </div>
                    <div className={CreateNoteTabCSS.input_label} >
                        <span className={CreateNoteTabCSS.input_title}>New Description</span>
                        <textarea onChange={(e) => setDescription(e.target.value)} name="Description" placeholder='Hello' className={CreateNoteTabCSS.description} cols="60" rows="5"></textarea>
                    </div>
                    <div className={CreateNoteTabCSS.input_label} >
                        <input type="text" list='Category' placeholder='Category' className={CreateNoteTabCSS.category_list} />
                        <datalist id='Category'>
                            <option value="Deployment"></option>
                            <option value="Design"></option>
                            <option value="DevOps"></option>
                            <option value="Develeopment"></option>
                            <option value="Documentation"></option>
                            <option value="Maintenance"></option>
                            <option value="Network"></option>
                            <option value="Other"></option>
                            <option value="Project Management"></option>
                            <option value="Storage"></option>
                        </datalist>
                    </div>
                </div>
            </div>
            <div className={CreateNoteTabCSS.btn_position}>
                <Button onClick={handleCreateNoteClick} text="Save Note"></Button>
            </div>
        </div>
    )
}

export default CreateNoteTab;