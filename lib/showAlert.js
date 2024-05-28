import React from 'react';
import ReactDOM from 'react-dom';
import AlertDestructive from './AlertDestructive';
import AlertDefault from './AlertDefault';

let isAlertVisible = false;

const showAlert = (type, title_alert, message_alert) => {
  if (isAlertVisible) return;

  isAlertVisible = true;
  const alertContainer = document.createElement('div');
  document.body.appendChild(alertContainer);

  if (type == "destructive") {
    ReactDOM.render(
      <AlertDestructive title_error={title_alert} message_error={message_alert} />,
      alertContainer
    );
  } else {
    ReactDOM.render(
      <AlertDefault title_default={title_alert} message_default={message_alert} />,
      alertContainer
    );
  }

  setTimeout(() => {
    //ReactDOM.unmountComponentAtNode(alertContainer);
    document.body.removeChild(alertContainer);
    isAlertVisible = false;
  }, 3000);
};

export default showAlert;