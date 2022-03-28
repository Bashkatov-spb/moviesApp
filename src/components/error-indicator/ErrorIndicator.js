import { Alert } from 'antd';
import React from 'react';

function ErrorIndicator() {
  return (
    <div>
      <Alert type="warning" description="Film is not found :(" showIcon />
    </div>
  );
}

export default ErrorIndicator;
