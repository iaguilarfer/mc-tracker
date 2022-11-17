import React, { PropsWithChildren, useEffect, useState } from "react";
import { useScenarioContext } from "../ScenarioContext/ScenarioContext";

export interface VillainHealthContextProps {
  increaseCurrentHealth: (value?: number) => void;
  decreaseCurrentHealth: (value?: number) => void;
  increaseMaxHealth: (value?: number) => void;
  decreaseMaxHealth: (value?: number) => void;
  currentHealth: number;
  maxHealth: number;
}

export const VillainHealthContextDefaults: VillainHealthContextProps = {
  increaseCurrentHealth: () => null,
  decreaseCurrentHealth: () => null,
  increaseMaxHealth: () => null,
  decreaseMaxHealth: () => null,
  currentHealth: 0,
  maxHealth: 0,
};

export const VillainHealthContext = React.createContext(
  VillainHealthContextDefaults
);

export const useVillainHealthContext = (): VillainHealthContextProps =>
  React.useContext(VillainHealthContext);

export const VillainHealthContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { currentVillain, numberOfPlayers, advanceVillainStage } =
    useScenarioContext();

  const [maxHealth, setMaxHealth] = useState(0);
  const [currentHealth, setCurrentHealth] = useState(maxHealth);
  useEffect(() => {
    const temporaryHealth = currentVillain
      ? currentVillain.maxHealthPerPlayer * (numberOfPlayers || 0)
      : 0;
    setMaxHealth(temporaryHealth);
    setCurrentHealth(temporaryHealth);
  }, [currentVillain, numberOfPlayers]);

  const increaseCurrentHealth = (value: number = 1) => {
    setCurrentHealth((prevState) => {
      if (prevState < maxHealth) {
        return prevState + value;
      } else {
        return maxHealth;
      }
    });
  };

  const increaseCurrentHealthCheating = (value: number = 1) => {
    setCurrentHealth((prevState) => {
      return prevState + value;
    });
  };

  const increaseMaxHealth = (value: number = 1) => {
    setMaxHealth((prevState) => {
      return prevState + value;
    });
    increaseCurrentHealthCheating(value);
  };

  const decreaseMaxHealth = (value: number = 1) => {
    if (currentHealth <= value) {
      advanceVillainStage();
    }

    decreaseCurrentHealth(value);
    setMaxHealth((prevState) => {
      if (prevState > value) {
        return prevState - value;
      } else {
        return 0;
      }
    });
  };

  const decreaseCurrentHealth = (value: number = 1) => {
    if (currentHealth <= value) {
      advanceVillainStage();
    }

    setCurrentHealth((prevState) => {
      if (prevState > value) {
        return prevState - value;
      } else {
        return 0;
      }
    });
  };

  return (
    <VillainHealthContext.Provider
      value={{
        increaseCurrentHealth,
        decreaseCurrentHealth,
        increaseMaxHealth,
        decreaseMaxHealth,
        currentHealth,
        maxHealth,
      }}
    >
      {children}
    </VillainHealthContext.Provider>
  );
};
