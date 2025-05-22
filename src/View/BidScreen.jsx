import React from 'react'
import { FullScreenContainer } from '@jiaminghi/data-view-react'
import './index.less'
import Header from './commpent/Header/index'
import Title from './commpent/Title/Title'
import Title2 from './commpent/Title/Title2'
import ActiveRingChart from './commpent/ActiveRingChart'
import Facilities from './commpent/facilities/Facilities'
import Industry from './commpent/industry/Industry'
import Scatter from './commpent/scatter/Scatter.jsx'
import Airspace from './commpent/airspace/Airspace.jsx'
import Arc from './commpent/arc/Arc' 




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
                <Title title="空域图" name='现状设施'></Title>
                <div className="left_top-content">
                  <div className='left_top-content_left'>
                    <ActiveRingChart></ActiveRingChart>
                  </div>
                  <div className='left_top-content_right'>
                    <div className='left_top-content_right-content'>
                      {/* 圆点 */}
                      <div className='left_top-content_right-content_dot-container'>
                        <div className='left_top-content_right-content_dot'></div>
                        {/* 文字 */}
                        <div className='left_top-content_right-content_text'>枢纽机场</div>
                      </div>
                      {/* 数量 */}
                      <div className='left_top-content_right-content_number'>1个</div>
                    </div>
                    <div className='left_top-content_right-content'>
                      {/* 圆点 */}
                      <div className='left_top-content_right-content_dot-container'>
                        <div className='left_top-content_right-content_dot'></div>
                        {/* 文字 */}
                        <div className='left_top-content_right-content_text'>支线机场</div>
                      </div>
                      {/* 数量 */}
                      <div className='left_top-content_right-content_number'>4个</div>
                    </div>
                    <div className='left_top-content_right-content'>
                      {/* 圆点 */}
                      <div className='left_top-content_right-content_dot-container'>
                        <div className='left_top-content_right-content_dot'></div>
                        {/* 文字 */}
                        <div className='left_top-content_right-content_text'>通用机场</div>
                      </div>
                      {/* 数量 */}
                      <div className='left_top-content_right-content_number'>3个</div>
                    </div>
                    <div className='left_top-content_right-content'>
                      {/* 圆点 */}
                      <div className='left_top-content_right-content_dot-container'>
                        <div className='left_top-content_right-content_dot'></div>
                        {/* 文字 */}
                        <div className='left_top-content_right-content_text'>跑道型起降点</div>
                      </div>
                      {/* 数量 */}
                      <div className='left_top-content_right-content_number'>5个</div>
                    </div>
                    <div className='left_top-content_right-content'>
                      {/* 圆点 */}
                      <div className='left_top-content_right-content_dot-container'>
                        <div className='left_top-content_right-content_dot'></div>
                        {/* 文字 */}
                        <div className='left_top-content_right-content_text'>水上起降点</div>
                      </div>
                      {/* 数量 */}
                      <div className='left_top-content_right-content_number'>1个</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 设施图 */}
              <div className="left_center">
                <Title title="设施图" name='起降点'></Title>
                <Facilities></Facilities>
              </div>


              {/* 产业图 */}
              <div className="left_bottom">
                <Title title="产业图" name='产业用地'></Title>
                <Industry></Industry>
              </div>

            </div>
            {/* 中间区域:地图 */}
            <div className="center">
            {/* 背景图的外部模糊框 */}
              {/* <div className='center_img_bg'> */}
                {/* 引入背景图 */}
                <div className='center_img'></div>
                <Arc/>
                
              {/* </div> */}
            </div>
            {/* 右边区域:数据展示 */}
            <div className="right">
              {/* 无人机飞行管理网 */}
              <div className="right_top">
                <Title2 title="无人机飞行管理网"></Title2>
                <div className="right_top_content">
                  <div className='content_text'><span style={{ marginLeft: '0.2rem' }}>指挥调度</span></div>
                  <div className='content_text'><span style={{ marginLeft: '0.2rem' }}>设备管理</span></div>
                  <div className='content_text'><span style={{ marginLeft: '0.2rem' }}>航线库</span></div>
                  <div className='content_text'><span style={{ marginLeft: '0.2rem' }}>资产库</span></div>
                  <div className='content_text'><span style={{ marginLeft: '0.2rem' }}>AI分析</span></div>
                  <div className='content_text'><span style={{ marginLeft: '0.2rem' }}>计划库</span></div>
                </div>

              </div>

              {/* 低空智能侦测网 */}
              <div className="right_center">
                <Title2 title="低空智能侦测网" ></Title2>
                <Scatter></Scatter>
              </div>


              {/* 场景图 */}
              <div className="right_bottom">
                <Title2 title="场景图"></Title2>
                <div className='right_bottom_content'>
                  <div className='right_bottom_content_img'>
                    <div className='right_bottom_imgLeft'>
                      <p>公共服务</p>
                      <p><span>32</span>项</p>
                    </div>
                    <div className='right_bottom_imgRight'>
                      <p>商业服务</p>
                      <p><span>34</span>项</p>
                    </div>
                  </div>
                  <div className='right_bottom_content_img'>
                    <div className='right_bottom_imgLeft'>
                      <p>行业服务</p>
                      <p><span>12项</span></p>
                    </div>
                    <div className='right_bottom_imgRight'>
                      <p>其他服务</p>
                      <p><span>10</span>项</p>
                    </div>
                  </div>
                  {/* 进行定位于中间 */}
                  <div className='right_bottom_echarts'>
                    <Airspace></Airspace>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </FullScreenContainer>
    </div>
  )
}
