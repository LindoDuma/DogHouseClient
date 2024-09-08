import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Dog from "../components/Dog";

export default function OwnerDetailsPage () {
    const location = useLocation();
    const { id, name } = location.state;

    const [ownerDogs, setDogs] = useState<IDog[]>([]);

    interface IDog {
        id: number;
        name: string;
        type: string;
        owner: {
          id: number,
          name: string,
          dogs: [],
        };
      }

    useEffect(() => {

        async function getData(){
            await axios.get("https://localhost:7232/api/Dogs/" + id.toString() + "/dogsbyowners").
            then((res) =>{
                setDogs(res.data);
                console.log(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }

        getData();
    },[])
    
    const listOfDogs = ownerDogs.map((od) => 
        <Dog
          id={od.id}
          name={od.name}
          type={od.type}
          owner={od.owner}
          updateDog={()=>{null}}
          deleteDog={()=>{null}}
        />
    );

    return (
    <>
        <Navbar/>
        <div className="max-w-7xl flex flex-col mx-auto justify-center justify-items-center align-middle items-center">
            <h1 className="text-xl text-center">All of {" " + name + "'s Dogs"}</h1>
            {listOfDogs.length > 0 ? (<div className='grid grid-cols-4 gap-4 gap-y-6 w-full '>{listOfDogs}</div>): (<p className="text-center">{name + " Does not have any dogs yet"}</p>)}
        </div>
    </>)
}