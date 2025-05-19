import React from 'react';
import './title.less'; // 确保路径正确

export default function Title(props) {
  //反向
  const pointsDataReverse = "0,0 5,0 60,0 90,20 200,20";
  const backgroundSegment1Reverse = "0,0 5,0";
  const backgroundSegment2Reverse = "5,0 60,0 90,20 200,20";
    const pointsDataBackward = "200,20 100,20 70,0 5,0 0,0";

  return (
    <div className='title'>
      {/* 传入的标题 */}
      <div className='title-text2'>{props.title}</div>
      {/* 标题线条 - SVG */}
      <svg width="100%" height="13%" viewBox="0 0 200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 定义一个滤镜来创建辉光效果，只应用到流光线上*/}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* id="backgroundGradient": 背景渐变的唯一ID */}
          {/* x1, y1, x2, y2: 定义渐变方向，例如从左到右 */}
          <linearGradient id="backgroundGradient2" x1="200" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1c96a9" /> 
            <stop offset="100%" stopColor="#031a35" /> 
          </linearGradient>

        </defs>

        {/* 1. 静态的渐变背景线条 */}
        <polyline
          points={backgroundSegment1Reverse}
          fill="none"
          // stroke="#1c96a9" // 移除纯色描边
          stroke="#a6edef" // 或者直接使用纯色
          strokeWidth="2" // 背景线粗细
        />
        {/* 第二段：使用突出显示的颜色 */}
        <polyline
          points={backgroundSegment2Reverse}
          fill="none"
          // stroke="url(#highlightColor)" // 使用上面定义的突出显示渐变
          stroke="url(#backgroundGradient2)"
          strokeWidth="2"
        />

        {/* 带有流光动画的线条 */}
        <polyline
          points={pointsDataReverse}
          fill="none"
          stroke="#a6edef" // 流光线颜色 (保持纯色)
          strokeWidth="2"
          className="flowing-line2" // 应用 CSS 动画和描边属性
          style={{ filter: 'url(#glow)' }} // 应用辉光滤镜
        />
      </svg>
    </div>
  );
}
