"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";

interface SearchBarProps {
    name?: string
}

const SearchBar = ({name=""}:SearchBarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [inputTerm, setInputTerm] = useState<string>("");

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        router.push(`${pathname}?searchName=${inputTerm}`);
    }

    return (
        <div className="flex flex-col items-center space-y-4 mt-5 px-2">
            <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-row flex-wrap justify-center items-stretch text-center">
                <h4 className="py-1 mr-1 sm:mr-3 font-bold w-full md:w-auto">Search by Name:</h4>
                <input type="text" value={inputTerm} onChange={(e)=>setInputTerm(e.target.value)}
                    className="border border-gray-400 rounded-l-md p-1" placeholder="e.g. Alien Morty"
                />
                <Button text="Go" type="submit" classes="rounded-l-none rounded-r-md py-1 px-2" />
            </form>
            {name &&
                <div className="flex">
                    <h5>Displaying results for "{name}"</h5>
                    <p className="text-teal-900 pl-3">(<Link href="/" className="underline hover:text-black">Clear</Link>)</p>
                </div>
            }
        </div>
    )
}

export default SearchBar;