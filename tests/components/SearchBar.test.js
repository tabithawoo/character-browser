import { fireEvent, render, screen } from "@testing-library/react";
import { mockPush } from "@/__mocks__/next/navigation";
import SearchBar from "@/components/SearchBar";

describe("Search Bar", () => {
    it("Has an input and button", () => {
        render(<SearchBar />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
    });

    it("Updates the route when a name is submitted", () => {
        render(<SearchBar />);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "morty" }});
        fireEvent.click(screen.getByRole("button"));
        expect(mockPush).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith("?searchName=morty")
    });

    it("Displays the current search name and Clear link", () => {
        render(<SearchBar name="benjamin" />);
        expect(screen.getByText("Displaying results for \"benjamin\"")).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Clear"})).toBeInTheDocument();
    });
});