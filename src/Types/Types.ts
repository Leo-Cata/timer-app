export interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}

export interface TimeState {
  time: Time;
  setTime: (value: Time) => void;
}
