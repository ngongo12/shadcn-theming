import {
  addPrefixKey,
  clearUndefinedValue,
  getQuery,
  getQueryOuterModule,
  shadowReplace,
} from './browserHelper'

export const replaceURLParams = (
  filter: any = {},
  moduleId?: number,
  tableName?: string,
) => {
  const _moduleId = `${moduleId}-${tableName}`
  const clearedUndefinedFilter = addPrefixKey(
    clearUndefinedValue(filter),
    _moduleId,
  )

  const oldQuery = getQueryOuterModule(getQuery() ?? {}, _moduleId)

  shadowReplace(
    clearUndefinedValue({
      ...oldQuery,
      ...clearedUndefinedFilter,
    }),
  )
}
