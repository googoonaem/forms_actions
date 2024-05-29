'use server';

import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from "bcrypt";
import getSession from '@/lib/session';

const formSchema = z.object({
  email: z
    .string()
    .email()
    .trim(),
    // .refine(checkEmailExists, "존재하지 않는 이메일입니다."),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      'Password should be at least 4 characters long.'
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
  if(!user) {
    ctx.addIssue({
      code: "custom",
      message: "존재하지 않는 이메일입니다.",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
});

export const logIn = async (
  prevState: any,
  formData: FormData
) => {
  const errors = [];
  await new Promise(resolve =>
    setTimeout(resolve, 1000)
  );
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result =
    await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "xxx");
    if(ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 다릅니다."],
          email: [],
        }
      }
    }
  }
};
