import * as yup from 'yup'

export const registerWalletSchema = yup.object({
  name: yup.string().required('Please fill wallet name!'),
  balance: yup.number().nullable().default(0).required('Please fill balance!'),
})
