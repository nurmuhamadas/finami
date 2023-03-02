import * as yup from 'yup'

export const registerPlanningSchema = yup.object({
  name: yup.string().required('Please fill planning name!'),
  amount: yup.number().nullable().default(0).required('Please fill amount!'),
  wallet_id: yup
    .string()
    .length(20, 'Invalid Wallet')
    .required('Please select wallet!'),
  category_id: yup
    .string()
    .length(20, 'Invalid Category')
    .required('Please select category!'),
  month: yup.date().required('Please select month!'),
})
