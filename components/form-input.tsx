interface FormInputProps {
    type: string,
    placeholder: string,
    required: boolean,
    errors: string[],
    icon: string
}

export default function FormInput({type, placeholder, required, errors,icon}: FormInputProps) {
    const selectSvg = (str:string) => {
        switch (str) {
            case "email":
                return (
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>
                );
            case "username":
                return (
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
                );
            case "password":
                return (
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" />
</svg>
                );
            default:
                break;
        }
    }
    return (
        <div className="w-[50%] max-w-[550px] mx-auto flex flex-col gap-2">
            <label className="input input-bordered rounded-full flex items-center gap-2 border-neutral-200">
                <span className="*:size-6 *:text-neutral-600">
                    {selectSvg(icon)}
                </span>
                <input type={type} className="hover:cursor-text focus:border-transparent focus:ring-0 grow outline-none placeholder:text-gray-300 border-none bg-transparent" placeholder={placeholder} required={required} />
            </label>
            {errors.map((error, index)=>(
                <span key={index} className="text-red-500 font-medium ">{error}</span>
            ))}
        </div>
    );
}