import { useEffect, useRef, useState } from 'react'
import ReactCrop, { type PixelCrop } from 'react-image-crop'

import dynamic from 'next/dynamic'

import MyButton from 'components/MyButton'

import AdjustTools from './AdjustTools'
import { canvasPreview } from './canvasPreview'
import { type AdjustToolsResult, type ModalAdjustmentProps } from './types'

const MyModal = dynamic(async () => await import('components/MyModal'))

const ModalAdjustment = ({
  image,
  adjusmentSetting,
  onClose,
  onCrop,
}: ModalAdjustmentProps) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [crop, setCrop] = useState<PixelCrop>(null)
  const [imgProps, setImgProps] = useState<AdjustToolsResult>(null)
  const [cropError, setCropError] = useState(false)
  const [imgWidth, setImgWidth] = useState(null)

  useEffect(() => {
    if (image && imageRef.current) {
      const width = imageRef.current.clientWidth
      const height = imageRef.current.clientHeight
      const dimensi = Math.min(width, height)
      setImgWidth(width)

      setCrop({
        unit: 'px',
        height: dimensi,
        width: dimensi,
        x: 0,
        y: 0,
      })
    }
    setCropError(false)
  }, [imageRef.current, image])
  console.log(imgWidth)

  const handleCrop = () => {
    if (crop?.height === 0 || crop?.width === 0) {
      setCropError(true)
      return
    }
    if (previewCanvasRef.current) {
      previewCanvasRef.current.toBlob((blob) => {
        onCrop(blob)
      })
    }
  }

  return (
    <MyModal
      show={!!image}
      onClose={() => {
        setCrop(null)
        onClose()
      }}
      header={<span>Adjust Image</span>}
    >
      <div className="flex flex-col gap-y-4">
        <ReactCrop
          style={{
            width: imageRef.current?.clientWidth || '100%',
          }}
          crop={crop}
          aspect={
            adjusmentSetting.fixScale ? adjusmentSetting.scale : undefined
          }
          circularCrop={adjusmentSetting.radial}
          onChange={(c) => {
            setCrop(c)
          }}
          minWidth={100}
          onComplete={async (c) => {
            if (
              c?.width &&
              c?.height &&
              imageRef.current &&
              previewCanvasRef.current
            ) {
              await canvasPreview(
                imageRef.current,
                previewCanvasRef.current,
                c,
                imgProps,
              )
            }
          }}
        >
          <img
            ref={imageRef}
            src={image as string}
            className="!max-h-96 object-fill"
            style={{
              transform: imgProps?.transform,
            }}
          />
        </ReactCrop>

        {cropError && <span className="text-red-500">Please crop image!</span>}

        <AdjustTools
          onCrop={async () => {
            const width = imageRef.current.clientWidth
            const height = imageRef.current.clientHeight
            const dimensi = Math.min(width, height)

            const _crop: PixelCrop = {
              unit: 'px',
              height: dimensi,
              width: dimensi,
              x: 0,
              y: 0,
            }

            await canvasPreview(
              imageRef.current,
              previewCanvasRef.current,
              _crop,
              imgProps,
            )
            setCrop(_crop)
          }}
          onChange={async (props) => {
            setImgProps(props)
            setCropError(false)

            await canvasPreview(
              imageRef.current,
              previewCanvasRef.current,
              crop,
              props,
            )
          }}
        />

        <MyButton className="ml-auto" colorType="primary" onClick={handleCrop}>
          Crop
        </MyButton>
      </div>
      <canvas
        ref={previewCanvasRef}
        style={{
          display: 'none',
          objectFit: 'cover',
          width: crop?.width,
          height: crop?.height,
        }}
      />
    </MyModal>
  )
}

export default ModalAdjustment
