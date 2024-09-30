/* eslint-disable @typescript-eslint/no-explicit-any */
export const shadowReplace = (query?: QueryType) => {
  const queryString = (() => {
    if (typeof query === 'object') {
      return (
        '?' +
        Object.keys(query)
          ?.filter((e) => e)
          ?.map((key) => `${key}=${encodeURIComponent(query[key])}`)
          .join('&')
      )
    }
    return ''
  })()

  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)

    if (queryString === '?') {
      // Nếu chuỗi truy vấn là rỗng, loại bỏ nó khỏi URL
      url.search = ''
    } else {
      // Ngược lại, cập nhật chuỗi truy vấn trong URL
      url.search = queryString
    }

    // Thay thế trạng thái lịch sử hiện tại bằng URL được cập nhật
    window.history.replaceState({path: url.href}, '', url.href)
  }
}

export const getQuery = () => {
  if (typeof window !== 'undefined') {
    const queryString = window.location.search
    const result: QueryType = queryString
      .slice(queryString.indexOf('?') + 1)
      .split('&')
      .reduce((pre: QueryType, cur) => {
        const val = cur.split('=')
        const decode = decodeURIComponent(val[1])
        return {
          ...pre,
          [val[0]]: parseStringToObj(decode),
        }
      }, {})
    delete result?.['']
    return result
  }
  return {}
}

interface QueryType {
  [key: string]: string | any
}
const parseStringToObj = (str: string) => {
  try {
    return /^[\\{\\[]/.test(str) ? JSON.parse(str) : str
  } catch (e) {
    return str
  }
}
export const clearUndefinedValue = (obj: any) => {
  const res = Object.keys(obj).reduce((pre: any, cur: string) => {
    if (obj?.[cur] || typeof obj?.[cur] === 'boolean') {
      return {[cur]: obj?.[cur], ...pre}
    }
    return {...pre}
  }, {})
  return res
}

export const addPrefixKey = (obj: any, key: number | string = '') => {
  return Object.keys(obj ?? {}).reduce((pre, cur) => {
    return {
      ...pre,
      [`${key}.${cur}`]: obj[cur],
    }
  }, {})
}

export const getQueryOuterModule = (
  obj: any,
  moduleId: number | string = '',
) => {
  return Object.keys(obj ?? {}).reduce((pre, cur) => {
    const arrKeys = cur.split('.') ?? []
    if (arrKeys[0] == moduleId) {
      return pre
    }
    return {
      ...pre,
      [`${cur}`]: obj[cur],
    }
  }, {})
}

export const getQueryInnerModule = (
  obj: any,
  moduleId: number | string = '',
  tableName?: string,
) => {
  return Object.keys(obj ?? {}).reduce((pre, cur) => {
    const arrKeys = cur.split('.') ?? []
    if (arrKeys[0] != `${moduleId}-${tableName}`) {
      return pre
    }

    return {
      ...pre,
      [`${arrKeys?.[1] ?? cur}`]: obj[cur],
    }
  }, {})
}

export const pushState = (_query?: QueryType) => {
  const query = clearUndefinedValue(_query)
  const queryString = (() => {
    if (typeof query === 'object') {
      return (
        '?' +
        Object.keys(query)
          ?.filter((e) => e)
          ?.map((key) => `${key}=${encodeURIComponent(query[key])}`)
          .join('&')
      )
    }
    return ''
  })()

  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)

    if (queryString === '?') {
      // Nếu chuỗi truy vấn là rỗng, loại bỏ nó khỏi URL
      url.search = ''
    } else {
      // Ngược lại, cập nhật chuỗi truy vấn trong URL
      url.search = queryString
    }

    window.history.pushState({path: url.href}, '', url.href)
  }
}
