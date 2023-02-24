import * as yup from 'yup'

export const registerWalletSchema = yup.object({
  name: yup.string().required('Please fill wallet name!'),
  balance: yup.number().nullable().default(0).required('Please fill balance!'),
  user_id: yup
    .string()
    .length(20, 'Invalid wallet owner')
    .required('Please select owner!'),
})
