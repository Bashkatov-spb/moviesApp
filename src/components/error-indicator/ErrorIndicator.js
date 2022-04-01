import { Alert } from 'antd';
import React from 'react';

function ErrorIndicator() {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Alert type="error" description="You have error with internet connection :(" showIcon />
    </div>
  );
}

export default ErrorIndicator;
