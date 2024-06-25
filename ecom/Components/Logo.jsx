import Link from 'next/link'



export default function Logo({extraClass}){
   
    return <>
    <Link className={"flex gap-1 items-center mr-1 " + extraClass} href={'/'}>
            <svg xmlns="http://www.w3.org/2000/svg" className='fill-current w-5 h-5' id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="M24,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H0V2H1.222a1,1,0,0,1,.993.883L3.8,16.351A3,3,0,0,0,6.778,19H20V17H6.778a1,1,0,0,1-.993-.884L5.654,15H21.836Z" /><circle cx="7" cy="22" r="2" /><circle cx="17" cy="22" r="2" /></svg>
                <span>
                    E-Commerce Admin
                </span>
                </Link>
    </>
}