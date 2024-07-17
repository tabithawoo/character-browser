"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingMessage from "@/components/LoadingMessage";
import Status from "@/components/Status";

const GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
        character(id: $id) {
            id
            name
            image
            status
            species
            episode {
                id
                name
            }
        }
    }
`

const CharacterDetail = ({id}:{id:number}) => {
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id: id }
    });

    const character:DetailedCharacter = data?.character;

    const handleBackClick = () => {
        router.back();
    }

    if(loading) {
        return <LoadingMessage />
    }

    if(error) {
        return <ErrorMessage />
    }

    return (
        <div className="max-w-screen-md mx-auto pt-3 grid grid-cols-5">
            <div className="col-span-5 px-2 text-center sm:text-left">
                <button onClick={handleBackClick} className="mb-2 hover:underline">&lt; Go Back</button>
            </div>
            <div className="text-center col-span-5 sm:col-span-3">
                <div className="rounded-lg bg-gray-50 inline-block p-1 sm:p-3 text-center sm:text-left">
                    <Image src={character.image} className="mx-auto sm:mx-0 mb-2" width={300} height={300} alt={`${character.name} avatar`} />
                    <h2 className="text-2xl font-bold">{character.name}</h2>
                    <h4 className="text-l">Status: <Status status={character.status} /></h4>
                    <h4 className="text-l">Species: {character.species}</h4>
                </div>
            </div>
            <div className="col-span-5 sm:col-span-2">
                <div className="ml-2">
                    <h3 className="text-xl mb-1">Appears in:</h3>
                    {character.episode.map((e) => {
                        return (
                            <p key={e.id}>{e.name}</p>
                        )}
                    )}
                </div>
            </div>
        </div>
    )
}

export default CharacterDetail;