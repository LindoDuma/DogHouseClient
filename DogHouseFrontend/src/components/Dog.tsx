import EditDog from "./EditDog"
import DeleteDog from "./DeleteDog"
import { Link } from "react-router-dom";

export default function Dog(props: any){

    const imgSrc = "url('/src/assets/pexels-pixabay-220938.jpg') ${props.name}";

    return(

        <div key={props.id} className="">
            <div className="flex flex-col rounded h-auto">
                <div className="bg-cover w-full h-[350px] rounded-md relative flex flex-col">
                    <div className="flex flex-row justify-between">
                        <h1 className="p-4 text-xl text-white relative uppercase font-bold">{props.name}</h1>
                        {props.owner ? (
                            <div className="flex m-4 p-2 bg-slate-500 rounded-md max-w-fit max-h-10">
                                <Link to={{pathname: "/Owner"}} state={{id: props.id, name: props.name}} className="text-base text-white relative uppercase">{props.owner ?" " + props.owner.name : "None"}</Link>
                            </div>) : null}
                    </div>

                    <img className="w-auto h-full object-cover absolute top-0 bottom-0 rounded-md -z-10" src="./src/assets/pexels-alexandru-rotariu-230845-733416.jpg" alt=""/>

                    <div className="flex flex-row justify-evenly p-4 mt-auto">
                        <EditDog 
                            id={props.id}
                            name={props.name} 
                            type={props.type}
                            updateDog={props.updateDog}
                        />
                        <DeleteDog
                            id={props.id}
                            name={props.name}
                            deleteDog={props.deleteDog}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}