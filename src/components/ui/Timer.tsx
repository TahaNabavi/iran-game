import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Timer({ timestamp }: { timestamp: number }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  
  useEffect(() => {
    const countdown = () => {
      const now = new Date().getTime() / 1000;
      const timeDiff = +(timestamp / 1000).toFixed(0) - now;
      if (timeDiff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(timeDiff / 86400);
        const hours = Math.floor((timeDiff % 86400) / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = Math.floor(timeDiff % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    const intervalId = setInterval(countdown, 1000);
    return () => clearInterval(intervalId);
  }, [timestamp]);


  return (
    <div className="flex gap-5">
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ '--value': timeLeft.days } as React.CSSProperties}></span>
        </span>
        {t('days')}
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ '--value': timeLeft.hours } as React.CSSProperties}></span>
        </span>
        {t('hours')}
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ '--value': timeLeft.minutes } as React.CSSProperties}></span>
        </span>
        {t('min')}
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ '--value': timeLeft.seconds } as React.CSSProperties}></span>
        </span>
        {t('sec')}
      </div>
    </div>
  );
}

export default Timer;