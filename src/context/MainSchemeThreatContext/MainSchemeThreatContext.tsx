import React, { PropsWithChildren, useEffect, useState } from "react";
import { useScenarioContext } from "../ScenarioContext/ScenarioContext";

export interface MainSchemeThreat {
  currentThreat: number;
  maxThreat: number;
  accelerationTokens: number;
  threatPerTurn: number;
}

export interface MainSchemeThreatContextProps {
  increaseCurrentThreat: (value?: number) => void;
  decreaseCurrentThreat: (value?: number) => void;
  increaseMaxThreat: (value?: number) => void;
  decreaseMaxThreat: (value?: number) => void;
  increaseAccelerationTokens: (value?: number) => void;
  decreaseAccelerationTokens: (value?: number) => void;
  startVillainTurn: () => void;
  currentThreat: number;
  maxThreat: number;
  threat: MainSchemeThreat;
  accelerationTokens: number;
}

export const MainSchemeThreatContextDefaults: MainSchemeThreatContextProps = {
  increaseCurrentThreat: () => null,
  decreaseCurrentThreat: () => null,
  increaseMaxThreat: () => null,
  decreaseMaxThreat: () => null,
  increaseAccelerationTokens: () => null,
  decreaseAccelerationTokens: () => null,
  startVillainTurn: () => null,
  currentThreat: 0,
  maxThreat: 0,
  accelerationTokens: 0,
  threat: {
    currentThreat: 0,
    maxThreat: 0,
    accelerationTokens: 0,
    threatPerTurn: 0,
  },
};

export const MainSchemeThreatContext = React.createContext(
  MainSchemeThreatContextDefaults
);

export const useMainSchemeThreatContext = (): MainSchemeThreatContextProps =>
  React.useContext(MainSchemeThreatContext);

export const MainSchemeThreatContextProvider: React.FC<
  PropsWithChildren<{}>
> = ({ children }) => {
  const {
    numberOfPlayers,
    advanceSchemeStage,
    currentMainScheme,
    hasGameStarted,
    isThisLastStage,
    isStartingPoint,
  } = useScenarioContext();

  const [threat, setThreat] = useState<MainSchemeThreat>({
    currentThreat: 0,
    maxThreat: 0,
    accelerationTokens: 0,
    threatPerTurn: 0,
  });

  useEffect(() => {
    if (threat.currentThreat >= threat.maxThreat && hasGameStarted) {
      if (!isThisLastStage()) {
        setThreat((prevState) => ({ ...prevState, currentThreat: 0 }));
      }
      advanceSchemeStage();
    }
  }, [
    threat.currentThreat,
    threat.maxThreat,
    advanceSchemeStage,
    hasGameStarted,
    isThisLastStage,
  ]);

  useEffect(() => {
    setThreat((prevState) => ({
      ...prevState,
      currentThreat: currentMainScheme
        ? currentMainScheme.startingThreatPerPlayer * (numberOfPlayers || 0)
        : 0,
      maxThreat: currentMainScheme
        ? currentMainScheme.maxThreatPerPlayer * (numberOfPlayers || 0)
        : 0,
      threatPerTurn: currentMainScheme
        ? prevState.accelerationTokens +
          currentMainScheme?.threatPerTurnPerPlayer * (numberOfPlayers || 0)
        : 0,
      accelerationTokens: isStartingPoint ? 0 : prevState.accelerationTokens,
    }));
  }, [currentMainScheme, numberOfPlayers, isStartingPoint]);

  const increaseCurrentThreat = (value: number = 1) => {
    setThreat((prevState) => {
      if (prevState.currentThreat < prevState.maxThreat) {
        return { ...prevState, currentThreat: prevState.currentThreat + value };
      } else {
        return { ...prevState, currentThreat: prevState.maxThreat };
      }
    });
  };

  const decreaseCurrentThreat = (value: number = 1) => {
    setThreat((prevState) => {
      if (prevState.currentThreat <= value) {
        return { ...prevState, currentThreat: 0 };
      } else {
        return { ...prevState, currentThreat: prevState.currentThreat - value };
      }
    });
  };

  const increaseMaxThreat = (value: number = 1) => {
    setThreat((prevState) => {
      return { ...prevState, maxThreat: prevState.maxThreat + value };
    });
  };

  const decreaseMaxThreat = (value: number = 1) => {
    setThreat((prevState) => {
      return { ...prevState, maxThreat: prevState.maxThreat - value };
    });
  };

  const increaseAccelerationTokens = (value: number = 1) => {
    setThreat((prevState) => {
      return {
        ...prevState,
        accelerationTokens: prevState.accelerationTokens + value,
        threatPerTurn: prevState.threatPerTurn + value,
      };
    });
  };

  const decreaseAccelerationTokens = (value: number = 1) => {
    setThreat((prevState) => {
      if (prevState.accelerationTokens <= value) {
        return {
          ...prevState,
          accelerationTokens: 0,
          threatPerTurn: prevState.threatPerTurn - prevState.accelerationTokens,
        };
      } else {
        return {
          ...prevState,
          accelerationTokens: prevState.accelerationTokens - value,
          threatPerTurn: prevState.threatPerTurn - value,
        };
      }
    });
  };

  const startVillainTurn = () => {
    setThreat((prevState) => {
      return {
        ...prevState,
        currentThreat: prevState.currentThreat + prevState.threatPerTurn,
      };
    });
  };

  return (
    <MainSchemeThreatContext.Provider
      value={{
        increaseCurrentThreat,
        increaseMaxThreat,
        decreaseCurrentThreat,
        decreaseMaxThreat,
        increaseAccelerationTokens,
        decreaseAccelerationTokens,
        startVillainTurn,
        threat,
        currentThreat: threat.currentThreat,
        maxThreat: threat.maxThreat,
        accelerationTokens: threat.accelerationTokens,
      }}
    >
      {children}
    </MainSchemeThreatContext.Provider>
  );
};
