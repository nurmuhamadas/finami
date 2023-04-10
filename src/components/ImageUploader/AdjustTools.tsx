import { useEffect, useState } from 'react'
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineRotateLeft,
  AiOutlineRotateRight,
} from 'react-icons/ai'
import { BiCrop, BiZoomIn, BiZoomOut } from 'react-icons/Bi'
import { TbFlipHorizontal, TbFlipVertical } from 'react-icons/tb'

import MyButton from 'components/MyButton'

import { type AdjustToolsProps } from './types'

const AdjustTools = ({ onChange, onCrop }: AdjustToolsProps) => {
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [mirrorX, setMirrorX] = useState(1)
  const [mirrorY, setMirrorY] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    onChange({
      transform: `scale(${mirrorX * scale}, ${
        mirrorY * scale
      }) rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`,
      scale,
      rotate,
      mirrorX,
      mirrorY,
      translateX,
      translateY,
    })
  }, [scale, rotate, mirrorX, mirrorY, translateX, translateY])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <MyButton color="light" onClick={onCrop}>
          <BiCrop />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setRotate(rotate + 90)
          }}
        >
          <AiOutlineRotateLeft />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setRotate(rotate - 90)
          }}
        >
          <AiOutlineRotateRight />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setMirrorX(-mirrorX)
          }}
        >
          <TbFlipVertical />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setMirrorY(-mirrorY)
          }}
        >
          <TbFlipHorizontal />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setScale(scale + 0.5)
          }}
        >
          <BiZoomIn />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setScale(scale - 0.5)
          }}
        >
          <BiZoomOut />
        </MyButton>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <MyButton
          color="light"
          onClick={() => {
            setTranslateY(translateY - mirrorX * 50)
          }}
        >
          <AiOutlineArrowUp />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setTranslateY(translateY + mirrorY * 50)
          }}
        >
          <AiOutlineArrowDown />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setTranslateX(translateX - mirrorX * 50)
          }}
        >
          <AiOutlineArrowLeft />
        </MyButton>
        <MyButton
          color="light"
          onClick={() => {
            setTranslateX(translateX + mirrorX * 50)
          }}
        >
          <AiOutlineArrowRight />
        </MyButton>
      </div>
    </div>
  )
}

export default AdjustTools
