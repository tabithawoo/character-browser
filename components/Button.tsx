interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
    variation?: "filled" | "outlined"
    classes?: string
}

const Button = ({text, variation="filled", classes, ...props}:ButtonProps) => {
    return (
        <button {...props} className={`${variation === "filled" ? "bg-teal-700 text-white hover:bg-teal-800" : "border-2 border-teal-600 text-black hover:bg-teal-600 hover:text-white"} rounded-lg font-bold py-2 px-5 ${classes}`}>{text}</button>
    )
}

export default Button;