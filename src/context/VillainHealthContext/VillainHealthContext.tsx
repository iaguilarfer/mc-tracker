import React, { PropsWithChildren, useEffect, useState } from "react";
import { useScenarioContext } from "../ScenarioContext/ScenarioContext";

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
}

export const VillainHealthContextDefaults: VillainHealthContextProps = {
  increaseCurrentHealth: (villainIndex) => null,
  decreaseCurrentHealth: (villainIndex) => null,
  increaseMaxHealth: (villainIndex) => null,
  decreaseMaxHealth: (villainIndex) => null,
  getVillainHealth: () => ({} as VillainHealth),
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
  } = useScenarioContext();
  const [healths, setHealths] = useState<Array<VillainHealth>>([]);

  useEffect(() => {
    if (isStartingPoint) {
      const results =
        selectedScenario?.villains.map((res, index) => {
          const villainStage = getVillainStage(index);

          const temporaryHealth =
            villainStage.maxHealthPerPlayer * (numberOfPlayers || 0);
          return { currentHealth: temporaryHealth, maxHealth: temporaryHealth };
        }) || [];

      setHealths(results);
    }
  }, [numberOfPlayers, selectedScenario, isStartingPoint, getVillainStage]);

  const getVillainHealth = (villainIndex: number) => {
    return healths[villainIndex];
  };

  const increaseCurrentHealth = (villainIndex: number, value: number = 1) => {
    setHealths((prevState) => {
      const results = [...prevState];
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
      const results = [...prevState];
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
      const results = [...prevState];
      results[villainIndex].maxHealth += value;
      results[villainIndex].currentHealth += value;

      return results;
    });
  };

  const decreaseMaxHealth = (villainIndex: number, value: number = 1) => {
    if (healths[villainIndex].currentHealth <= value) {
      //defeatVillain(villainIndex);
    }

    setHealths((prevState) => {
      const results = [...prevState];

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

  return (
    <VillainHealthContext.Provider
      value={{
        increaseCurrentHealth,
        decreaseCurrentHealth,
        increaseMaxHealth,
        decreaseMaxHealth,
        getVillainHealth,
      }}
    >
      {children}
    </VillainHealthContext.Provider>
  );
};
