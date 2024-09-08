import { useState, useEffect } from "react";
import axios from 'axios'
import AddDog from "./AddDog";
import Dog from "./Dog";

export default function DogList(){

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
    
      const BASE_URL = 'https://localhost:7232/api/Dogs/';
    
      const [dogs, setDogs] = useState<IDog[]>([]);
      const [isLoading, setLoading] = useState<boolean>(true);
    
      //funstion to delete a dog on the api
      const deleteDog = async (id:number) => {

        try{
          await axios.delete(BASE_URL + id.toString());
          console.log('Dog was deleted successfully', id);
          setDogs(dogs.filter((dog) => dog.id !== id));
        }
        catch (error){
          console.error('Could not delete dog', error);
        }
      }

      function updateDog(id:number, newName:string, newType:string) {
        const updatedDogs = dogs.map((dog) => {
            if (id === dog.id) {
                return { ...dog, name: newName, role: newType };
            }

            return dog;
        });

        setDogs(updatedDogs);
    }

    function addDog(newDog: IDog){

      const dogList = [...dogs];
      dogList.push(newDog);

      setDogs(dogList);
    }

      useEffect(() => {
        
        async function getData() {
        
          await axios.get(BASE_URL)
          .then((res) => {
            console.log(res.data);
            setLoading(false);
            setDogs(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        }
        getData();
    
      }, []);

      

      const listOfDogs = dogs.map((dog) => 
        <Dog
          id={dog.id}
          name={dog.name}
          type={dog.type}
          owner={dog.owner}
          updateDog={updateDog}
          deleteDog={deleteDog}
        />
      )

    return(
        <div className='container my-8 flex justify-center align-middle items-center flex-col max-w-7xl mx-auto'>
            <div className="flex flex-row justify-between w-full mb-6">
              <h1 className="py-2 text-3xl uppercase">Dogs</h1>
              <AddDog addDog={addDog}/>
            </div>

            {isLoading ? <p>Loading...</p>: null}
            {listOfDogs.length > 0 ? (<div className='grid grid-cols-4 gap-4 gap-y-6 w-full'>{(listOfDogs)}</div>): (<p className="text-center">There are no dogs yet</p>)}
        </div>
    )
}