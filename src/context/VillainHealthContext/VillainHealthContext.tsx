import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useScenarioContext } from "../ScenarioContext/ScenarioContext";
import cloneDeep from "lodash/cloneDeep";
import { OnDefeatOption } from "../../models/Villain";

export interface VillainHealth {
  currentHealth: number;
  maxHealth: number;
}
export interface VillainHealthContextProps {
  increaseCurrentHealth: (villainIndex: number, value?: number) => void;
  decreaseCurrentHealth: (villainIndex: number, value?: number) => void;
  increaseMaxHealth: (villainIndex: number, value?: number) => void;
  decreaseMaxHealth: (villainIndex: number, value?: number) => void;
  getVillainHealth: (villainIndex: number) => VillainHealth;
  hasLoadedHealth: boolean;
}

export const VillainHealthContextDefaults: VillainHealthContextProps = {
  increaseCurrentHealth: (villainIndex) => null,
  decreaseCurrentHealth: (villainIndex) => null,
  increaseMaxHealth: (villainIndex) => null,
  decreaseMaxHealth: (villainIndex) => null,
  getVillainHealth: () => ({} as VillainHealth),
  hasLoadedHealth: false,
};

export const VillainHealthContext = React.createContext(
  VillainHealthContextDefaults
);

export const useVillainHealthContext = (): VillainHealthContextProps =>
  React.useContext(VillainHealthContext);

export const VillainHealthContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const {
    numberOfPlayers,
    selectedScenario,
    getVillainStage,
    isStartingPoint,
    moveToNextVillainStage,
    moveToNextSchemeStage,
    isVillainInLastStage,
    onVictoryCallback,
  } = useScenarioContext();
  const [healths, setHealths] = useState<Array<VillainHealth>>([]);

  const [hasLoadedHealth, setHasLoadedHealth] = useState<boolean>(false);
  const [villainIndexToReset, setVillainIndexToReset] = useState<number>();

  const getInitialHealth = useCallback(
    (villainIndex: number) => {
      const villainStage = getVillainStage(villainIndex);
      const temporaryHealth =
        villainStage.maxHealthPerPlayer * (numberOfPlayers || 0);
      return { currentHealth: temporaryHealth, maxHealth: temporaryHealth };
    },
    [getVillainStage, numberOfPlayers]
  );

  useEffect(() => {
    if (isStartingPoint) {
      const results =
        selectedScenario?.villains.map((res, index) => {
          return getInitialHealth(index);
        }) || [];

      setHealths(results);
      setHasLoadedHealth(true);
    }
  }, [getInitialHealth, selectedScenario, isStartingPoint]);

  const getVillainHealth = (villainIndex: number) => {
    return healths[villainIndex];
  };

  const increaseCurrentHealth = (villainIndex: number, value: number = 1) => {
    setHealths((prevState) => {
      const results = cloneDeep(prevState);
      if (
        results[villainIndex].currentHealth < results[villainIndex].maxHealth
      ) {
        results[villainIndex].currentHealth += value;
      } else {
        results[villainIndex].currentHealth = results[villainIndex].maxHealth;
      }
      return results;
    });
  };

  const decreaseCurrentHealth = (villainIndex: number, value: number = 1) => {
    setHealths((prevState) => {
      const results = cloneDeep(prevState);
      if (results[villainIndex].currentHealth > value) {
        results[villainIndex].currentHealth -= value;
      } else {
        results[villainIndex].currentHealth = 0;
      }
      return results;
    });
  };

  const increaseMaxHealth = (villainIndex: number, value: number = 1) => {
    setHealths((prevState) => {
      const results = cloneDeep(prevState);
      results[villainIndex].maxHealth += value;
      results[villainIndex].currentHealth += value;

      return results;
    });
  };

  const decreaseMaxHealth = (villainIndex: number, value: number = 1) => {
    setHealths((prevState) => {
      const results = cloneDeep(prevState);

      if (results[villainIndex].currentHealth > value) {
        results[villainIndex].maxHealth -= value;
        results[villainIndex].currentHealth -= value;
      } else {
        results[villainIndex].maxHealth = 0;
        results[villainIndex].currentHealth = 0;
      }

      return results;
    });
  };

  const defeat = (villainIndex: number) => {
    const onDefeat = getVillainStage(villainIndex).onDefeat;
    switch (onDefeat) {
      case OnDefeatOption.MoveToNextStage: {
        if (isVillainInLastStage(villainIndex)) {
          onVictoryCallback();
        } else {
          moveToNextVillainStage(villainIndex);
          setVillainIndexToReset(villainIndex);
        }
        break;
      }
    }
  };

  useEffect(() => {
    healths.forEach((health, index) => {
      if (health.currentHealth <= 0) {
        defeat(index);
      }
    });
  }, [healths]);

  useEffect(() => {
    if (villainIndexToReset !== undefined) {
      setHealths((prevState) => {
        const results = cloneDeep(prevState);
        results[villainIndexToReset] = getInitialHealth(villainIndexToReset);
        return results;
      });
      setVillainIndexToReset(undefined);
    }
  }, [villainIndexToReset]);

  return (
    <VillainHealthContext.Provider
      value={{
        increaseCurrentHealth,
        decreaseCurrentHealth,
        increaseMaxHealth,
        decreaseMaxHealth,
        getVillainHealth,
        hasLoadedHealth,
      }}
    >
      {children}
    </VillainHealthContext.Provider>
  );
};
