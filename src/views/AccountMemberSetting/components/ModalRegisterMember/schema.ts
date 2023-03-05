import * as yup from 'yup'

export const registerMemberSchema = yup.object({
  username: yup.string().required('Please fill username!'),
  email: yup.string().email().required('Please fill email!'),
  fullname: yup.string().required('Please fill name!'),
  parent_id: yup.string().nullable(),
  password: yup.string().required('Please fill password!'),
})
