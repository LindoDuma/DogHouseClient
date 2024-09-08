import { Link } from "react-router-dom";
import DeleteOwner from "./DeleteOwner";
import EditOwner from "./EditOwner";

export default function OwnerCard(props: any){
    return(

        <li key={props.id} className="list-item py-1">
            <div className="flex flex-row justify-between">
                <p className="px-4 text-gray-950">{props.name}</p>
                {/*Crud buttons for editing and deleting dogs*/}
                <div className="flex flex-row justify-evenly">
                <Link to={"/Owner"} state={{id: props.id, name: props.name}} className="bg-slate-400 rounded-md px-4 py-2">Dogs</Link>
                <EditOwner 
                    id={props.id}
                    name={props.name} 
                    updateOwner={props.updateOwner}
                />
                <DeleteOwner
                    id={props.id}
                    deleteOwner={props.deleteOwner}
                />
                </div>
            </div>
        </li>
    )
}