import React from 'react';
import ReactECharts from 'echarts-for-react';

const ScatterChart = () => {
  // 原始数据，格式仍为 [年份字符串, 值]
  const originalSeriesData1 = [ // 蓝色系列数据
    ['2019', 0.8], ['2019', 1.2], ['2019', 0.9], ['2019', 1.1], // 增加数据点
    ['2020', 1.5], ['2020', 1.8], ['2020', 3.8], ['2020', 4.1], ['2020', 3.5],
    ['2021', 4.2], ['2021', 3.9], ['2021', 4.5], ['2021', 1.8], ['2021', 4.0],
    ['2022', 3.8], ['2022', 3.5], ['2022', 4.0], ['2022', 2.2], ['2022', 3.7],
    ['2023', 4.0], ['2023', 3.7], ['2023', 4.3], ['2023', 2.0], ['2023', 3.9],
    ['2024', 3.6], ['2024', 3.3], ['2024', 3.9], ['2024', 1.5], ['2024', 3.5],

  ];

  const originalSeriesData2 = [ // 绿色系列数据
    ['2019', 2.5], ['2019', 2.2], ['2019', 2.8], ['2019', 2.3], // 增加数据点
    ['2020', 2.1], ['2020', 1.9], ['2020', 1.5], ['2020', 1.7],
    ['2021', 1.8], ['2021', 2.0], ['2021', 2.3], ['2021', 2.1],
    ['2022', 2.2], ['2022', 2.0], ['2022', 1.8], ['2022', 1.9],
    ['2023', 2.0], ['2023', 1.8], ['2023', 1.5], ['2023', 1.7],
    ['2024', 1.0], ['2024', 0.8], ['2024', 1.2], ['2024', 1.1],
   
  ];

  // 函数：将原始数据转换为带有随机水平偏移的数值数据
  const transformDataForScatter = (data) => {
    return data.map(item => {
      const year = parseInt(item[0], 10); // 将年份字符串转为数字
      const value = item[1];
      // 添加一个小的随机偏移量，例如在 -0.3 到 0.3 之间
      const randomOffsetX = (Math.random() - 0.5) * 0.6;
      return [year + randomOffsetX, value]; // 返回 [带有偏移的年份数值, 值]
    });
  };

  // 转换数据
  const transformedSeriesData1 = transformDataForScatter(originalSeriesData1);
  const transformedSeriesData2 = transformDataForScatter(originalSeriesData2);

  // 提取所有转换后的年份数值，用于确定 X 轴的范围
  const allTransformedYears = [
    ...transformedSeriesData1.map(item => item[0]),
    ...transformedSeriesData2.map(item => item[0])
  ];

  // 计算 X 轴的最小和最大值，留出一些边距
  const minYearValue = Math.min(...allTransformedYears);
  const maxYearValue = Math.max(...allTransformedYears);

  const option = {
    tooltip: {
      trigger: 'item', // 将 trigger 改为 'item'，鼠标悬停在点上时触发
      axisPointer: {
        type: 'shadow' // 或者 'cross'
      },
      // 格式化 tooltip 显示
      formatter: (params) => {
        // params 是一个对象，包含鼠标指向的单个数据点的信息
        const year = Math.round(params.data[0]); // 将带有偏移的年份数值四舍五入得到原始年份
        const value = params.data[1]; // 获取 Y 轴的值
        const seriesName = params.seriesName;
        const color = params.color;

        return `Year: ${year}<br/>` +
               `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>${seriesName}: ${value}`;
      }
    },
    grid: {
      left: '0%', // 增加左边距，防止 Y 轴标签被裁切
      right: '0%', // 增加右边距
      bottom: '8%',
      top: '10%', // 增加顶部边距，留出标题空间（如果需要）
      containLabel: true
    },
    xAxis: {
      type: 'value', // X 轴类型改为数值轴
      min: minYearValue - 0.5, 
      max: maxYearValue + 0.5, 
      interval: 1, // 确保每个刻度都显示
      axisLine: {
        lineStyle: {
          color: '#40516c', // 轴线颜色
          type: 'solid'
        }
      },
      axisLabel: {
        color: '#ccc', // 刻度标签颜色
        formatter: function (value, index) {
            // 将数值格式化为整数年份
            return Math.round(value);
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#fff', // 分割线颜色
          opacity: 0.2, // 透明度
          type: 'dashed' // 虚线
        }
      },
      nameLocation: 'middle',
      nameGap: 25,
      nameTextStyle: {
        color: '#ccc'
      }
    },
    yAxis: {
      type: 'value', // Y 轴类型为数值
      axisLine: {
        lineStyle: {
         color: '#fff', // 分割线颜色
          opacity: 0.2, // 透明度
        }
      },
      axisLabel: {
        color: '#ccc' // 刻度标签颜色
      },
       axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#fff', // 分割线颜色
          opacity: 0.2, // 透明度
          type: 'dashed' // 虚线
        }
      },
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        color: '#ccc'
      }
    },
    series: [
      {
        name: 'Series 1', // 蓝色系列名称
        type: 'scatter', // 散点图
        symbol: 'square', // 标记类型为方形
        symbolSize: 5, // 标记大小
        itemStyle: {
          color: '#33ffff' // 蓝色
        },
        data: transformedSeriesData1 // 使用转换后的数据
      },
      {
        name: 'Series 2', // 绿色系列名称
        type: 'scatter', // 散点图
        symbol: 'square', // 标记类型为方形
        symbolSize: 5, // 标记大小
        itemStyle: {
          color: '#ffd797' // 绿色
        },
        data: transformedSeriesData2 // 使用转换后的数据
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '400px' }}> {/* 设置图表容器的大小 */}
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default ScatterChart;
