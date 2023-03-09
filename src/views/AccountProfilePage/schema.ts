import * as yup from 'yup'

export const updateProfileSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  fullname: yup.string().required('Please fill name!'),
  image_url: yup.string().url(),
})
