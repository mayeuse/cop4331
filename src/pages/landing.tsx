import React, { useState } from "react"
import styles from "./index.module.css";
import RegisterBody from "./register.tsx";
import LoginBody from "./login.tsx";

interface LandingPageProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Accept setter as a prop
}

const LandingPage = ({ setIsLoggedIn }: LandingPageProps): React.JSX.Element => 
{
    function Tabs()
    {
        const [activeTab, setActiveTab] = useState("landing");

        const handleTabChange = (tab: string) => {
            setActiveTab(tab);
        };

        return (
            <div className="min-h-screen flex flex-col items-center">
                <h1 className="text-5xl font-bold mt-8 text-red-600 text-center">
                    Welcome to Appley's Training Regiment (Subject to Change)
                </h1>
                <div className="mt-3">
                    <div className="flex border-b border-yellow-700">
                    <button
                        className={`py-3 px-8 ${
                        activeTab === "landing"
                            ? "border-b-2 border-yellow-700 text-lime-900 font-bold"
                            : "text-yellow-700 hover:text-lime-900"
                        }`}
                        onClick={() => handleTabChange("landing")}
                    >
                        Home
                    </button>
                    <button
                        className={`py-3 px-8 ${
                        activeTab === "register"
                            ? "border-b-2 border-yellow-700 text-lime-900 font-bold"
                            : "text-yellow-700 hover:text-lime-900"
                        }`}
                        onClick={() => handleTabChange("register")}
                    >
                        Register
                    </button>
                    <button
                        className={`py-3 px-8 ${
                        activeTab === "login"
                            ? "border-b-2 border-yellow-700 text-lime-900 font-bold"
                            : "text-yellow-700 hover:text-lime-900"
                        }`}
                        onClick={() => handleTabChange("login")}
                    >
                        Login
                    </button>
                    <button
                        className={`py-3 px-8 ${
                        activeTab === "team"
                            ? "border-b-2 border-yellow-700 text-lime-900 font-bold"
                            : "text-yellow-700 hover:text-lime-900"
                        }`}
                        onClick={() => handleTabChange("team")}
                    >
                        Our Team
                    </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mt-8 max-w-3/4 w-full px-4">
                    {activeTab === "landing" && <LandingBody />}
                    {activeTab === "register" && <RegisterBody />}
                    {activeTab === "login" && <LoginBody setIsLoggedIn={setIsLoggedIn} />}
                    {activeTab === "team" && <Team />}
                </div>
            </div>
        );
    }

    function LandingBody()
    {
        return (
        <div className="mx-auto my-8 justify-center size-fit">
            <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2"/>
            <div>
                <h1 className= "text-rose-500">I am Appley, here to make you as MUCHO MACHO as me!</h1>
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
        <div className={`${styles.wrappercolor} py-24 sm:py-32 w-3/4 mx-auto my-8 rounded-lg`}>
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-xl">
                <h2 className="text-pretty text-3xl font-semibold tracking-tight text-red-600 sm:text-4xl">
                Our Team
                </h2>
                <p className="mt-6 text-lg/8 text-rose-500">
                Something goes here I guess
                </p>
            </div>
            <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                {people.map((person) => (
                <li key={person.name}>
                    <div className="flex items-center gap-x-6">
                    <img alt="" src={person.imageUrl} className="h-16 w-16 rounded-full" />
                    <div>
                        <h3 className="text-base/7 font-semibold tracking-tight text-rose-500">{person.name}</h3>
                        <p className="text-sm/6 font-semibold text-lime-900">{person.role}</p>
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
        </div>
    );
}

export default LandingPage;