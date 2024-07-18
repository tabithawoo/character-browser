export const mockPush = jest.fn();
export const mockBack = jest.fn();
export const mockGetSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
        back: mockBack,
    }),
    useSearchParams: () => ({
        get: mockGetSearchParams,
    }),
    usePathname: () => "",
}))