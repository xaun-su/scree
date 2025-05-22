import React, { useEffect, useRef } from 'react';

// 将 CSS 放在组件外部或者单独的 CSS 文件中导入
const styles = `
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 垂直居中显示在页面上 */
    background-color: #0a1a2a; /* 添加一个深色背景 */
    margin: 0;
    overflow: hidden; /* 防止页面出现滚动条 */
  }

  #root {
    width: 100%; /* 容器宽度 */
    /* 容器高度需要能容纳所有环，根据环的间距和数量调整 */
    height: 3.3rem; /* 示例高度，根据环的实际分布调整 */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 100%; /* SVG 宽度占满父容器 */
    height: 100%; /* SVG 高度占满父容器 */
    /* viewBox 定义 SVG 内部坐标系，方便绘制 */
    /* viewBox="0 0 400 300" 意味着内部坐标系是 400x300，中心在 (200, 150) */
    overflow: visible; /* 允许 SVG 内部元素超出 viewBox 显示 */
  }

  /* 原始线条的样式 */
  .base-ring {
    stroke: rgba(0, 255, 255, 0.3); /* 基础线条颜色，可以稍微透明一些 */
    stroke-width: 1.5; /* 基础线条粗细 */
    fill: none; /* 不填充颜色 */
  }

  /* 流光线条的样式 */
  .flow-light {
    stroke: #00ffff; /* 流光颜色，可以更亮 */
    stroke-width: 2; /* 流光线条粗细，可以比基础线条粗一点 */
    fill: none; /* 不填充颜色 */
    filter: url(#glow); /* 可选：应用发光滤镜 */
    /* stroke-dasharray 和 stroke-dashoffset 将由 JS 设置 */
  }
`;

// 将样式添加到文档头部，或者使用 styled-components/CSS modules
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


