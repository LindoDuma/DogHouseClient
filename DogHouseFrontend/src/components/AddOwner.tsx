import axios from "axios"
import { useState } from "react"

export default function AddOwner(props: any){

    interface Owner{
        id: number;
        name: string;
    }

    const [formData, setFormData] = useState<Owner>({
        id: 0,
        name: "",
    });

    const BASE_URL = 'https://localhost:7232/api/Owners/';

    const [show,setShow] = useState<boolean>(false);

    //assign input from form to formData
    const handleChange = (e: { target: { name: string; value: string; }; }) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleOpen = () =>{
        setShow(true);
    }

    const handleHide = () =>{
        setShow(false);
    }

    //Post form dtat to doghouse api
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{

        e.preventDefault();
        try{
            const response = await axios.post<Owner>(BASE_URL, formData);
            const resData = response.data;
            const addedOwner = {id: resData.id, name: resData.name};
            props.addOwner(addedOwner);
            console.log('Owner was Created successfully', resData);
        }
        catch(error){
            console.error('Could not create Owner');
        }

        handleHide();
    }

    return(

        <>
            <button onClick={handleOpen} className="bg-green-600 mx-1 py-1 rounded-md w-auto h-auto hover:bg-green-800 transition-all duration-200 text-white text-center px-4">
                <i className="bi bi-plus-lg pr-1"></i>Add Owner
            </button>

            {show ? (
                <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center align-middle items-center w-full h-full bg-opacity-50 bg-gray-900 overflow-hidden z-40">
                    <div className="bg-white w-2/6 h-auto rounded-md z-50">
                        <div className="flex h-14 align-middle items-center justify-between modal-header border-b border-gray-300">
                            <h1 className="px-4">Add Owner</h1>
                            <button onClick={handleHide} className="rounded-md w-auto h-auto text-2xl transition-all duration-200 text-black text-center px-4"><i className="bi bi-x-lg"></i></button>
                        </div>    
                        <div className="flex justify-center mt-2 pb-2">
                            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                                <div className="flex flex-col mx-4 my-3">
                                    <label className="mb-1">Name</label>
                                    <input className="px-2 py-1 border rounded-md border-gray-400 w-full h-9" placeholder="@Spotty" type="text" name="name" value={formData.name} onChange={handleChange}/>
                                </div>

                                <div className="flex flex-col mx-4 my-3">
                                    <button className="bg-green-600 py-1 rounded-md w-full h-9 hover:bg-green-800 transition-all duration-200 text-white text-center px-4">
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null }
        </>
    )
}