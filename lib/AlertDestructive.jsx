import React, { useEffect } from 'react';
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertDestructive = ({ title_error, message_error }) => {
  useEffect(() => {
    const alertElement = document.getElementById('alert-destructive');
    if (alertElement) {
      alertElement.style.position = 'fixed';
      alertElement.style.top = '0%';
      alertElement.style.left = '50%';
      alertElement.style.transform = 'translateX(-50%)';
      alertElement.style.zIndex = '1000'; // Para garantir que esteja acima de outros elementos
    }
  }, []);

  return (
    <div id="alert-destructive">
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{title_error}</AlertTitle>
          <AlertDescription>{message_error}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertDestructive;