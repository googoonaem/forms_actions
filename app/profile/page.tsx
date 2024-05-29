import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
            select: {
                username: true,
                email: true,
            }
        });
        if(user) {
            return user;
        }
    }
    notFound();
}

const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
};
 
export default async function Profile() {
    const user = await getUser();
    console.log(user);
    return (
    <main className="flex flex-col min-h-screen justify-center bg-[#d7e0dc]">
      <div className="mx-auto card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100px"
            height="100px"
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
        >
            <path
            d="M513.92 68.71h12A116.59 116.59 0 0 1 642.5 185.3v728.84a41.15 41.15 0 0 1-41.15 41.15H438.48a41.15 41.15 0 0 1-41.15-41.15V185.3A116.59 116.59 0 0 1 513.92 68.71z"
            fill="#4C9589"
            />
            <path
            d="M424 752c-53.89 0-131.52-8.8-183.29-84.94-41.15-60.51-60.32-156.89-60.32-303.31a57.1 57.1 0 1 1 114.19 0c0 119.08 13.64 199.53 40.55 239.1 14.68 21.58 34.66 35 88.86 35A57.1 57.1 0 1 1 424 752zM603.83 584.48a57.1 57.1 0 0 1 0-114.19c50.76 0 78.59-8.07 96-27.86 24.69-28 37.2-87.16 37.2-175.79a57.1 57.1 0 1 1 114.19 0c0 120.56-20.88 200.4-65.72 251.29-51.96 58.98-124.38 66.55-181.67 66.55z"
            fill="#4C9589"
            />
            <path
            d="M438.25 175.29l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M232.017583 381.607965l33.493777-2.10725 5.270637 83.774363-33.493777 2.10725-5.270637-83.774363Z"
            fill="#FFFFFF"
            />
            <path
            d="M220.695979 523.146565l32.46596-8.499119 21.257927 81.203597-32.46596 8.499118-21.257927-81.203596Z"
            fill="#FFFFFF"
            />
            <path
            d="M290.392718 653.891246l16.78-29.063813 72.694172 41.97-16.78 29.063813-72.694172-41.97Z"
            fill="#FFFFFF"
            />
            <path
            d="M733.163193 472.110713l15.584539 29.721975-74.340361 38.979922-15.584539-29.721974 74.340361-38.979923Z"
            fill="#FFFFFF"
            />
            <path
            d="M788.434288 373.40643l31.341442 11.999483-30.013008 78.390962-31.341443-11.999482 30.013009-78.390963Z"
            fill="#FFFFFF"
            />
            <path
            d="M763.93801 259.133152l33.412708 3.140781-7.855695 83.571596-33.412708-3.140781 7.855695-83.571596Z"
            fill="#FFFFFF"
            />
            <path
            d="M438.25 386.54l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M438.25 599.7l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M438.25 810.96l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M507.72 110.58l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M507.72 321.84l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M507.72 534.99l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M507.72 746.25l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M568.62 194.32l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M568.62 405.58l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M568.62 618.74l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M568.62 829.99l33.56 0 0 83.94-33.56 0 0-83.94Z"
            fill="#FFFFFF"
            />
            <path
            d="M183.54 250.68S200 328 239.21 328 299 263 299 263l-35.05 22.68-28.87-68-14.43 59.79z"
            fill="#D77A88"
            />
        </svg>
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">{user.username}</h2>
            <p>{user.email}</p>
            <form className="card-actions" action={logOut}>
                <button className="btn btn-primary">로그아웃</button>
            </form>
        </div>
      </div>
    </main>
    );
  }
  