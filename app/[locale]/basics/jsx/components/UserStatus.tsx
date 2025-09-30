import React, { useState } from 'react';

function UserStatus() {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState('刚刚');

  return (
    <div>
      <h1>用户状态</h1>
      <div className="status-indicator">
        <span className={isOnline ? 'online' : 'offline'}>
          {isOnline ? '在线' : '离线'}
        </span>
        {!isOnline && <span className="last-seen">最后在线: {lastSeen}</span>}
      </div>
      <button onClick={() => setIsOnline(!isOnline)}>
        {isOnline ? '设为离线' : '设为在线'}
      </button>
    </div>
  );
}

export default UserStatus; 