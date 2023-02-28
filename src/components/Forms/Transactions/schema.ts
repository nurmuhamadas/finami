import * as yup from 'yup'

export const registerTransactionSchema = yup.object({
  amount: yup.number().nullable().default(0).required('Please fill amount!'),
  description: yup.string().required('Please fill description!'),
  wallet_id: yup
    .string()
    .length(20, 'Invalid Wallet')
    .required('Please select wallet!'),
  category_id: yup
    .string()
    .length(20, 'Invalid Category')
    .required('Please select category!'),
  date: yup.date().required('Please feel description!'),
})
