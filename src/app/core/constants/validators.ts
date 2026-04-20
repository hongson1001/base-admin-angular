import { Validators } from '@angular/forms';

// Min 8 chars, uppercase + lowercase + digit + special char
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/;

export const passwordValidators = [
  Validators.required,
  Validators.minLength(PASSWORD_MIN_LENGTH),
  Validators.pattern(PASSWORD_PATTERN),
];

export const emailValidators = [Validators.required, Validators.email];
