interface FormButtonProps {
    loading: boolean,
    text: string
}

export default function FormButton({loading, text}: FormButtonProps) {
    return (
        <button disabled={loading} className="w-[50%] max-w-[550px] mx-auto btn rounded-full">{loading?"Loading...":text}</button>
    );
}