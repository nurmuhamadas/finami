import { type Options } from 'react-tailwindcss-select/dist/components/type'

export function mapDataToSelectOptions<T>(
  data: T[],
  valueSelector: keyof T,
  labelSelector: keyof T,
): Options {
  return data.map((d) => ({
    label: d[labelSelector] as string,
    value: d[valueSelector] as string,
  }))
}
