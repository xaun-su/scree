import React from 'react';

// Helper functions (可以放在组件外部，避免每次渲染都重新创建)
function polarToCartesian(cx, cy, r, angleInDegrees) {
  // 将角度转换为弧度，并调整 0度为右侧，逆时针增加 (标准数学坐标系)
  const angleInRadians = angleInDegrees * Math.PI / 180.0;
  return {
    x: cx + (r * Math.cos(angleInRadians)),
    y: cy + (r * Math.sin(angleInRadians))
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  // 计算起始点和结束点
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);

  // large-arc-flag: 1 如果角度差 > 180 度，0 否则
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  // sweep-flag: 1 表示顺时针绘制，0 表示逆时针绘制 (SVG 的 y 轴向下)
  // 如果你的 startAngle < endAngle 并且你想要顺时针，sweepFlag = 1
  // 如果你的 startAngle < endAngle 并且你想要逆时针，sweepFlag = 0
  // 如果你的 startAngle > endAngle 并且你想要顺时针，sweepFlag = 0
  // 如果你的 startAngle > endAngle 并且你想要逆时针，sweepFlag = 1
  // 简单起见，我们假设 startAngle < endAngle 并且想要顺时针效果 (sweepFlag = 1)
  const sweepFlag = 1; // 顺时针绘制

  // 构建 SVG Path 的 d 属性字符串
  return [
    "M", start.x, start.y, // MoveTo 起始点
    "A", r, r, 0, largeArcFlag, sweepFlag, end.x, end.y // ArcTo 结束点
  ].join(" ");
}

export default function Arc() {
  // SVG viewBox 的尺寸，决定了内部坐标系的范围
  // 100x100 的 viewBox 意味着中心在 (50, 50)
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;

  const numberOfArcs = 10; // 要绘制的弧线数量
  // 弧线的半径，需要根据地球投影图的大小和位置进行调整
  // 地球投影图的 background-size 是 30% of container width
  // 在 100x100 的 viewBox 中，如果容器是正方形，30% 宽度对应 viewBox 的 30
  // 半径就是 15。外弧线的半径需要大于这个值。
  // 假设容器是正方形，地球图半径在 viewBox 中约为 15。
  // 我们选择一个稍大的半径，例如 30 或 35，让弧线在地球图外面。
  const arcRadius = 35; // **根据实际效果调整此值**

  // 每条弧线覆盖的角度长度
  const arcAngleLength = 20; // **根据实际效果调整此值，例如 15 到 30 度**

  // 每条弧线起始角度之间的间隔
  const angleBetweenArcs = 360 / numberOfArcs; // 360 / 10 = 36 度

  // 生成 10 条弧线的路径数据
  const arcs = Array.from({ length: numberOfArcs }).map((_, index) => {
    // 计算当前弧线的起始角度
    // 从某个起始点开始分布，例如从顶部偏右一点开始 (例如 -60 度)
    const initialOffset = -60; // **调整这个偏移量来旋转整个弧线组**
    const startAngle = initialOffset + index * angleBetweenArcs;
    // 计算当前弧线的结束角度
    const endAngle = startAngle + arcAngleLength;

    return {
      key: `arc-${index}`, // 给每个 path 一个唯一的 key (React 列表渲染需要)
      // 生成路径数据
      d: describeArc(centerX, centerY, arcRadius, startAngle, endAngle),
      stroke: '#00ffff', // 弧线颜色 (例如青色)
      strokeWidth: '2', // 弧线粗细
      fill: 'none', // 不填充颜色
      strokeLinecap: 'round', // 可选：使弧线端点变圆
    };
  });

  return (
    // SVG 容器，用于包裹所有弧线 path
    <svg
      style={{
        // 绝对定位，使其覆盖父容器 .center
        position: 'absolute',
        top: '50%', // 将 SVG 容器的中心定位到父容器 .center 的中心
        left: '50%',
        transform: 'translate(-50%, -50%)', // 精确居中 SVG 容器
        width: '100%', // SVG 容器的尺寸与父容器 .center 相同
        height: '100%',
        // z-index 需要高于背景图和模糊层，但可能低于文字或其他前景元素
        // 你在 BidScreen 中给 Arc 设置了 zIndex: 7，这里保持一致
        zIndex: 7,
        // 确保 SVG 不会捕获鼠标事件，让下面的元素可以交互
        pointerEvents: 'none',
        // 如果弧线超出 viewBox，允许显示
        overflow: 'visible',
        // background: 'rgba(255,0,0,0.1)', // 调试时可以打开，查看 SVG 区域
      }}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} // 定义 SVG 内部坐标系 100x100
    >
      {/* 遍历生成的弧线数据，渲染 Path 元素 */}
      {arcs.map(arc => (
        <path
          key={arc.key}
          d={arc.d}
          stroke={arc.stroke}
          strokeWidth={arc.strokeWidth}
          fill={arc.fill}
          strokeLinecap={arc.strokeLinecap}
        />
      ))}
    </svg>
  );
}
