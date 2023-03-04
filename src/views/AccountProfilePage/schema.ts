import * as yup from 'yup'

export const updateProfileSchema = yup.object({
  username: yup.string().required(),
  fullname: yup.string().required('Please fill name!'),
  image_url: yup.string().url(),
})
