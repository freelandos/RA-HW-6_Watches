import { FC, useEffect, useState } from "react";
import { ClockForm } from "./ClockForm";
import { Clock } from "./Clock";
import { IClock } from "../models";

export const Clocks: FC = () => {
  const [clocks, setClocks] = useState<IClock[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleAddClock = (newClock: IClock) => {
    const isClockExisting = clocks.some(clock => clock.city === newClock.city);

    if (!isClockExisting) {
      setClocks([...clocks, newClock]);
    }
  };

  const handleDeleteClock = (city: string) => {
    setClocks(clocks.filter(clock => clock.city !== city));
  };

  return (
    <div className="container">
      <ClockForm onAdd={handleAddClock} />
      <div className="clocks">
        {clocks.map(clock => (
          <Clock key={clock.city} clock={clock} currentTime={currentTime} onDelete={handleDeleteClock} />
        ))}
      </div>
    </div>
  );
};
