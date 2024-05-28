import React, { useEffect } from 'react';
import { RocketIcon } from "@radix-ui/react-icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertDefault = ({ title_default, message_default }) => {
  useEffect(() => {
    const alertElement = document.getElementById('alert-default');
    if (alertElement) {
      alertElement.style.position = 'fixed';
      alertElement.style.top = '0%';
      alertElement.style.left = '50%';
      alertElement.style.transform = 'translateX(-50%)';
      alertElement.style.zIndex = '1000'; // Para garantir que esteja acima de outros elementos
    }
  }, []);

  return (
    <div id="alert-default">
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>{title_default}</AlertTitle>
        <AlertDescription>{message_default}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertDefault;