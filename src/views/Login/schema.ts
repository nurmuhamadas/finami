import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup.string().required('Please fill username!'),
  password: yup.string().required('Please fill password!'),
})
