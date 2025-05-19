import React from 'react';
import useRemFontSize from './hooks/useRemFontSize'; // 调整路径
import './App.less'; // 你的全局样式或 App 样式
import BidScreen from './View/BidScreen';
function App() {
  useRemFontSize(); // 调用自定义 Hook 来管理字体大小

  return (
    <div className="App">
      <BidScreen />
    </div>
  );
}

export default App;
