import {detectOS} from '@/shared-core/helpers/detectOs'

export const SCALE_BY = 1.05 // Zoom factor
export const COMMAND_KEY_WHEEL = detectOS() === 'MacOS' ? 'metaKey' : 'ctrlKey'
