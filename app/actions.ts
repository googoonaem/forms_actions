'use server';

import { z } from 'zod';

const emailCheckSchema = (
  email: string
) => {
  return email.endsWith('@zod.com');
};

const passwordCheckSchema = (
  password: string
) => {
  for (let letter of password) {
    if (!isNaN(Number(letter))) {
      return true;
    }
  }
  return false;
};

interface ActionSchema {
  token: boolean;
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .refine(
      emailCheckSchema,
      'Only @zod.com emails are allowed'
    ),
  username: z
    .string()
    .min(
      5,
      'Username should be at least 5 characters long.'
    ),
  password: z
    .string()
    .min(
      10,
      'Password should be at least 10 characters long.'
    )
    .refine(
      passwordCheckSchema,
      'Password should contain at least one number (0123456789).'
    ),
});

export const handleForm = async (
  prevState: ActionSchema,
  formData: FormData
) => {
  const errors = [];
  await new Promise(resolve =>
    setTimeout(resolve, 1000)
  );
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  };
  const result =
    formSchema.safeParse(data);
  console.log(result.data);
  if (!result.success) {
    return {
      token: false,
      error: result.error.flatten(),
    };
  } else {
    return {
      token: true,
      error: result.error,
    };
  }
};
