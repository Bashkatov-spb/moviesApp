import { Alert } from 'antd';
import React from 'react';

function ErrorIndicator() {
  return (
    <div>
      <Alert message="Error" type="error" description="Where is your internet?" showIcon />
    </div>
  );
}

export default ErrorIndicator;
