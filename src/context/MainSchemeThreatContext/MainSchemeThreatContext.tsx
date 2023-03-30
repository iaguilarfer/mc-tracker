import React, { PropsWithChildren, useEffect, useState } from "react";
import { useScenarioContext } from "../ScenarioContext/ScenarioContext";

export interface MainSchemeThreat {
  currentThreat: number;
  maxThreat: number;
  accelerationTokens: number;
  threatPerTurn: number;
}

export interface MainSchemeThreatContextProps {
  increaseCurrentThreat: (mainSchemeIndex: number, value?: number) => void;
  decreaseCurrentThreat: (mainSchemeIndex: number, value?: number) => void;
  increaseMaxThreat: (mainSchemeIndex: number, value?: number) => void;
  decreaseMaxThreat: (mainSchemeIndex: number, value?: number) => void;
  increaseAccelerationTokens: (mainSchemeIndex: number, value?: number) => void;
  decreaseAccelerationTokens: (mainSchemeIndex: number, value?: number) => void;
  startVillainTurn: () => void;
  getThreat: (mainSchemeIndex: number) => MainSchemeThreat;
}

export const MainSchemeThreatContextDefaults: MainSchemeThreatContextProps = {
  increaseCurrentThreat: () => null,
  decreaseCurrentThreat: () => null,
  increaseMaxThreat: () => null,
  decreaseMaxThreat: () => null,
  increaseAccelerationTokens: () => null,
  decreaseAccelerationTokens: () => null,
  startVillainTurn: () => null,
  getThreat: () => ({} as MainSchemeThreat),
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
    hasGameStarted,
    isStartingPoint,
    selectedScenario,
    getMainSchemeStage,
  } = useScenarioContext();

  const [threats, setThreats] = useState<Array<MainSchemeThreat>>([]);

  useEffect(() => {
    if (isStartingPoint) {
      const results =
        selectedScenario?.mainSchemes.map((res, index) => {
          const mainSchemeStage = getMainSchemeStage(index);
          return {
            currentThreat: mainSchemeStage
              ? mainSchemeStage.startingThreatPerPlayer * (numberOfPlayers || 0)
              : 0,
            maxThreat: mainSchemeStage
              ? mainSchemeStage.maxThreatPerPlayer * (numberOfPlayers || 0)
              : 0,
            threatPerTurn: mainSchemeStage
              ? mainSchemeStage?.threatPerTurnPerPlayer * (numberOfPlayers || 0)
              : 0,
            accelerationTokens: 0,
          };
        }) || [];

      setThreats(results);
    }
  }, [numberOfPlayers, isStartingPoint, selectedScenario, getMainSchemeStage]);

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
