import {useRef, useState} from 'react'
import Konva from 'konva'

import {COMMAND_KEY_WHEEL, SCALE_BY} from '../constant'

const useMainStage = () => {
  const stageRef = useRef<Konva.Stage>(null)
  const [scale, setScale] = useState<number>(1)
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    // const isPinch =
    //   e.evt.deltaX === 0 && Math.abs(e.evt.deltaY).toString().length !== 1

    if (
      !e.evt?.[COMMAND_KEY_WHEEL]
      // && !isPinch
    ) {
      return
    } else {
      e.evt.preventDefault()
    }
    const stage = stageRef.current
    if (!stage) return

    const oldScale = stage.scaleX()
    const pointer = stage.getPointerPosition()
    if (!pointer) return
    console.log('>>>>>', e.target)
    const newScale =
      e.evt.deltaY > 0 ? oldScale / SCALE_BY : oldScale * SCALE_BY
    setScale(newScale)

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    }

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }
    stage.position(newPos)
    stage.scale({x: newScale, y: newScale})
    stage.batchDraw()
  }
  return {
    scale,
    handleWheel,
    stageRef,
    setScale,
  }
}

export default useMainStage
