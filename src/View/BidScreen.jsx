import React from 'react'
import { FullScreenContainer, BorderBox1 } from '@jiaminghi/data-view-react'
import './index.less'
import Header from './commpent/Header/index'
export default function BidScreen() {
  return (
    <div className='bid'>
      {/* datav的全局容器组件，自适应组件 */}
      <FullScreenContainer>
        <div className="big_border">
          <Header>
            <span><span style={{ color: '#befefb' }}>「重庆低空经济」</span><span style={{ color: '#fff' }}>智能驾驶舱</span></span>
          </Header>
          {/* 边框内部区域划分 */}
          <div className="bid_content">
            {/* 左边区域:空域图 设施图 产业图 */}
            <div className="left">
              {/* 空域图 */}
              <div className="left_top">
                1
              </div>

              {/* 设施图 */}
              <div className="left_center">
                2
              </div>


              {/* 产业图 */}
              <div className="left_bottom">
                3
              </div>

            </div>
            {/* 中间区域:地图 */}
            <div className="center">
              我是中心区域
            </div>
            {/* 右边区域:数据展示 */}
            <div className="right">
              {/* 无人机飞行管理网 */}
              <div className="right_top">
                无人机飞行管理网
              </div>

              {/* 低空智能侦测网 */}
              <div className="right_center">
                低空智能侦测网
              </div>


              {/* 场景图 */}
              <div className="right_bottom">
                场景图
              </div>
            </div>
          </div>
        </div>
      </FullScreenContainer>
    </div>
  )
}
