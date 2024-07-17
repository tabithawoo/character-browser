import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Rick & Morty Character Browser",
	description: "A coding project by Tabitha Woo",
};

export default function RootLayout({
	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<Providers>
					<Header />
					<main className="relative pb-10 flex-grow">
						{children}
						<ScrollToTopButton />
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
