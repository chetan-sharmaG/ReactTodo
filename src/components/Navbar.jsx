import React from 'react'


const Navbar = ()=>{
    return (
        <nav className="flex justify-between bg-slate-700 text-white mx-auto">
            <div className='logo mx-8 my-2'><span className="font-bold text-xl ">iTask</span></div>
            <ul className='flex mx-10 my-2 gap-5'>
                <li className='hover:font-bold cursor-pointer'>Home</li>
                <li className='hover:font-bold cursor-pointer'>Your Task</li>
            </ul>
            
        </nav>
    )
}

export default Navbar