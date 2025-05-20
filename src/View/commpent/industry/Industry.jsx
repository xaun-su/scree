import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // 导入 ECharts 库

export default function Facilities() {
  // 更新数据为图片中的内容
  const data = [
    { "name": "工业用地", "value": 21.15 },
    { "name": "商业服务设施", "value": 15.51 },
    { "name": "物流仓储用地", "value": 4.1 },
    { "name": "教育科研用地", "value": 3.4 },
  ];

  // 提取 Y 轴分类数据 (名称) 和 X 轴数值数据 (值)
  const categoryData = data.map(item => item.name); // Y轴类目数据
  const valueData = data.map(item => item.value);   // X轴数值数据

  // X轴的最大值，用于定位右侧文字
  // 稍微增加最大值，确保右侧文字有空间显示
  const xAxisMaxValue = Math.max(...valueData) * 1.2; // 根据最大值动态计算，并留出空间

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
        tooltip: {
          trigger: 'axis', // 坐标轴触发
          axisPointer: {
            type: 'line', // 指示器类型：线
            lineStyle: {
              opacity: 0 // 隐藏指示线
            }
          },
          formatter: function (params) {
            // 找到柱状图系列的数据项
            const barParam = params.find(p => p.seriesType === 'bar');
            if (barParam) {
              // 使用柱状图系列的数据来格式化 tooltip
              // barParam.name 是 Y轴的分类名 (名称)
              // barParam.value 是 X轴的数值
              return `${barParam.name}<br/>${barParam.seriesName}: ${barParam.value} 平方公里`;
            }
            return ''; // 如果找不到柱状图系列，返回空字符串
          }
        },
        legend: {
          show: false // 不显示图例
        },
        grid: {
          left: '0%',
          bottom: '5%', // 调整 bottom
          top: '10%', // 调整 top
          containLabel: true, // grid 区域是否包含坐标轴的刻度标签
          z: 22,
        },
        // X 轴现在是数值轴
        xAxis: [{
          type: 'value', // X轴类型：数值轴
          gridIndex: 0,
          nameTextStyle: {
            color: 'rgb(170,170,170)',
            fontSize: 10,
            align: 'center',
            padding: [10, 0, 0, 0]
          },
          min: 0, // X 轴最小值
          max: xAxisMaxValue, // 使用定义的 X 轴最大值
          axisTick: {
            show: false // 不显示刻度线
          },
          axisLine: {
            show: false, // 不显示 X 轴线
          },
          axisLabel: {
            show: false, // 隐藏 X 轴标签
            color: 'rgb(170,170,170)',
            fontSize: 10,
            formatter: '{value}'
          },
          splitLine: {
            show: false // 隐藏垂直分割线
          }
        }],
        // Y 轴现在是类目轴
        yAxis: [
          {
            type: 'category', // Y轴类型：类目轴
            gridIndex: 0,
            data: categoryData, // 使用名称数据作为类目
            inverse: true, // 反转坐标轴，使数据从上到下排列
            axisTick: {
              show: false // 不显示刻度标记
            },
            axisLine: {
              show: false, // 不显示坐标轴线
            },
            axisLabel: {
              show: false, // 隐藏 Y 轴标签，文字通过散点图标签显示
              color: "rgba(96, 98, 102, 1)",
              margin: 10,
            },
            splitLine: {
              show: false // 隐藏水平分割线
            }
          }
        ],
        series: [
          {
            // Series 0: 柱状图 (背景柱和实际柱子)
            name: '面积', // 系列名称，用于 tooltip
            type: 'bar', // 图表类型：柱状图
            barWidth: '3px', // 柱子高度 (横向柱状图)，根据图片调整
            barCategoryGap: '40%', // <--- 添加或修改这里，设置类目间隙
            xAxisIndex: 0, // 关联到第一个 X 轴 (数值轴)
            yAxisIndex: 0, // 关联到第一个 Y 轴 (类目轴)
            showBackground: true, // 显示背景柱
            backgroundStyle: {
              color: "#112344", // 背景柱颜色
              borderRadius: 5, // 设置背景柱的圆角
            },
            itemStyle: {
              normal: {
                borderRadius: [0, 5, 5, 0], // 设置右侧圆角
                color: new echarts.graphic.LinearGradient( // 柱子颜色渐变
                  0, 0, 1, 0, [{ // 水平渐变
                    offset: 0,
                    color: '#013263'
                  },
                  // {
                  //   offset: 0.5,
                  //   color: '#00a1be'
                  // },
                  {
                    offset: 1,
                    color: '#04e7ff'
                  }
                ]
                )
              }
            },
            data: valueData, // 使用数值数据
            zlevel: 11, // 确保在背景柱上方
            label: {
              show: false, // 隐藏柱子自带的标签
            }
          },
          {
            // Series 1: 散点图 (用于在柱状图末端显示白点)
            type: 'scatter',
            emphasis: {
              scale: false
            },
            symbol: 'circle', // 标记类型：圆点
            itemStyle: {
              color: '#fff', // 标记颜色：白色
              shadowColor: '#fff',// 阴影颜色 :光晕
              shadowBlur: 5, // 阴影模糊度
              borderWidth: 1,
              opacity: 1
            },
            symbolSize: 6, // 标记大小
            zlevel: 12,// 确保在柱状图上方
            xAxisIndex: 0, // 关联到 X 轴 (数值轴)
            yAxisIndex: 0, // 关联到 Y 轴 (类目轴)
            data: valueData, // 数据与柱状图相同，位置会自动对应
            label: {
              show: false // 隐藏散点图自带的标签
            }
          },
          {
            // Series 2: 散点图 (用于显示左侧的排名和名称文字)
            type: 'scatter',
            symbolSize: 0, // 隐藏散点图标记
            z: 12, // 确保在最上层
            xAxisIndex: 0, // 关联到 X 轴
            yAxisIndex: 0, // 关联到 Y 轴
            // 数据点的 X 坐标为 0 (或接近 grid.left)，Y 坐标对应分类的索引
            data: categoryData.map((name, index) => {
              // X 坐标设置为 0，Y 坐标为索引
              return [0, index];
            }),
            label: {
              show: true, // 显示标签
              position: 'right', // 标签位置：在数据点右侧 (数据点在 X=0)
              offset: [0, -15], // 调整标签偏移 [offsetX, offsetY]，向右偏移 10px，向上偏移 15px
              // color: '#fff', // 这行可以移除或保留，但 rich 样式会覆盖它
              fontSize: 8, // 标签字体大小
              align: 'left', // 标签内部文本左对齐
              // 使用 rich text 格式化标签
              formatter: (params) => {
                const index = params.data[1]; // 获取 Y 轴索引
                const name = categoryData[index]; // 获取对应的名称
                const id = index + 1; // 计算排名
                if (id === 1) { // 高亮前三名
                  return `{id|No.${id}}{nameStyle|${name}}`;
                } else if (id === 2) {
                  return `{ids|No.${id}}{nameStyle|${name}}`;
                } else if (id === 3) {
                  return `{ids2|No.${id}}{nameStyle|${name}}`;
                } else { // 其他排名
                  return `{ids3|No.${id}}{nameStyle|${name}}`;
                }
              },
              rich: {
                // 定义 rich text 样式
                id: {
                  padding: [2, 5],
                  fontSize: 8,
                  color: '#fff', // <--- 修改为白色
                  borderColor: '#6a6533',
                  borderWidth: 0.5,
                  borderRadius: 1,
                  backgroundColor: 'rgba(106, 101, 51, 0.3)',
                },
                ids: {
                  padding: [2, 5],
                  fontSize: 8,
                  color: '#fff', // <--- 修改为白色
                  borderColor: '#804d45',
                  borderWidth: 0.5,
                  borderRadius: 2,
                  backgroundColor: 'rgba(128, 77, 69, 0.3)',
                },
                ids2: {
                  padding: [2, 5],
                  fontSize: 8,
                  color: '#fff', // <--- 修改为白色
                  borderColor: '#3a8fa4',
                  borderWidth: 0.5,
                  borderRadius: 2,
                  backgroundColor: 'rgba(58, 143, 164, 0.3)',
                },
                ids3: {
                  padding: [2, 5],
                  fontSize: 8,
                  color: '#fff', // <--- 修改为白色
                  borderColor: '#276d63',
                  borderWidth: 0.5,
                  borderRadius: 2,
                  backgroundColor: 'rgba(39, 109, 99, 0.3)',
                },
                nameStyle: {
                  padding: [0, 0, 0, 10], // 名称与排名之间的间距
                  fontSize: 8,
                  color: '#fff', // <--- 确保名称颜色也是白色
                },
              },
            }
          },
          {
            // Series 3: 散点图 (用于显示右侧的数值和单位文字)
            type: 'scatter',
            symbolSize: 0, // 隐藏散点图标记
            z: 12, // 确保在最上层
            xAxisIndex: 0, // 关联到 X 轴
            yAxisIndex: 0, // 关联到 Y 轴
            // 数据点的 X 坐标设置为 X轴最大值，Y 坐标对应分类的索引
            data: valueData.map((value, index) => {
              // X 坐标设置为 X轴的最大值，Y 坐标为索引
              return [xAxisMaxValue, index];
            }),
            label: {
              show: true, // 显示标签
              position: 'right', // 标签位置：在数据点右侧 (数据点在 X轴最大值)
              offset: [0, -15], // 调整标签偏移 [offsetX, offsetY]，向右偏移 0px，向上偏移 15px
              // color: '#00ffff', // <--- 这行可以移除或保留，但 rich 样式会覆盖它
              fontSize: 8, // 标签字体大小 (这是整个标签的基准字体大小，rich 样式可以覆盖)
              align: 'right', // 标签内部文本右对齐
              formatter: (params) => {
                // params.data 是当前数据项 [x, y]
                // params.data[0] 是 X 坐标 (也就是我们设置的 xAxisMaxValue)
                // 我们需要显示实际的数值，所以从 valueData 中获取
                const index = params.data[1]; // 获取 Y 轴索引
                const actualValue = valueData[index]; // 获取实际数值

                // 使用 rich 文本样式来分别控制数值和单位的颜色和样式
                return `{valueStyle|${actualValue}}{unitStyle|平方公里}`;
              },
              rich: {
                // 定义一个名为 'valueStyle' 的 rich 样式
                valueStyle: {
                  color: '#fff', // <--- 设置数值的颜色为白色
                  // 可以添加其他样式，如 fontSize, fontWeight 等
                  fontSize: 8, // 数值字体大小，与标签基准一致
                },
                // 定义一个名为 'unitStyle' 的 rich 样式
                unitStyle: {
                  color: 'rgba(255, 255, 255, 0.5)', // <--- 设置单位的颜色为白色，透明度 0.5
                  fontSize: 6, // <--- 设置单位的字体大小，比数值小
                  // 可以添加一些左侧内边距，让单位和数值之间有间隔
                  padding: [0, 0, 0, 3], // 例如：左侧内边距 3 像素
                }
              },
            }
          },
        ]
      };

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
          myChart.dispose();
        }
      };
    }
  }, [data, xAxisMaxValue]); // 依赖项数组：当 data 或 xAxisMaxValue 变化时，重新运行 effect

  return (
    // 图表容器 div，设置 ref 并给它一个尺寸
    // 确保这个 div 有足够的尺寸来显示图表和文字
    <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
    </div>
  );
}
