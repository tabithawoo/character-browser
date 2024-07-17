import "@/styles/characterStatus.css";

interface StatusProps {
    status: Status
}

const Status = ({status}:StatusProps) => {
    return (
        <span className={status.toLowerCase()}>{status}</span>
    )
}

export default Status;