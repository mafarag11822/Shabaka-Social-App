import * as zod from "zod";
import { regex } from "../utils/regex";

export const signInSchema = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .regex(regex.email, "Enter a valid email"),
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
});
