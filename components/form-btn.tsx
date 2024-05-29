import { useFormStatus } from "react-dom";

interface FormButtonProps {
    text: string
}

export default function FormButton({text}: FormButtonProps) {
    const {pending} = useFormStatus();
    return (
        <button disabled={pending} className="w-[50%] min-w-[100px] max-w-[550px] text-emerald-800 transition-colors hover:text-emerald-100 bg-[#abe7c2] border-emerald-300 hover:bg-emerald-400 mx-auto btn rounded-full">{pending?"Loading...":text}</button>
    );
}