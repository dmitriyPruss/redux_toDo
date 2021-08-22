import * as yup from 'yup';

export const LOGIN_SCHEMA = yup.object({
  email: yup
    .string()
    .email('Your message')
    .required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[!@#$%^&*].*).{8,32}$/,
      'Password must contain...'
    )
    .min(8)
    .max(32)
    .required(),
});

export const INPUT_SCHEMA = yup.object({
  body: yup.string().required('field musn`t be empty!'),
});
