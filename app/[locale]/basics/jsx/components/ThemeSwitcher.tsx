import React, { useState } from 'react';

function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <h1>主题切换器</h1>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
      </button>
      <p>
        当前主题: {isDarkMode ? '深色模式' : '浅色模式'}
      </p>
    </div>
  );
}

export default ThemeSwitcher; 