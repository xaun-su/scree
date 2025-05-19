import React from 'react';
import useRemFontSize from './hooks/useRemFontSize'; // 调整路径
import Bid from './View/Bid'; // 你的 Bid 组件
import './App.css'; // 你的全局样式或 App 样式

function App() {
  useRemFontSize(); // 调用自定义 Hook 来管理字体大小

  return (
    <div className="App">
      <Bid />
    </div>
  );
}

export default App;
