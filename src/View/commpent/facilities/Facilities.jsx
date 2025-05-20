import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // 导入 ECharts 库

export default function Facilities() {
  // 更新数据为图片中的年份和数值
  const data = [
    { "name": "2019", "value": 2.45 },
    { "name": "2020", "value": 1.67 },
    { "name": "2021", "value": 3.42 },
    { "name": "2022", "value": 2.34 },
    { "name": "2023", "value": 3.56 },
    { "name": "2024", "value": 3.56 },
  ];

  // 直接从数据中提取 x 轴和 y 轴数据，不再需要 min 偏移
  const xData = data.map(item => item.name);
  const yData = data.map(item => item.value);

  // 创建一个 ref 来引用将要作为 ECharts 容器的 DOM 元素
  const chartRef = useRef(null);

  // 使用 useEffect Hook 来管理 ECharts 实例
  useEffect(() => {
    let myChart = null;

    // 确保 ref 已经指向了 DOM 元素
    if (chartRef.current) {
      // 初始化 ECharts 实例
      myChart = echarts.init(chartRef.current);

      // 定义 ECharts 的配置项
      const option = {
        color: ['#3398DB'], // 柱子颜色，会被 series itemStyle 覆盖
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              opacity: 0 // 隐藏指示线
            }
          },
          // 简化 tooltip 格式化
          formatter: function(params) {
            const param = params[0]; // 获取第一个系列（柱子）的数据
            return `${param.name}<br/>${param.seriesName}: ${param.value}`;
          }
        },
        legend: {
          show: false // 不显示图例
        },
        grid: {
          left: '8%', // 调整 left 留出 Y 轴名称和标签的空间
          right: '3%', // 调整 right
          bottom: '5%',
          top: '25%', // 调整 top 为 Y 轴名称留出空间
          containLabel: true,
          z: 22,
          // 启用并配置垂直分割线
          splitLine: {
              show: true,
              lineStyle: {
                  color: '#0c3b71' // 垂直分割线颜色
              }
          }
        },
        xAxis: [{
          type: 'category',
          gridIndex: 0,
          data: xData, // 使用年份数据
          axisTick: {
            alignWithLabel: true // 刻度线与标签对齐
          },
          axisLine: {
            lineStyle: {
              color: '#0c3b71' // X 轴线颜色
            }
          },
          axisLabel: {
            show: true,
            color: 'rgb(170,170,170)', // X 轴标签颜色
            fontSize: 10 // 调整字体大小
          }
        }],
        yAxis: [ // 只保留一个 Y 轴
          {
            type: 'value',
            gridIndex: 0,
            name: '单位: 个', // Y 轴名称
            nameTextStyle: { // Y 轴名称样式
                color: 'rgb(170,170,170)',
                fontSize: 10,
                align: 'left', // 名称左对齐
                padding: [0, 0, 0, -30] // 调整名称位置，根据需要调整
            },
            splitNumber: 5, // 设置分割段数，以获得 0-5 的刻度
            min: 0, // Y 轴最小值
            max: 5, // Y 轴最大值 (根据数据调整，或略高)
            axisTick: {
              show: false // 不显示刻度线
            },
             axisLine: {
              lineStyle: {
                color: '#0c3b71' // Y 轴线颜色
              }
            },
            axisLabel: {
              color: 'rgb(170,170,170)', // Y 轴标签颜色
              fontSize: 10, // 调整字体大小
              formatter: '{value}' // 不显示百分号
            },
            // 启用并配置水平虚线分割线
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed', // 虚线
                color: '#0c3b71' // 水平分割线颜色，与轴线颜色一致
              }
            },

          }
        ],
        series: [ // 只保留一个系列
          {
            name: '数量', // 系列名称，用于 tooltip
            type: 'bar',
            barWidth: '30%', // 柱子宽度
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                // barBorderRadius: [15, 15, 0, 0], // 设置顶部圆角，底部直角
                color: new echarts.graphic.LinearGradient( // 柱子颜色渐变
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00feff'
                  },
                  {
                    offset: 0.5,
                    color: '#027eff'
                  },
                  {
                    offset: 1,
                    color: '#0286ff'
                  }
                  ]
                )
              }
            },
            data: yData, // 使用数值数据
            zlevel: 11,
            // 添加标签配置，在柱子顶部显示数值
            label: {
                show: true, // 显示标签
                position: 'top', // 标签位置在柱子顶部
                color: '#fff', // 标签颜色 (白色)
                fontSize: 10, // 标签字体大小
                formatter: '{c}' // 显示数据值 {c}
            }
          },
        ]
      };

      // 使用配置项设置图表
      myChart.setOption(option);

      // 处理窗口大小变化，使图表自适应
      const handleResize = () => {
        myChart.resize();
      };
      window.addEventListener('resize', handleResize);

      // Cleanup 函数：在组件卸载时销毁图表实例和移除事件监听器
      return () => {
        window.removeEventListener('resize', handleResize);
        if (myChart) {
          myChart.dispose(); // 销毁图表实例
        }
      };
    }
  }, [data]); // 依赖项数组：当 data 变化时，重新运行 effect

  return (
    // 图表容器 div，设置 ref 并给它一个尺寸
    // 确保这个 div 有足够的尺寸来显示图表
    <div ref={chartRef} style={{ width: '100%', height: '85%' }}>
    </div>
  );
}
