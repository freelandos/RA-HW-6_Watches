import { FC, FormEvent, ChangeEvent, useState } from "react";
import { IClock } from "../models";

interface ClockFormProps {
  onAdd: (newClock: IClock) => void;
}

export const ClockForm: FC<ClockFormProps> = (props) => {
  const { onAdd } = props;
  const [city, setCity] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!city || !timezoneOffset) return;

    const newClock: IClock = {
      city: city.toLowerCase(),
      timezoneOffset: parseInt(timezoneOffset),
    };

    onAdd(newClock);
    setCity("");
    setTimezoneOffset("");
  };

  const handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleChangeTimezoneOff = (e: ChangeEvent<HTMLInputElement>) => {
    setTimezoneOffset(e.target.value);
  };

  return (
    <form id="addClockForm" onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="cityName" className="form-label">Название</label>
        <input
          id="cityName"
          type="text"
          value={city}
          onChange={handleChangeCity}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="timezoneOffset" className="form-label">Временная зона</label>
        <input
          id="timezoneOffset"
          type="number"
          value={timezoneOffset}
          onChange={handleChangeTimezoneOff}
          className="form-input"
          required
        />
      </div>
      <button type="submit" className="form-button">Добавить</button>
    </form>
  );
};
