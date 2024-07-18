import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { mockBack } from "@/__mocks__/next/navigation";
import CharacterDetail, { GET_CHARACTER } from "@/components/CharacterDetail";

const mockVariableMatcher = jest.fn().mockReturnValue(true);

const mockQuery = {
    request: {
        query: GET_CHARACTER,
    },
    variableMatcher: mockVariableMatcher,
    result: {
        data: {
            character: {
                id: 3,
                name: "Summer Smith",
                image: "/detail.jpg",
                species: "Human",
                status: "Alive",
                episode: [
                    { id: 1, name: "Rick Potion #9" },
                    { id: 2, name: "Raising Gazorpazorp" }
                ],
            }
        }
    }
}

describe("Character Detail", () => {
    it("Displays the character details", async () => {
        render(
            <MockedProvider mocks={[mockQuery]} addTypename={false}>
                <CharacterDetail id={3} />
            </MockedProvider>
        );
        expect(await screen.findByRole("heading", {name: "Summer Smith"})).toBeInTheDocument();
        expect(await screen.findByRole("img", { name: "Summer Smith avatar" })).toBeInTheDocument();
        expect(await screen.findByText("Alive")).toBeInTheDocument();
        expect(await screen.findByText((_element, content) => content.textContent.includes("Human") && content.tagName === "H4")).toBeInTheDocument();
        expect(await screen.findByText("Rick Potion #9")).toBeInTheDocument();
        expect(await screen.findByText("Raising Gazorpazorp")).toBeInTheDocument();
    });

    it("Has a back button", async () => {
        render(
            <MockedProvider mocks={[mockQuery]} addTypename={false}>
                <CharacterDetail id={3} />
            </MockedProvider>
        );
        const back = await screen.findByRole("button", { name: "< Go Back" });
        expect(back).toBeInTheDocument();
        fireEvent.click(back);
        expect(mockBack).toHaveBeenCalled();
    });

    it("Inserts the character id in the query", async () => {
        render(
            <MockedProvider mocks={[mockQuery]} addTypename={false}>
                <CharacterDetail id={3} />
            </MockedProvider>
        );
        await waitFor(() =>
            expect(mockVariableMatcher).toHaveBeenCalledWith(expect.objectContaining({
                id: 3
            }))
        );
    });
});

describe("Character Detail errors", () => {
    it("Displays an error message", async () => {
        const errorMock = {
            request: { 
                query: GET_CHARACTER,
                variables: { id: null }
            },
            error: new Error("Response not successful")
        }
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <CharacterDetail id={null} />
            </MockedProvider>
        );
        expect(await screen.findByText("There's a lesson here, and I'm not going to be the one to figure it out.")).toBeInTheDocument();
    });
});