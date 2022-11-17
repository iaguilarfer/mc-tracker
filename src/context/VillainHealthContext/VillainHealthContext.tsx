import React, { PropsWithChildren, useEffect, useState } from "react";
import { useScenarioContext } from "../ScenarioContext/ScenarioContext";

export interface VillainHealth {
  currentHealth: number;
  maxHealth: number;
}
export interface VillainHealthContextProps {
  increaseCurrentHealth: (value?: number) => void;
  decreaseCurrentHealth: (value?: number) => void;
  increaseMaxHealth: (value?: number) => void;
  decreaseMaxHealth: (value?: number) => void;
  currentHealth: number;
  maxHealth: number;
  health: VillainHealth;
}

export const VillainHealthContextDefaults: VillainHealthContextProps = {
  increaseCurrentHealth: () => null,
  decreaseCurrentHealth: () => null,
  increaseMaxHealth: () => null,
  decreaseMaxHealth: () => null,
  currentHealth: 0,
  maxHealth: 0,
  health: { currentHealth: 0, maxHealth: 0 },
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

  const [health, setHealth] = useState<VillainHealth>({
    currentHealth: 0,
    maxHealth: 0,
  });
  useEffect(() => {
    const temporaryHealth = currentVillain
      ? currentVillain.maxHealthPerPlayer * (numberOfPlayers || 0)
      : 0;
    setHealth({ currentHealth: temporaryHealth, maxHealth: temporaryHealth });
  }, [currentVillain, numberOfPlayers]);

  const increaseCurrentHealth = (value: number = 1) => {
    setHealth((prevState) => {
      if (prevState.currentHealth < prevState.maxHealth) {
        return {
          ...prevState,
          currentHealth: prevState.currentHealth + value,
        };
      } else {
        return {
          ...prevState,
          currentHealth: prevState.maxHealth,
        };
      }
    });
  };

  const increaseMaxHealth = (value: number = 1) => {
    setHealth((prevState) => {
      return {
        maxHealth: prevState.maxHealth + value,
        currentHealth: prevState.currentHealth + value,
      };
    });
  };

  const decreaseMaxHealth = (value: number = 1) => {
    if (health.currentHealth <= value) {
      advanceVillainStage();
    }

    setHealth((prevState) => {
      if (prevState.currentHealth > value) {
        return {
          maxHealth: prevState.maxHealth - value,
          currentHealth: prevState.currentHealth - value,
        };
      } else {
        return {
          maxHealth: 0,
          currentHealth: 0,
        };
      }
    });
  };

  const decreaseCurrentHealth = (value: number = 1) => {
    if (health.currentHealth <= value) {
      advanceVillainStage();
    }

    setHealth((prevState) => {
      if (prevState.currentHealth > value) {
        return {
          ...prevState,
          currentHealth: prevState.currentHealth - value,
        };
      } else {
        return {
          ...prevState,
          currentHealth: 0,
        };
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
        health,
        currentHealth: health.currentHealth,
        maxHealth: health.maxHealth,
      }}
    >
      {children}
    </VillainHealthContext.Provider>
  );
};
