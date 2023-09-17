import type { BannerItem } from '@/types/home'
import { http } from '@/utils/http'

export const getBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
