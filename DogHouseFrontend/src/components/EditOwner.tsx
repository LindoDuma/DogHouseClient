import { useState } from "react"
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function EditOwner(props: any) {

    interface Owner{
        id: number;
        name: string;
    }

    const [show,setShow] = useState<boolean>(false);
    const BASE_URL = "https://localhost:7232/api/Owners/";

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    const [name, setName] = useState<string>(props.name);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try{
            const response = await axios.put(BASE_URL + props.id, {
                id: props.id,
                name: name,
            })

            const editedOwner = await response.data;
            props.updateOwner(editedOwner.id, editedOwner.name, editedOwner.type);
            console.log(editedOwner);
            
        }
        catch(err){
            console.error(err);
        }
        handleHide();
    } 

    return(
        <>

            <button className="bg-white rounded-md w-auto h-auto hover:bg-blue-800 transition-all duration-200 text-black text-center px-4 mr-3" onClick={handleShow}><i className="bi bi-pencil-square pr-1"></i>Edit</button>

            {show ? (
                <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center align-middle items-center w-full h-full bg-opacity-50 bg-gray-900 overflow-hidden z-40">
                    <div className="bg-white w-2/6 h-auto rounded-md z-50">
                        <div className="flex h-14 align-middle items-center justify-between modal-header border-b border-gray-300">
                            <h1 className="px-4">Edit Owner</h1>
                            <button onClick={handleHide} className="text-black rounded-md w-auto h-auto transition-all duration-200 text-2xl text-center px-4"><i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="flex flex-col mt-2 pb-2">
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <div className="flex flex-col mx-4 my-3">
                                    <label className=" w-16">Name</label>
                                    <input className="px-2 border border-gray-300 rounded-md focus:outline-slate-400 w-full h-9" type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name}/>
                                </div>
                                
                                <div className="flex flex-col mx-4 my-3">
                                    <button className="bg-green-500 h-8 rounded-md w-auto hover:bg-green-800 transition-all duration-200 text-white text-center">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ): null}
        </>
    )
}