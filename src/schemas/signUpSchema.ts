import * as zod from "zod";
import { regex } from "../utils/regex";
import { getAge } from "../utils/functions";

export const signUpSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    username: zod
      .string()
      .regex(
        /^(?=.{5,15}$)[a-zA-Z]{3,}_[0-9]+$/,
        "Username must be 5-15 characters: at least 3 letters, then an underscore (_), then at least 1 number (e.g. john_12)",
      )
      .optional()
      .or(zod.literal("")),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(regex.email, "Enter a valid email"),
    dateOfBirth: zod
      .string()
      .nonempty("Date of birth is required")
      .refine((date) => getAge(date) >= 18, "Age must be at least 18"),
    gender: zod
      .string()
      .nonempty("Gender is required")
      .regex(regex.gender, `Gender must be Male or Female`),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        regex.password,
        `requires at least one lowercase letter.
      / requires at least one uppercase letter.
      / requires at least one digit.
      / requires at least one special character from this exact list:( @ $ ! % * ? & )`,
      ),
    rePassword: zod.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Confirm password & password must be the same",
    path: ["rePassword"],
  });
