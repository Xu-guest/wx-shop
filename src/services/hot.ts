import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

type hotParams = PageParams & { subTypes?: string }
export const getHotAPI = (url: string, data?: hotParams) => {
  return http<HotResult>({
    url: url,
    method: 'GET',
    data,
  })
}
