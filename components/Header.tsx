import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-teal-600 p-4">
            <div className="container mx-auto text-center">
                <Link href="/"><h1 className="text-white text-3xl font-bold">Character Browser</h1></Link>
            </div>
        </header>
    )
}

export default Header;