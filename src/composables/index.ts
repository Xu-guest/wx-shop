import type { XtxGuessInstance } from '@/types/component'
import { throttle } from '@/utils/units'
import { ref } from 'vue'
//猜你喜欢滚动触底获取数据
export const useGuessRef = () => {
  const guessRef = ref<XtxGuessInstance>()
  const onScrolltolower = throttle(() => {
    guessRef.value?.getMore()
  })
  return { onScrolltolower, guessRef }
}
