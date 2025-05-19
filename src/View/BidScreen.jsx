import React from 'react'
import { FullScreenContainer,BorderBox1 } from '@jiaminghi/data-view-react'
import './index.css'
import Header from './commpent/Header/index'
export default function BidScreen() {
  return (
    <div className='bid'>
    {/* datav的全局容器组件，自适应组件 */}
      <FullScreenContainer>
      <div className="big_border">
        <Header>
          <span><span style={{color:'#befefb'}}>「重庆低空经济」</span><span style={{color:'#fff'}}>智能驾驶舱</span></span>
        </Header>
      </div>
      </FullScreenContainer>
    </div>
  )
}
