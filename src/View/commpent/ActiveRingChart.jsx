import React, { useState } from 'react';
import { ActiveRingChart } from '@jiaminghi/data-view-react';
// 引入你的样式文件，用于隐藏 ActiveRingChart 内部的数字显示等
// import './ActiveRingChartZu.less';
import circleImage from '../../assets/images/圈.png';
export default function ActiveRingChartZu() {
  // ActiveRingChart 的配置状态
  const [config, setConfig] = useState({
    data: [
      {
        value: 1
      },
      {
        value: 4
      },
      {
        value: 3
      },
      {
        value: 5
      },
      {
        value: 1
      }
    ],
    lineWidth: 10, // 线条粗细
    radius: '90%',
    activeRadius: '90%', // 半径 
    digitalFlopStyle: {
      fontSize: 0.000001, // 隐藏数字,
      fill: 'rgb(0,0,0,0)', // 隐藏数字
    },
    activeTimeGap: 9999999900, // 动画时间间隔 (设置非常大以取消自动切换)
    color: ['#33a8ff', '#5bf2ff', '#f6bd15', '#878cdc', '#878cdc'] // 你的颜色数组
  });


  const fixedCenterValue = 14;
  return (

    <div style={{
      width: '80%',
      height: '80%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>

      {/* ActiveRingChart 组件容器 */}
      {/* 添加一个 class以便在 CSS 中更精确地隐藏其内部元素 */}
      <div className="active-ring-chart-container" style={{ width: '100%', height: '100%' }}>
        <ActiveRingChart config={config} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 新增的透明圆圈层 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        aspectRatio: 1 / 1,
        borderRadius: '50%',
        backgroundColor: '#000',
        opacity: 0.3,
        zIndex: 6,
        pointerEvents: 'none',
      }}></div>
      {/* 新增的透明圆圈图片 */}
      <img src={circleImage} alt="Circle" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        aspectRatio: 1 / 1,
        borderRadius: '50%',
        backgroundImage: `url(${circleImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 10,
      }}></img>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 8, // 确保在透明圆圈之上
        color: '#fff',
        fontSize: '0.2rem', // 调整字体大小
        // fontWeight: 'bold', // 调整字体粗细
        pointerEvents: 'none', // 确保文本不阻碍鼠标事件穿透
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: '400',
        // zIndex: 999,
      }}>
        {fixedCenterValue}
        <p style={{ marginTop: '0.1rem', color: '#b4bcca', fontSize: '0.1rem' }}>共计</p>
      </div>
    </div>
  );
}
