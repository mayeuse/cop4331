import React, { useState } from "react"
import styles from "./index.module.css";
import RegisterBody from "./register.tsx";
import LoginBody from "./login.tsx";

interface LandingPageProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Accept setter as a prop
}

const LandingPage = ({ setIsLoggedIn }: LandingPageProps): React.JSX.Element => 
{
    const [content, setContent] = useState(<LandingBody />);

    function Tabs()
    {
        function LandingOn()
        {
        setContent(<LandingBody />)
        }
        
        function RegisterOn()
        {
        setContent(<RegisterBody />)
        }

        function LoginOn()
        {
        setContent(<LoginBody setIsLoggedIn={setIsLoggedIn} />)
        }

        function TeamOn()
        {
        setContent(<Team />)
        }

        return (
        <div>
            <h1 className="text-5xl m-8">Welcome to Appley's Training Regiment (Suspect to Change)</h1>
            <button className={styles.button} onClick={LandingOn}>
            Home
            </button>
            <button className={styles.button} onClick={RegisterOn}>
            Register
            </button>
            <button className={styles.button} onClick={LoginOn}>
            Login
            </button>
            <button className={styles.button} onClick={TeamOn}>
            Our Team
            </button>
        </div>
        )
    }

    function LandingBody()
    {
        return (
        <div className="mx-auto my-8 justify-center size-fit">
            <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2"/>
            <div>
                <h1 className= "text-red">I am Appley, here to make you as MUCHO MACHO as me!</h1>
            </div>
        </div>
        )
    }
    
    function Team() {
        const people = [
        {
            name: 'Billy Bob Joe',
            role: 'Person',
            imageUrl:
            'https://creatorset.com/cdn/shop/files/preview_images/Green_Screen_theia_elmo_staring_meme_1_530x@2x.png?v=1711572280',
        },
        {
            name: 'Billy Bob Joe',
            role: 'Person',
            imageUrl:
            'https://creatorset.com/cdn/shop/files/preview_images/Green_Screen_theia_elmo_staring_meme_1_530x@2x.png?v=1711572280',
        },
        {
            name: 'Billy Bob Joe',
            role: 'Person',
            imageUrl:
            'https://creatorset.com/cdn/shop/files/preview_images/Green_Screen_theia_elmo_staring_meme_1_530x@2x.png?v=1711572280',
        },
        {
            name: 'Billy Bob Joe',
            role: 'Person',
            imageUrl:
            'https://creatorset.com/cdn/shop/files/preview_images/Green_Screen_theia_elmo_staring_meme_1_530x@2x.png?v=1711572280',
        },
        {
            name: 'Billy Bob Joe',
            role: 'Person',
            imageUrl:
            'https://creatorset.com/cdn/shop/files/preview_images/Green_Screen_theia_elmo_staring_meme_1_530x@2x.png?v=1711572280',
        },
        {
            name: 'Billy Bob Joe',
            role: 'Person',
            imageUrl:
            'https://creatorset.com/cdn/shop/files/preview_images/Green_Screen_theia_elmo_staring_meme_1_530x@2x.png?v=1711572280',
        },
        ]

        return (
        <div className="bg-green-200 py-24 sm:py-32 w-3/4 mx-auto my-8">
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-xl">
                <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Meet our leadership
                </h2>
                <p className="mt-6 text-lg/8 text-gray-600">
                We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                best results for our clients.
                </p>
            </div>
            <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                {people.map((person) => (
                <li key={person.name}>
                    <div className="flex items-center gap-x-6">
                    <img alt="" src={person.imageUrl} className="h-16 w-16 rounded-full" />
                    <div>
                        <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                        <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        </div>
        )
    }

    return (
        <div className="text-center">
            <Tabs />
            {content}
        </div>
    );
}

export default LandingPage;