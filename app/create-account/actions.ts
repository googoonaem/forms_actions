'use server';

import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from "bcrypt";
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true
    }
  });
  return !Boolean(user);
}

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true
    }
  });
  return !Boolean(user);
}

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
      PASSWORD_MIN_LENGTH,
      'Password should be at least 4 characters long.'
    )
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
    .refine(
      passwordCheckSchema,
      'Password should contain at least one number (0123456789).'
    ),
}).superRefine(async ({email}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    }
  })
  if(user) {
    ctx.addIssue({
      code: "custom",
      message: "사용중인 이메일입니다.",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
}).superRefine(async ({username}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    }
  })
  if(user) {
    ctx.addIssue({
      code: "custom",
      message: "사옹중인 이름입니다.",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
});

export const createAccount = async (
  prevState: any,
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
    await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      }
    })
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
};
