import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSimpleDictDataList, DictDataVO } from '@/service/dict/DictAPI'

const initState = {
  dictMap: new Map<string, any>(),
  isSetDict: false
}

export const useDictStore = defineStore(
  'dict',
  () => {
    // dict

    const dictInfo = ref<DictState>({ ...initState })

    // actions methods
    const setDictMap = async () => {
      // 获取字典
      const data = await getSimpleDictDataList()
      // 设置数据
      const dictDataMap = new Map<string, any>()
      data.forEach((dictData: DictDataVO) => {
        // 获得 dictType 层级
        const enumValueObj = dictDataMap[dictData.dictType]
        if (!enumValueObj) {
          dictDataMap[dictData.dictType] = []
        }
        // 处理 dictValue 层级
        dictDataMap[dictData.dictType].push({
          value: dictData.value,
          label: dictData.label,
          colorType: dictData.colorType,
          cssClass: dictData.cssClass
        })
      })
      dictInfo.value.dictMap = dictDataMap
      dictInfo.value.isSetDict = true
      console.log(dictInfo.value.dictMap)
    }

    const getDictByType = (type: string) => {
      if (!dictInfo.value.isSetDict) {
        setDictMap()
      }
      return dictInfo.value.dictMap[type]
    }

    const resetDict = async () => {
      dictInfo.value = initState
      await setDictMap()
    }

    // 暴露到外面的方法
    return {
      dictInfo,
      setDictMap,
      getDictByType,
      resetDict
    }
  },
  {
    // 持久化
    persist: true
  }
)
