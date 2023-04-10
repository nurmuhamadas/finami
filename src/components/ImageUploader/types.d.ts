import { MutableRefObject } from 'react'

type AdjusmentSettingType = {
  radial?: boolean
  fixScale?: boolean
  scale: number
}

export type ImageUploaderProps = {
  showFileName?: boolean
  direction?: 'vertical' | 'horizontal'
  wrapperClassName?: string
  inputClassName?: string
  maxFileSize?: number
  adjusmentSetting?: AdjusmentSettingType
  onOk: (image: File) => void
}

export type ModalAdjustmentProps = {
  image: string | ArrayBuffer
  adjusmentSetting: AdjusmentSettingType
  onClose: () => void
  onCrop: (imageBlob: Blob) => void
}

export type AdjustToolsResult = {
  transform: string
  scale: number
  rotate: number
  mirrorX: number
  mirrorY: number
  translateX: number
  translateY: number
}

export type AdjustToolsProps = {
  onChange: (res: AdjustToolsResult) => void
  onCrop: () => void
}
