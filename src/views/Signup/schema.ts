import * as yup from 'yup'

export const signupSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Should have at least 3 characters')
    .max(30, 'Maxium 30 characters')
    .required('Please fill username!'),
  fullname: yup
    .string()
    .min(3, 'Should have at least 3 characters')
    .required('Please fill Full Name!'),
  email: yup
    .string()
    .email()
    .max(50, 'Maxium 50 characters')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email!')
    .required('Please fill Email!'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      'Password should contain lowercase, uppercase, number, special character, and minimal 8 character.',
    )
    .required('Please fill password!'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords doesn't match!")
    .required('Please fill Confirm Password!'),
})
