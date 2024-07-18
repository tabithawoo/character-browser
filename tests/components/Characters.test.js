import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { mockGetSearchParams } from "@/__mocks__/next/navigation";
import Characters, { GET_CHARACTERS } from "@/components/Characters";
import { get } from "https";

let mockQuery;

const getMockQuery = ({ pageRequestVariable, nextPage }) => {
    return {
        request: {
            query: GET_CHARACTERS,
            ...pageRequestVariable && {
                variables: {
                    page: pageRequestVariable,
                    name: ""
                }
            }
        },
        result: {
            data: {
                characters: {
                    info: {
                        next: nextPage || null
                    },
                    results: nextPage === 3 ? 
                        [{ id: 12, image: "/test2.jpg", name: "Annie" }] : 
                        [{ id: 1, image: "/test.jpg", name: "Colossus" }]
                }
            }
        }
    }
}

afterEach(() => {
    mockGetSearchParams.mockReset();
});

describe("Characters", () => {
    beforeEach(() => {
        mockGetSearchParams.mockReturnValue("");
        mockQuery = getMockQuery({ pageRequestVariable: 1, nextPage: null });
    });

    it("Displays the search bar", async () => {
        render(
            <MockedProvider mocks={[mockQuery]} addTypename={false}>
                <Characters />
            </MockedProvider>
        );
        expect(await screen.findByRole("textbox")).toBeInTheDocument();
    });

    it("Displays the character cards", async () => {
        render(
            <MockedProvider mocks={[mockQuery]} addTypename={false}>
                <Characters />
            </MockedProvider>
        );
        expect(await screen.findByRole("heading", { name: "Colossus" })).toBeInTheDocument();
        expect(await screen.findByRole("img", { name: "Colossus avatar" })).toBeInTheDocument();
    });

    it("Displays the Load More button", async () => {
        const firstPageQuery = getMockQuery({ pageRequestVariable: 1, nextPage: 2 });
        const secondPageQuery = getMockQuery({ pageRequestVariable: 2, nextPage: 3 });
        render(
            <MockedProvider mocks={[firstPageQuery, secondPageQuery]} addTypename={false}>
                <Characters />
            </MockedProvider>
        );
        const loadMore = await screen.findByRole("button", { name: "Load More" });
        expect(loadMore).toBeInTheDocument();
        fireEvent.click(loadMore);
        await waitFor(() => {
            expect(screen.getByRole("heading", { name: "Annie" })).toBeInTheDocument();
            expect(screen.getByRole("heading", { name: "Colossus" })).toBeInTheDocument();
        });
    });

    it("Does not display the Load More button if there is no next page", async () => {
        render(
            <MockedProvider mocks={[mockQuery]} addTypename={false}>
                <Characters />
            </MockedProvider>
        );
        expect(await screen.queryByRole("button", { name: "Load More" })).not.toBeInTheDocument();
    });
});

describe("Characters query variables", () => {
    const mockVariableMatcher = jest.fn().mockReturnValue(true);
    let mockQuery2;

    beforeAll(() => {
        mockQuery = getMockQuery({ pageRequestVariable: null, nextPage: 2 });
        mockQuery.variableMatcher = mockVariableMatcher;
        mockQuery2 = getMockQuery({ pageRequestVariable: null, nextPage: 3 });
        mockQuery2.variableMatcher = mockVariableMatcher;
    });

    afterEach(() => {
        mockVariableMatcher.mockClear();
    });
    
    it("Applies the search name to the search", async () => {
        mockGetSearchParams.mockReturnValue("Princess");
        render(
            <MockedProvider mocks={[mockQuery]} addTypename={false}>
                <Characters />
            </MockedProvider>
        );
        await waitFor(() =>
            expect(mockVariableMatcher).toHaveBeenCalledWith(expect.objectContaining({
                page: 1,
                name: "Princess",
            }))
        );
    });

    it("Searches for the next page", async () => {
        mockGetSearchParams.mockReturnValue("");
        render(
            <MockedProvider mocks={[mockQuery, mockQuery2]} addTypename={false}>
                <Characters />
            </MockedProvider>
        );
        const loadMore = await screen.findByRole("button", { name: "Load More" });
        fireEvent.click(loadMore);
        await waitFor(() => {
            expect(mockVariableMatcher).toHaveBeenCalledTimes(2);
            expect(mockVariableMatcher).toHaveBeenCalledWith(expect.objectContaining({
                page: 2,
                name: ""
            }));
        });
    });

    it("Searches for the next page with a search term", async () => {
        mockGetSearchParams.mockReturnValue("rick");
        render(
            <MockedProvider mocks={[mockQuery, mockQuery2]} addTypename={false}>
                <Characters />
            </MockedProvider>
        );
        const loadMore = await screen.findByRole("button", { name: "Load More" });
        fireEvent.click(loadMore);
        await waitFor(() => {
            expect(mockVariableMatcher).toHaveBeenCalledTimes(2);
            expect(mockVariableMatcher).toHaveBeenCalledWith(expect.objectContaining({
                page: 2,
                name: "rick"
            }));
        });
    });
});

describe("Characters with query errors", () => {
    it("Displays an error message", async () => {
        const errorMock = {
            request: { 
                query: GET_CHARACTERS,
                variables: { page: 1, name: "" }
            },
            error: new Error("Error message")
        }
        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Characters />
            </MockedProvider>
        );
        expect(await screen.findByText("There's a lesson here, and I'm not going to be the one to figure it out.")).toBeInTheDocument();
    });

    it("Displays a message if there are no characters", async () => {
        const emptyMock = getMockQuery({ pageRequestVariable: 1, nextPage: null });
        emptyMock.result.data.characters.results = [];
        render(
            <MockedProvider mocks={[emptyMock]} addTypename={false}>
                <Characters />
            </MockedProvider>
        )
        expect(await screen.findByText("Boom! Big reveal! I turned myself into a pickle!")).toBeInTheDocument();
    });
});