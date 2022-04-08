import React,{useState} from 'react';
import CreateNoteTabCSS from "../createNoteTab/CreateNoteTab.module.css";
import Input from '../input/Input';
import Button from '../button/Button';
import categoryHooks from '../../../hooks/query/category'
import projectHooks from '../../../hooks/query/project'
import notesHooks from '../../../hooks/query/note'

const CreateNoteTab = () => {

    const categories = categoryHooks.useCategories()
    const createCategoryMutation = categoryHooks.useCreateCategoryMutation()
    const [data,setData] = useState({name:"nesto novo"})
    console.log(categories)

    const handleButton = (event) => {
        event.preventDefault()
        createCategoryMutation.mutate({"data":data})
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
                        <Input placeholder='Hello'></Input>
                    </div>
                    <div className={CreateNoteTabCSS.input_label} >
                        <span className={CreateNoteTabCSS.input_title}>New Description</span>
                        <textarea name="Description" placeholder='Hello' className={CreateNoteTabCSS.description} cols="60" rows="5"></textarea>
                    </div>
                    <div className={CreateNoteTabCSS.input_label} >
                        <input type="text" list='Category' placeholder='Category' className={CreateNoteTabCSS.category_list} />
                        <datalist id='Category'>
                            {categories.status === 'success' && categories.data?.data.map((category) => (
                                <option key={category.id} value={category.attributes.name}></option>
                            ))}
                            {/* <option value="Deployment"></option>
                            <option value="Design"></option>
                            <option value="DevOps"></option>
                            <option value="Develeopment"></option>
                            <option value="Documentation"></option>
                            <option value="Maintenance"></option>
                            <option value="Network"></option>
                            <option value="Other"></option>
                            <option value="Project Management"></option>
                            <option value="Storage"></option> */}
                        </datalist>
                    </div>
                </div>
            </div>
            <div className={CreateNoteTabCSS.btn_position}>
                <Button onClick={handleButton} text="Save Note"></Button>
            </div>
        </div>
    )
}

export default CreateNoteTab;