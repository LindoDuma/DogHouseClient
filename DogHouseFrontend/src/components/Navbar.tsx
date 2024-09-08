import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="bg-transparent nav" role="navigation">
            <div className="mx-auto px-2 sm:px-6 lg:px-8 lg:max-w-[83%] xl:max-w-[93%]">
                <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 sm:items-stretch md:items-center">
                            <div className="brand flex flex-row flex-nowrap justify-center items-center">
                                <img className="hidden w-7 h-auto aspect-squar logo" src="./assets/DogHouseFrontend/src/assets/pexels-chevanon-1108099.jpg" alt="Logo"></img>
                                <h1 className=" font-semibold font-Poppins justify-self-start text-gray-900 hover:text-gray-500 rounded-full px-3 py-2 text-[20px] transition-all duration-500 ease-in-out">Dog House</h1>
                            </div>
                            <ul id="navlist" className="hidden md:flex flex-col sm:hidden md:flex-row space-x-10 justify-self-center mr-0 ml-auto -translate-x-7">
                                <li><Link className="text-gray-900 hover:text-gray-500 rounded-full px-3 py-2 text-[16px] font-medium transition-all duration-500 ease-in-out" to={"/"}>Home</Link></li>
                                <li><Link className="text-gray-900 hover:text-gray-500 rounded-full px-3 py-2 text-[16px] font-medium transition-all duration-500 ease-in-out" to={"/Dogs"}>Dogs</Link></li>
                                <li><Link className="text-gray-900 hover:text-gray-500 rounded-full px-3 py-2 text-[16px] font-medium transition-all duration-500 ease-in-out" to={"/Owners"}>Owners</Link></li>
                                <li><Link className="text-gray-900 hover:text-gray-500 rounded-full px-3 py-2 text-[16px] font-medium transition-all duration-500 ease-in-out" to={"/"}>Contact</Link></li>
                            </ul>
                        </div>
                </div>
            </div>
        </nav>
    )
}