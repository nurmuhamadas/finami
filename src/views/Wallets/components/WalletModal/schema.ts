import * as yup from 'yup'

export const registerWalletSchema = yup.object({
  name: yup.string().required('Please fill wallet name!'),
  balance: yup
    .number()
    .max(9007199254740991, 'Maximum balance is 9,007,199,254,740,991')
    .nullable()
    .default(0)
    .required('Please fill balance!'),
})
