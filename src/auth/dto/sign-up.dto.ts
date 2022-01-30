/* eslint-disable */

/* eslint-disable */
import { IsEmail, Length, Matches, IsAlphanumeric } from 'class-validator'

export class SignUpDto {

  @IsEmail({}, { message: 'Invalid E-mail format' })
  readonly email: string;

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