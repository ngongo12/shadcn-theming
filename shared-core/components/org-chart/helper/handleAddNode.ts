interface Base<T> {
  id: string
  children?: T[]
}
const handleAddNode = <T extends Base<T>>(
  data: T,
  dataAdd: T,
  id: string,
): T => {
  if (id === data.id) {
    return {
      ...data,
      children: (data.children ?? []).concat(dataAdd),
    }
  }
  return {
    ...data,
    children: data?.children
      ? data.children.map((item) => handleAddNode(item, dataAdd, id))
      : data.children,
  }
}

export default handleAddNode
