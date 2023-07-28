import { useEffect, useState } from 'react';

export default function useMessage(
  startMessage: string,
  observersFunctions: Array<(message: unknown) => void>
) {
  const [sourceWindow, setSourceWindow] = useState<MessageEventSource>();
  const [sourceOrigin, setSourceOrigin] = useState<string>();

  function postMessage(msg: unknown) {
    sourceWindow.postMessage(msg, { targetOrigin: sourceOrigin });
  }

  useEffect(() => {
    let startedMessaging = false;

    function messageReceiver(e: MessageEvent) {
      console.log(e.data);
      if (e.data === startMessage) {
        setSourceWindow(e.source);
        setSourceOrigin(e.origin);

        startedMessaging = true;
      }

      if (!startedMessaging) return;

      observersFunctions.forEach(func => func(e.data));
    }

    window.addEventListener('message', messageReceiver);

    return () => window.removeEventListener('message', messageReceiver);
  }, [startMessage, observersFunctions]);

  return {
    postMessage,
    sourceWindow,
    sourceOrigin,
  };
}
