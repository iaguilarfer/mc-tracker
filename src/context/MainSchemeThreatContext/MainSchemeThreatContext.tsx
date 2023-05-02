import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useScenarioContext } from "../ScenarioContext/ScenarioContext";
import cloneDeep from "lodash/cloneDeep";
import { onThreatGetToMaxOption } from "../../models/MainScheme";

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
  hasLoadedThreat: boolean;
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
  hasLoadedThreat: false,
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
    isStartingPoint,
    selectedScenario,
    getMainSchemeStage,
    isMainSchemeInLastStage,
    moveToNextSchemeStage,
    onDefeatCallback,
  } = useScenarioContext();

  const [threats, setThreats] = useState<Array<MainSchemeThreat>>([]);
  const [hasLoadedThreat, setHasLoadedThreat] = useState<boolean>(false);
  const [mainSchemeIndexToReset, setMainSchemeIndexToReset] =
    useState<number>();

  const getInitialThreat = useCallback(
    (mainSchemeIndex: number, accelerationTokens: number = 0) => {
      const mainSchemeStage = getMainSchemeStage(mainSchemeIndex);
      return {
        currentThreat: mainSchemeStage
          ? mainSchemeStage.startingThreatPerPlayer * (numberOfPlayers || 0)
          : 0,
        maxThreat: mainSchemeStage
          ? mainSchemeStage.maxThreatPerPlayer * (numberOfPlayers || 0)
          : 0,
        threatPerTurn: mainSchemeStage
          ? mainSchemeStage?.threatPerTurnPerPlayer * (numberOfPlayers || 0) +
            accelerationTokens
          : 0,
        accelerationTokens: accelerationTokens,
      };
    },
    [getMainSchemeStage, numberOfPlayers]
  );

  useEffect(() => {
    if (isStartingPoint) {
      const results =
        selectedScenario?.mainSchemes.map((res, index) => {
          return getInitialThreat(index);
        }) || [];
      setThreats(results);
      setHasLoadedThreat(true);
    }
  }, [isStartingPoint, selectedScenario, getInitialThreat]);

  const getThreat = (index: number) => {
    return threats[index];
  };

  const increaseCurrentThreat = (index: number, value: number = 1) => {
    setThreats((prevState) => {
      const results = cloneDeep(prevState);
      if (results[index].currentThreat < results[index].maxThreat) {
        results[index].currentThreat += value;
      } else {
        results[index].currentThreat = results[index].maxThreat;
      }

      return results;
    });
  };

  const decreaseCurrentThreat = (index: number, value: number = 1) => {
    setThreats((prevState) => {
      const results = cloneDeep(prevState);
      if (results[index].currentThreat <= value) {
        results[index].currentThreat = 0;
      } else {
        results[index].currentThreat -= value;
      }
      return results;
    });
  };

  const increaseMaxThreat = (index: number, value: number = 1) => {
    setThreats((prevState) => {
      const results = cloneDeep(prevState);
      results[index].maxThreat += value;
      return results;
    });
  };

  const decreaseMaxThreat = (index: number, value: number = 1) => {
    setThreats((prevState) => {
      const results = cloneDeep(prevState);
      if (results[index].maxThreat <= value) {
        results[index].maxThreat = 0;
      } else {
        results[index].maxThreat -= value;
      }
      return results;
    });
  };

  const increaseAccelerationTokens = (index: number, value: number = 1) => {
    setThreats((prevState) => {
      const results = cloneDeep(prevState);

      results[index].accelerationTokens += value;
      results[index].threatPerTurn += value;

      return results;
    });
  };

  const decreaseAccelerationTokens = (index: number, value: number = 1) => {
    setThreats((prevState) => {
      const results = cloneDeep(prevState);

      if (results[index].accelerationTokens <= value) {
        results[index].accelerationTokens = 0;
        results[index].threatPerTurn -= prevState[index].accelerationTokens;
      } else {
        results[index].accelerationTokens -= value;
        results[index].threatPerTurn -= value;
      }

      return results;
    });
  };

  const startVillainTurn = () => {
    setThreats((prevState) => {
      return prevState.map((threat) => {
        const results = { ...threat };
        results.currentThreat += results.threatPerTurn;
        return results;
      });
    });
  };

  useEffect(() => {
    if (mainSchemeIndexToReset !== undefined) {
      setThreats((prevState) => {
        const results = cloneDeep(prevState);
        results[mainSchemeIndexToReset] = getInitialThreat(
          mainSchemeIndexToReset,
          prevState[mainSchemeIndexToReset].accelerationTokens
        );
        return results;
      });
      setMainSchemeIndexToReset(undefined);
    }
  }, [mainSchemeIndexToReset, getInitialThreat]);

  const threatGetToMax = useCallback(
    (mainSchemeIndex: number) => {
      const onThreatGetToMax =
        getMainSchemeStage(mainSchemeIndex).onThreatGetToMax;
      switch (onThreatGetToMax) {
        case onThreatGetToMaxOption.MoveToNextStage: {
          if (isMainSchemeInLastStage(mainSchemeIndex)) {
            onDefeatCallback();
          } else {
            moveToNextSchemeStage(mainSchemeIndex);
            setMainSchemeIndexToReset(mainSchemeIndex);
          }
          break;
        }
      }
    },
    [
      getMainSchemeStage,
      isMainSchemeInLastStage,
      moveToNextSchemeStage,
      onDefeatCallback,
    ]
  );

  useEffect(() => {
    threats.forEach((threat, index) => {
      if (threat.currentThreat >= threat.maxThreat) {
        threatGetToMax(index);
      }
    });
  }, [threats, threatGetToMax]);

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
        getThreat,
        hasLoadedThreat,
      }}
    >
      {children}
    </MainSchemeThreatContext.Provider>
  );
};
