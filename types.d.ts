type SearchCharacter = {
    id: number
    name: string
    image: string
}

type Status = "Alive" | "Dead" | "unknown"

type Episode = {
    id: number
    name: string
}

interface DetailedCharacter extends SearchCharacter {
    status: Status
    species: string
    episode: Array<Episode>
}