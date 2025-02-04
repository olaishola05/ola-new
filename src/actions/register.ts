"use server";

import AuthService from "@/app/api/services/user.service";
import { sendOtpMessage } from "@/app/api/utils";
import { registerSchema } from "@/app/utils";
import { redirect } from "next/navigation";

interface IData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormState {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  success?: boolean;
  message?: string;
}

export async function register(formState: FormState, formData: FormData): Promise<FormState> {
  let userId: string;
  try {
    const rawFormData = {} as IData;
    rawFormData['name'] = formData.get('name') as string || '';
    rawFormData['email'] = formData.get('email') as string || '';
    rawFormData['password'] = formData.get('password') as string || '';
    rawFormData['confirmPassword'] = formData.get('confirmPassword') as string || '';

    const result = registerSchema.safeParse(rawFormData);

    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors };
    }
    const { name, email, password } = result.data;
    const response = await AuthService.register(name, email, password);
    if (response.errors) {
      return { errors: { _form: [response.errors.message] } }
    }
    userId = response.data?.id ?? '';
    const { data, error } = await sendOtpMessage({ name, email, otp: response?.data?.otp ?? '' })
    if (error) {
      return { errors: { _form: [error.message] } }
    }
  } catch (error: any) {
    return { errors: { _form: [error.message] } };
  }
  redirect(`/auths/verify-account?id=${userId}`);
}