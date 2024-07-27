interface Base<T> {
  children?: T[]
  id: string
}
const findTreeContainer = <T extends Base<T>>(
  tree: T,
  id: string,
): T[] | undefined => {
  if (tree.children?.find((item) => item.id === id)) {
    return tree.children
  }
  return tree.children?.reduce((pre, cur) => {
    const found = findTreeContainer(cur, id)
    if (found?.length) {
      return found
    }
    return pre
  }, [] as T[])
}

export default findTreeContainer
