import { useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
// 设计稿的基准宽度
const BASE_WIDTH = 1920;
// 基准宽度下 HTML 的 font-size (方便计算，例如 1rem = 100px)
const BASE_FONT_SIZE = 100;

function setRemFontSize() {
  const screenWidth = window.innerWidth;
  // 计算新的 HTML font-size
  // 为了避免字体过小或过大，可以设置一个最小和最大限制
  const minFontSize = 80; // 最小字体大小限制
  const maxFontSize = 120; // 最大字体大小限制

  let newFontSize = (screenWidth / BASE_WIDTH) * BASE_FONT_SIZE;

  // 应用限制
  newFontSize = Math.max(minFontSize, Math.min(maxFontSize, newFontSize));

  document.documentElement.style.fontSize = newFontSize + 'px';
}

const debouncedSetRemFontSize = debounce(setRemFontSize, 100); // 100ms 的防抖

function useRemFontSize() {
  useEffect(() => {
    // 组件挂载时设置一次字体大小
    setRemFontSize();

    // 监听窗口尺寸变化，并使用防抖函数
    window.addEventListener('resize', debouncedSetRemFontSize);

    // 组件卸载时移除监听器和取消防抖
    return () => {
      window.removeEventListener('resize', debouncedSetRemFontSize);
      debouncedSetRemFontSize.cancel();
    };
  }, []); // 空依赖数组表示只在组件挂载和卸载时运行
}

export default useRemFontSize;
