import {RectCover} from '../components/model/model'

const checkCollision = (over: RectCover, target: RectCover, strict = true) => {
  if (!over || !target) {
    return false
  }

  const isOverWidth = strict
    ? over.x >= target.x && over.y + over.height <= target.y + target.height
    : true

  return (
    isOverWidth &&
    over.x <= target.x + target.width &&
    over.x + over.width >= target.x &&
    over.y <= target.y + target.height &&
    over.y + over.height >= target.y
  )
}

export default checkCollision
