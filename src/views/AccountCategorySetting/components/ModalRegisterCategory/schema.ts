import * as yup from 'yup'

export const registerCategorySchema = yup.object({
  name: yup.string().required('Please fill Category Name!'),
  group: yup.string().required('Please select Category Group!'),
  transaction_type: yup
    .string()
    .oneOf(['in', 'out'], 'Invalid transaction')
    .required('Please fill Transaction Type!'),
  icon: yup.mixed().required('Please upload icon!'),
})

export const updateCategorySchema = yup.object({
  name: yup.string().required('Please fill Category Name!'),
  group: yup.string().required('Please select Category Group!'),
  transaction_type: yup
    .string()
    .oneOf(['in', 'out'], 'Invalid transaction')
    .required('Please fill Transaction Type!'),
  icon_url: yup.string().required(),
  icon: yup.mixed().optional(),
})
