// 根据字段值，归类二维数组
// TODO @芋艿：暂时没用到
export const groupByField = <T extends { [key: string]: any }>(
  items: T[],
  fieldName: string
): GroupedItem<T>[][] => {
  // 使用一个 Map 来存储归类后的子列表
  const groupedMap = new Map<any, GroupedItem<T>[]>()

  // 遍历每个 item，并将其根据指定的 fieldName 字段归类到对应的子列表中
  items.forEach((item) => {
    const fieldValue = item[fieldName]
    if (!groupedMap.has(fieldValue)) {
      groupedMap.set(fieldValue, [])
    }
    groupedMap.get(fieldValue)!.push(item)
  })

  // 将 Map 中的值转换为二维数组，并添加额外的信息（子数组长度，布尔值）
  const groupedItems: GroupedItem<T>[][] = Array.from(groupedMap.entries()).map(
    ([fieldValue, group]) => {
      return {
        items: group,
        length: group.length,
        isEmpty: group.length === 0 // 或者根据需要定义其他布尔值逻辑
      }
    }
  )

  return groupedItems
}

// 定义 GroupedItem 类型，使用泛型 T
interface GroupedItem<T> {
  items: T[]
  length: number
  isEmpty: boolean
}