const AnimatedRings = () => {
  // 使用 useRef 获取 SVG 元素的引用
  const svgRef = useRef(null);

  useEffect(() => {
    // 确保 SVG 元素已加载
    const svg = svgRef.current;
    if (!svg) return;

    // 清除 SVG 中原有的元素，防止重复添加 (如果组件可能重新渲染)
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // 重新添加 defs (滤镜和渐变)
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <!-- 定义线性渐变用于流光描边 -->
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <!-- 渐变从左到右 -->
          <!-- 左侧透明 -->
          <stop offset="0%" stop-color="#00ffff" stop-opacity="0.1"/>
          <!-- 中间不透明 -->
          <stop offset="50%" stop-color="#00ffff" stop-opacity="1.0"/>
          <!-- 右侧透明 -->
          <stop offset="100%" stop-color="#00ffff" stop-opacity="0.1"/>
        </linearGradient>
    `;
    svg.appendChild(defs);


    // SVG viewBox 参数
    const viewBoxWidth = 400;
    const viewBoxHeight = 300;
    const centerX = viewBoxWidth / 2; // 中心 x 坐标 (200)
    const centerY = viewBoxHeight / 2; // 中心 y 坐标 (150)

    // 环的数量
    const numberOfRings = 11;

    // 垂直间距 (每两个相邻环的中心垂直距离)
    const verticalSpacing = 20; // **根据需要调整，影响环的密集程度**

    // 垂直半径 (ry) 的变化范围
    const minRy = 1; // 最小垂直半径 (最上) **根据需要调整**
    const maxRy = 15; // 最大垂直半径 (最下) **根据需要调整**
    const ryRange = maxRy - minRy; // 垂直半径的总变化量

    // 水平半径 (rx) 的变化范围
    const minRx = 50;  // 最小水平半径 (最上和最下) **根据需要调整**
    const maxRx = 120; // 最大水平半径 (中心附近) **根据需要调整**
    const rxRange = maxRx - minRx; // 水平半径的总变化量

     // 整体透明度 (opacity) 的变化范围 (应用于整个环元素)
    const minOverallOpacity = 0.2; // 外层环的最小整体透明度 **根据需要调整**
    const maxOverallOpacity = 1.0; // 内层环的最大整体透明度 **根据需要调整**
    const opacityRange = maxOverallOpacity - minOverallOpacity; // 整体透明度的总变化量
    // 最大对称索引 (用于映射整体透明度)
    const maxSymmetricIndex = Math.floor(numberOfRings / 2); // 对于 11 个环是 5


    // 流光动画参数
    const lightSegmentLengthRatio = 0.1; // 流光段的长度占总路径长度的比例 **根据需要调整**
    const animationDuration = 4000; // 动画周期（毫秒） **根据需要调整**
    const animationEasing = 'linear'; // 动画缓动函数

    // 生成并添加椭圆环
    for (let i = 0; i < numberOfRings; i++) {
      // 计算当前环的垂直中心 (cy)
      // 使环的中心对称分布在 centerY 上下
      const startCy = centerY - (numberOfRings - 1) * verticalSpacing / 2;
      const currentCy = startCy + i * verticalSpacing;

      // 计算当前环的垂直半径 (ry)
      // 垂直半径从上往下线性增大 (i=0 -> minRy, i=numberOfRings-1 -> maxRy)
      const currentRy = minRy + (i / (numberOfRings - 1)) * ryRange;

      // 计算当前环的水平半径 (rx)
      // 水平半径从小到大再到小的逻辑：
      // 距离中心越近 (i 接近 maxSymmetricIndex)，rx 越大 (接近 maxRx)
      // 距离中心越远 (i 接近 0 或 numberOfRings-1)，rx 越小 (接近 minRx)
      const symmetricIndex = Math.min(i, numberOfRings - 1 - i);
       // Handle potential division by zero if numberOfRings is 1 or 2
      const rxDivisor = (numberOfRings / 2 - 1);
      const currentRx = minRx + (symmetricIndex / (rxDivisor > 0 ? rxDivisor : 1)) * rxRange;


      // 计算当前环的整体透明度 (应用于整个环元素)
      // 透明度从外到内增大 (symmetricIndex=0 -> minOverallOpacity, symmetricIndex=maxSymmetricIndex -> maxOverallOpacity)
      const currentOverallOpacity = minOverallOpacity + (symmetricIndex / maxSymmetricIndex) * opacityRange;


      // --- 创建并添加基础线条椭圆 ---
      const baseEllipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      baseEllipse.setAttribute('cx', centerX);
      baseEllipse.setAttribute('cy', currentCy);
      baseEllipse.setAttribute('rx', currentRx);
      baseEllipse.setAttribute('ry', currentRy);
      baseEllipse.setAttribute('class', 'base-ring'); // 应用基础线条样式
      baseEllipse.style.opacity = currentOverallOpacity; // 设置整体透明度
      svg.appendChild(baseEllipse); // 添加到 SVG

      // --- 创建并添加流光线条椭圆 ---
      const flowEllipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      flowEllipse.setAttribute('cx', centerX);
      flowEllipse.setAttribute('cy', currentCy);
      flowEllipse.setAttribute('rx', currentRx);
      flowEllipse.setAttribute('ry', currentRy);
      flowEllipse.setAttribute('class', 'flow-light'); // 应用流光线条样式
      flowEllipse.setAttribute('filter', 'url(#glow)'); // 应用发光滤镜
      // **应用渐变描边**
      flowEllipse.setAttribute('stroke', 'url(#flowGradient)'); // 应用渐变
      flowEllipse.style.opacity = currentOverallOpacity; // 设置整体透明度 (与基础线条一致)
      svg.appendChild(flowEllipse); // 添加到 SVG (会在基础线条上方)

      // 获取流光椭圆的路径长度 (必须在添加到 DOM 后)
      const pathLength = flowEllipse.getTotalLength();

      // 计算流光段的长度和虚线间隔
      const lightSegmentLength = pathLength * lightSegmentLengthRatio;
      const gapLength = pathLength - lightSegmentLength;

      // 设置 stroke-dasharray 到流光椭圆
      flowEllipse.style.strokeDasharray = `${lightSegmentLength} ${gapLength}`;

      // 确定动画起始位置 (左右交替)
      // 偶数索引 (0, 2, 4, ...) 从右侧开始 (默认)
      // 奇数索引 (1, 3, 5, ...) 从左侧开始 (偏移半个路径长度)
      const startFromLeft = i % 2 !== 0;

      // 设置动画的起始和结束 stroke-dashoffset
      // 为了保持一致的流向（例如，都顺时针），动画范围总是 pathLength
      let startOffset, endOffset;

      // 保持顺时针流动 (offset 从 0 到 pathLength 的变化)
      if (startFromLeft) {
         // 从左侧开始：初始偏移 pathLength / 2
         startOffset = pathLength / 2;
         endOffset = startOffset + pathLength; // 结束偏移量 = 起始偏移量 + 完整路径长度
      } else {
         // 从右侧开始 (默认): 初始偏移 0
         startOffset = 0;
         endOffset = pathLength; // 结束偏移量 = 起始偏移量 + 完整路径长度
      }


      // 应用 Web Animations API 动画到流光椭圆
      flowEllipse.animate(
        [
          { strokeDashoffset: startOffset }, // 动画起始状态
          { strokeDashoffset: endOffset }   // 动画结束状态
        ],
        {
          duration: animationDuration, // 动画周期
          iterations: Infinity,        // 无限循环
          easing: animationEasing,       // 缓动函数
          // delay: i * 50 // 可选：添加延迟，使动画错开
        }
      );
    }

    // Cleanup function: This runs when the component unmounts
    return () => {
      // Remove all children from the SVG element to clean up
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
    };

  }, []); // 空依赖数组表示这个 effect 只在组件挂载时运行一次

  return (
    <div id="root">
      {/* SVG 元素，通过 ref 获取其引用 */}
      <svg id="ringSvg" ref={svgRef} viewBox="0 0 400 300">
        {/* Defs (滤镜和渐变) 将由 useEffect 添加 */}
      </svg>
    </div>
  );
};

export default AnimatedRings; // 导出组件
