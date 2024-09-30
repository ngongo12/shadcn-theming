interface Base<T> {
  id: string
  children?: T[]
}
const handleDeleteNode = <T extends Base<T>>(data: T, id: string): T => {
  if (data.children?.find((item) => item.id === id)) {
    return {
      ...data,
      children: data.children.filter((item) => item.id !== id),
    }
  }
  return {
    ...data,
    children: data?.children
      ? data.children.map((item) => {
          return handleDeleteNode(item, id)
        })
      : data.children,
  }
}

export default handleDeleteNode
