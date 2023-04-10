import { type ChangeEventHandler, useState } from 'react'

import cn from 'classnames'

import MyButton from 'components/MyButton'

import ModalAdjustment from './ModalAdjustment'
import { type ImageUploaderProps } from './types'

const ImageUploader = ({
  wrapperClassName,
  inputClassName,
  showFileName,
  maxFileSize = 1024 * 1024 * 10,
  direction = 'horizontal',
  adjusmentSetting = {
    scale: 1,
    fixScale: false,
    radial: false,
  },
  onOk,
}: ImageUploaderProps) => {
  const [image, setImage] = useState<string | ArrayBuffer>(null)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState(null)

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    const file = e.target.files[0]

    if (file.size > maxFileSize) {
      setError(`Error: maximum file size is ${maxFileSize / 1024 ** 2} Mb`)
      return
    }

    setError(null)
    setFileName(file?.name)
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <div
      className={cn(
        'flex items-center text-center gap-2',
        { 'flex-col': direction === 'vertical' },
        wrapperClassName,
      )}
    >
      <div className="relative">
        <MyButton color="light">Upload</MyButton>
        <input
          key={+new Date()}
          type="file"
          accept="image/*"
          onInput={onSelectFile}
          size={maxFileSize}
          className={cn(
            inputClassName,
            'absolute w-full h-full left-0 top-0 opacity-0',
          )}
        />
      </div>
      <span
        className={cn('text-sm text-slate-400 font-light', {
          hidden: !!fileName || error,
        })}
      >
        Maximum file size: {maxFileSize / 1024 ** 2} Mb
      </span>
      <span
        className={cn('text-sm text-slate-600', {
          hidden: !showFileName || error,
        })}
      >
        {fileName}
      </span>
      <span className={cn('text-sm text-red-500', { hidden: !error })}>
        {error}
      </span>

      <ModalAdjustment
        image={image}
        adjusmentSetting={adjusmentSetting}
        onClose={() => {
          setImage(null)
          setFileName(null)
        }}
        onCrop={(imgBlob) => {
          setImage(null)
          const file = new File([imgBlob], fileName, { type: imgBlob.type })
          onOk(file)
        }}
      />
    </div>
  )
}

export default ImageUploader
