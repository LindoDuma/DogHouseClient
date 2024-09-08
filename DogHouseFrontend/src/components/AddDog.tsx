import axios from "axios"
import { useEffect, useState } from "react"

export default function AddDog(props: any){

    interface Dog{
        id: number;
        name: string;
        type: string;
        owner?: {id:number,
            name: string
        }
    }

    interface Owner{
        id: number;
        name: string;
    }

    const [formData, setFormData] = useState<Dog>({
        id: 0,
        name: "",
        type: "",
        owner: {id: 0, name: ""}
    });

    const BASE_URL = 'https://localhost:7232/api/Dogs/';

    const [show,setShow] = useState<boolean>(false);

    const [ownerList,setOwners] = useState<[Owner]>([{id: 0, name: ""}]);

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
            const response = await axios.post<Dog>(BASE_URL, formData);
            const resData = response.data;
            const addedDog = {id: resData.id, name: resData.name, type: resData.type};
            props.addDog(addedDog);
            console.log('Dog was Created successfully', resData);
        }
        catch(error){
            console.error('Could not create dog');
        }

        handleHide();
    }

    useEffect(() => {
        axios.get("https://localhost:7232/api/Owners/").then((res) => {
            console.log("Got list of Owners", res.data);
            setOwners(res.data);
        });
    },[]);

    return(

        <>
            <button onClick={handleOpen} className="bg-green-600 mx-1 py-1 rounded-md w-auto h-auto hover:bg-green-800 transition-all duration-200 text-white text-center px-4">
                <i className="bi bi-plus-lg pr-1"></i>Add Dog
            </button>

            {show ? (
                <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center align-middle items-center w-full h-full bg-opacity-50 bg-gray-900 overflow-hidden z-40">
                    <div className="bg-white w-2/6 h-auto rounded-md z-50">
                        <div className="flex h-14 align-middle items-center justify-between modal-header border-b border-gray-300">
                            <h1 className="px-4">Add Dog</h1>
                            <button onClick={handleHide} className="rounded-md w-auto h-auto text-2xl transition-all duration-200 text-black text-center px-4"><i className="bi bi-x-lg"></i></button>
                        </div>    
                        <div className="flex justify-center mt-2 pb-2">
                            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                                <div className="flex flex-col mx-4 my-3">
                                    <label className="mb-1">Name</label>
                                    <input className="px-2 py-1 border rounded-md border-gray-400 w-full h-9" placeholder="@Spotty" type="text" name="name" value={formData.name} onChange={handleChange}/>
                                </div>

                                <div className="flex flex-col mx-4 my-3">
                                    <label className="mb-1">Type</label>
                                    <input className="px-2 py-1 border rounded-md border-gray-400 w-full h-9" placeholder="@Wolf" type="text" name="type" value={formData.type} onChange={handleChange}/>
                                </div>

                                <div className="flex flex-col mx-4 my-3">
                                    <label className="mb-1">Owner</label>
                                    <select name="owner" id="owners" className="" value={formData.owner?.id} onChange={handleChange}>{ownerList.map((ow) => (<option className="" value={ow.id} >{ow.name}</option>))}</select>
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