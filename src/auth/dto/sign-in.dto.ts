/* eslint-disable */
import { IsAlphanumeric, Length, Matches } from "class-validator";

export class SignInDto  {
  
  @IsAlphanumeric()
  @Length(4, 18)
  readonly username: string;

  @Length(6, 64, {
    message: 'Password length should be a minimum of 6 characters',
  })
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})$/, {
    message:
      'Password must contain 1 or more special characters, uppercase letters, lowercase letters',
  })
  readonly password: string;
}