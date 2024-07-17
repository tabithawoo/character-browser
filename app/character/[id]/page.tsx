import CharacterDetail from "@/components/CharacterDetail";

type CharacterProps = {
	params: {
		id: string
	}
}

const Character = ({ params: { id } }:CharacterProps) => {
    return (
        <CharacterDetail id={+id} />
    )
}

export default Character;