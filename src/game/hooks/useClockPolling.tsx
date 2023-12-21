import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import clockClient from "../../clients/clockClient";
import {Round} from "../../league/model/LeagueDataTypes";
import {ClockData} from "../model/ClockDataTypes";

function useClockPolling(gameId: number) {
  const [clock, setClock] = useState<ClockData>(initializeClock());
  const navigate = useNavigate();

  const checkClock = async () => {
    try {
      const currentClock: ClockData | null = await clockClient.getClock(gameId, navigate);
      if (currentClock) {
        setClock(currentClock);
      }
    } catch (error) {
      // Do nothing
    }
  };

  useEffect(() => {
    const timer = setInterval(checkClock, 900);
    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [])

  const stepBack = () => {
    clockClient.stepBack(gameId, navigate);
  }
  const back = () => {
    clockClient.back(gameId, navigate);
  }
  const pause = () => {
    clockClient.pause(gameId, navigate);
  }
  const resume = () => {
    clockClient.resume(gameId, navigate);
  }
  const forward = () => {
    clockClient.forward(gameId, navigate);
  }
  const stepForward = () => {
    clockClient.stepForward(gameId, navigate);
  }

  return {
    clock,
    stepBack,
    back,
    pause,
    resume,
    forward,
    stepForward
  };
}

const initializeClock = () => {
  const thisRound: Round = {
    name: 'Round 1',
    smallBlind: 25,
    bigBlind: 50,
    ante: 0,
    duration: 20
  }
  const nextRound: Round = {
    name: 'Round 2',
    smallBlind: 50,
    bigBlind: 100,
    ante: 0,
    duration: 20
  }
  const clock: ClockData = {
    gameId: 1,
    minutes: 20,
    seconds: 0,
    playing: false,
    thisRound: thisRound,
    nextRound: nextRound,
    millisRemaining: 0
  }
  return clock;
}

export default useClockPolling;