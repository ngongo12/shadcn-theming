interface Base<T> {
  id: string
  children?: T[]
}
const handleUpdateNode = <T extends Base<T>>(
  data: T,
  updateData: T,
  id: string,
): T => {
  if (data.id === id) {
    console.log('>>>>>>>', data, id, updateData, {
      ...data,
      ...updateData,
    })

    return {
      ...data,
      ...updateData,
    }
  }
  return {
    ...data,
    children: data?.children
      ? data.children.map((item) => {
          return handleUpdateNode(item, updateData, id)
        })
      : data.children,
  }
}

export default handleUpdateNode
