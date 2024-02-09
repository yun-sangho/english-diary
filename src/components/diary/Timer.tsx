'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { Timer as T } from '@mui/icons-material';

enum TimerState {
  Running,
  Paused,
  Stopped,
}
const INITIAL_TIME = 60;
export function Timer() {
  const [state, setState] = useState(TimerState.Stopped);
  const [time, setTime] = useState(INITIAL_TIME);

  const interval = useRef<any>();

  useEffect(() => {
    if (state === TimerState.Running) {
      interval.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval.current);
    }
  }, [state]);

  useEffect(() => {
    if (time === 0) {
      setState(TimerState.Stopped);
      setTime(INITIAL_TIME);
    }
  }, [time]);

  return (
    <Button
      variant='contained'
      size={'medium'}
      color={
        state === TimerState.Running
          ? 'error'
          : state === TimerState.Paused
            ? 'warning'
            : 'primary'
      }
      startIcon={<T />}
      onClick={() => {
        if (state === TimerState.Running) {
          setState(TimerState.Paused);
        } else {
          setState(TimerState.Running);
        }
      }}
    >
      {timerText(state, time)}
    </Button>
  );
}

const timerText = (state: TimerState, time: number) => {
  if (state === TimerState.Stopped) return 'Start';
  if (state === TimerState.Running) return time;
  return 'Resume';
};
