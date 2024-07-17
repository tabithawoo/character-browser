import Image from "next/image";
import Link from "next/link";

interface CharacterCardProps {
    character: SearchCharacter
}

const CharacterCard = ({character}:CharacterCardProps) => {
    return (
        <Link href={`/character/${character.id}`} prefetch={false}>
            <div className="mx-auto mb-5 flex items-center border-2 border-teal-600 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 gap-2">
                <Image src={character.image} className="rounded-md" width="100" height="100" alt={`${character.name} avatar`} />
                <h3 className="text-xl font-semibold mb-2 overflow-hidden overflow-ellipsis break-words line-clamp-3">{character.name}</h3>
            </div>
        </Link>
    )
}

export default CharacterCard;