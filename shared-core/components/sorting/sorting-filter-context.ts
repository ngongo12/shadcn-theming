import {createContext} from 'react'

import {ColumnDefine} from '../main-table/column'

interface GlobalState {
  sortingListState: [
    ColumnDefine[],
    React.Dispatch<React.SetStateAction<ColumnDefine[]>>,
  ]
}

const SortingFilterContext = createContext<GlobalState>({} as GlobalState)

export default SortingFilterContext
