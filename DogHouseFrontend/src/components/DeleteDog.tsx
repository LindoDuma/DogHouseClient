import { useState } from "react"

export default function DeleteDog(props: any){

    const [show,setShow] = useState<boolean>(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    return(
        <>
            <button className="bg-gray-950 rounded-md w-full h-10 hover:bg-white transition-all duration-300 text-white hover:text-black hover:scale-105 text-center py-1 px-3" onClick={handleShow}><i className="bi bi-trash-fill pr-1"></i>Delete</button>
            {show ? (
                <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center align-middle items-center w-full h-full bg-opacity-50 bg-gray-900 z-40">
                <div className="bg-white w-2/6 h-auto rounded-md z-50">
                    <div className="flex h-14 align-middle items-center justify-between modal-header border-b border-gray-300">
                        <h1 className="px-4">Delete Dog</h1>
                        <button onClick={handleHide} className="rounded-md w-auto h-auto text-2xl transition-all duration-200 text-black text-center px-4"><i className="bi bi-x-lg"></i></button>
                    </div>    
                    <div className="flex h-40 px-6 align-middle items-center justify-center border-gray-300">
                        <p>Are you sure you want to delete {props.name}</p>
                    </div> 
                    <div className="flex h-14 px-4 align-middle items-center justify-between border-t border-gray-300">
                        <button onClick={() => props.deleteDog(props.id)} className="bg-red-600 rounded-md w-auto h-auto hover:bg-red-800 transition-all duration-200 text-white text-center py-1 px-3">Delete</button>
                        <button onClick={handleHide} className="bg-gray-400 rounded-md w-auto h-auto hover:bg-gray-800 transition-all duration-200 text-white text-center py-1 px-3">Cancel</button>
                    </div> 
                </div>
            </div>
            ) : null}
        </>
    )
}