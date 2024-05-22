"use server";

export const handleForm = async (prevState:any, formData: FormData) => {
    console.log(prevState);
    console.log(formData.get("email"), formData.get("username"), formData.get("password"));
    const errors = [];
    let success;
    await new Promise((resolve)=> setTimeout(resolve, 3000));
    if(formData.get("password") === "12345") {
        success="welcome back!";
    } else {
        errors.push("wrong password");
    }  
    return {
        errors, success
    }
}