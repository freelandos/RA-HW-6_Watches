import { FC } from "react";
import { IClock } from "../models";

interface ClockProps {
  clock: IClock;
  currentTime: Date;
  onDelete: (city: string) => void;
}

export const Clock: FC<ClockProps> = (props) => {
  const { clock, currentTime, onDelete } = props;
  const { city, timezoneOffset } = clock;

  const localTime = new Date(currentTime.getTime() + timezoneOffset * 60 * 60 * 1000);

  const seconds = localTime.getUTCSeconds().toString().padStart(2, "0");
  const minutes = localTime.getUTCMinutes().toString().padStart(2, "0");
  const hours = localTime.getUTCHours().toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;

  const second = localTime.getUTCSeconds() * 6;
  const minute = localTime.getUTCMinutes() * 6 + second / 60;
  const hour = ((localTime.getUTCHours() % 12) / 12) * 360 + 90 + minute / 12;

  return (
    <div className="clock">
      <div className="clock-city">{city}</div>
      <div className="clock-circle">
        <div className="clock-face">
          <div id="hour" className="clock-hour" style={{transform: `rotate(${hour}deg)`}}></div>
          <div id="minute" className="clock-minute" style={{transform: `rotate(${minute}deg)`}}></div>
          <div id="second" className="clock-second" style={{transform: `rotate(${second}deg)`}}></div>
        </div>
      </div>
      <div>{time}</div>
      <button className="clock-button" onClick={() => onDelete(city)}>Удалить</button>
    </div>
  );
};
