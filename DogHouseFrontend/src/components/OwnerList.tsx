import { useState, useEffect } from "react";
import axios from 'axios'
import AddOwner from "./AddOwner";
import OwnerCard from "./OwnerCard";

export default function OwnerList(){

    interface IOwner {
      id: number;
      name: string;
    }
    
    const BASE_URL = 'https://localhost:7232/api/Owners/';
  
    const [owner, setOwner] = useState<IOwner[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
  
    //function to delete a dog on the api
    const deleteOwner = async (id:number) => {

      try{
        await axios.delete(BASE_URL + id.toString());
        console.log('Dog was deleted successfully', id);
        setOwner(owner.filter((own) => own.id !== id));
      }
      catch (error){
        console.error('Could not delete dog', error);
      }
    }

    function updateOwner(id:number, newName:string) {
      const updatedOwners = owner.map((own) => {
          if (id == own.id) {
              return { ...own, name: newName };
          }

          return own;
      });
      setOwner(updatedOwners);
    }

    function addOwner(newOwner: IOwner){

      const ownerList = [...owner];
      ownerList.push(newOwner);

      setOwner(ownerList);
    }

    useEffect(() => {
      
      async function getData() {
      
        await axios.get(BASE_URL)
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          setOwner(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
      }
      getData();
  
    }, []);

      

    const listOfOwners = owner.map((own) => 
      <OwnerCard
        id={own.id}
        name={own.name}
        updateOwner={updateOwner}
        deleteOwner={deleteOwner}
      />
    )

    return(
        <div className='container my-8 flex justify-center align-middle items-center flex-col max-w-sm mx-auto'>
            <div className="flex flex-row justify-between w-full mb-6">
              <h1 className="py-2 text-xl">List of Owners</h1>
              <AddOwner addOwner={addOwner}/>
            </div>

            {isLoading ? <p>Loading...</p>: null}
            {listOfOwners.length > 0 ? (<ul className='my-list'>{(listOfOwners)}</ul>): (<p className="text-center">There are no owners yet</p>)}
        </div>
    )
}