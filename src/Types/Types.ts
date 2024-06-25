export interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}

export interface TimeState {
  time: Time;
  setTime: (value: Time) => void;
}

export interface SavedTimes extends Time {
  name: string;
}

interface SetDateNow {
  setDateNow: (value: string) => void;
}

export interface SavedItemProps extends SetDateNow {
  storedTimes: SavedTimes[];
}

export interface StateSetterDateNow extends SetDateNow {
  dateNow: string;
}
