"use client";

import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import CharacterCard from "@/components/CharacterCard";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingMessage from "@/components/LoadingMessage";
import SearchBar from "@/components/SearchBar";

const GET_CHARACTERS = gql`
    query GetCharacters($page: Int!, $name: String) {
        characters(page: $page, filter: { name: $name}) {
          	info {
              	next
          	}
         	results {
              	id
            	image
              	name
          	}
        }
    }
`

const Characters = () => {
	const searchParams = useSearchParams();
	const searchName = searchParams.get("searchName") || "";
    const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
      	variables: {
			page: 1,
			name: searchName
		}
    });
    const queryInfo = data?.characters?.info;
    const characters:Array<SearchCharacter> = data?.characters?.results || [];

    if(loading) {
        return <LoadingMessage />
    }

    if(error) {
        return <ErrorMessage />
    }

    const handleLoadNext = () => {
		fetchMore({
			variables: {page: queryInfo.next, name: searchName},
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if(!fetchMoreResult) return prevResult;
				return {
					characters: {
						info: {
							...fetchMoreResult.characters.info
						},
						results: [
							...prevResult.characters.results,
							...fetchMoreResult.characters.results
						]
					}
				}
			}
		});
    }

    return (<>
		<SearchBar name={searchName} />
		{characters.length > 0 ?
			<div className="mt-5 max-w-screen-lg lg:mx-auto mx-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{characters.map((c) => <CharacterCard key={c.id} character={c} />)}
			</div>
		:
			<div className="text-center mt-10 px-2">
				<h4 className="text-2xl">Boom! Big reveal! I turned myself into a pickle!</h4>
				<p>Oh wait, we just didn't find any results...</p>
			</div>
		}
        {queryInfo.next &&
			<div className="mt-5 text-center">
				<Button onClick={handleLoadNext} text="Load More" variation="outlined" />
			</div>            
        }
    </>)
}

export default Characters;