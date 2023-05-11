import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Select from "react-select";
import ScenariosJson from "../../assets/data/Scenarios.json";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import styles from "./ScenarioSelector.module.scss";
import { useMainSchemeThreatContext } from "../../context/MainSchemeThreatContext/MainSchemeThreatContext";
import { useVillainHealthContext } from "../../context/VillainHealthContext/VillainHealthContext";

export const ScenarioSelector: React.FC = () => {
  const {
    setScenarioValue,
    setNumberOfPlayers,
    numberOfPlayers,
    scenarioValue,
    cleanUp: scenarioCleanUp,
    setHasGameStarted,
  } = useScenarioContext();

  const { cleanUp: healthCleanUp } = useVillainHealthContext();
  const { cleanUp: threatCleanUp } = useMainSchemeThreatContext();

  useEffect(() => {
    scenarioCleanUp();
    healthCleanUp();
    threatCleanUp();
  }, [scenarioCleanUp, healthCleanUp, threatCleanUp]);

  const { t, i18n } = useTranslation();

  const scenarioOptions = ScenariosJson.mCScenarios.map((scenario) => ({
    value: scenario.scenarioValue,
    label: t(`scenarios.${scenario.scenarioValue}.villainName`),
  }));

  const numberPlayers = [
    {
      value: "1",
      label: t("scenarioSelectorPage.numberOfPlayersSelector.one"),
    },
    {
      value: "2",
      label: t("scenarioSelectorPage.numberOfPlayersSelector.two"),
    },
    {
      value: "3",
      label: t("scenarioSelectorPage.numberOfPlayersSelector.three"),
    },
    {
      value: "4",
      label: t("scenarioSelectorPage.numberOfPlayersSelector.four"),
    },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
  ];

  const selectedScenarioOption = scenarioOptions.find(
    (option) => option.value === scenarioValue
  );

  const selectedNumberOfPlayers = numberPlayers.find(
    (option) => +option.value === numberOfPlayers
  );

  const selectedLanguage = languages.find(
    (option) => option.value === i18n.language
  );

  const ScenarioSelector = () => (
    <Select
      isSearchable={false}
      value={selectedScenarioOption}
      options={scenarioOptions}
      placeholder={t("scenarioSelectorPage.scenarioSelector.placeholder")}
      onChange={(option) => {
        if (option !== null) {
          setScenarioValue(option.value);
        }
      }}
    />
  );

  const NumberOfPlayersSelector = () => (
    <Select
      isSearchable={false}
      value={selectedNumberOfPlayers}
      options={numberPlayers}
      placeholder={t(
        "scenarioSelectorPage.numberOfPlayersSelector.placeholder"
      )}
      onChange={(option) => {
        if (option !== null) {
          setNumberOfPlayers(+option.value);
        }
      }}
    />
  );

  const LanguageSelector = () => (
    <Select
      isSearchable={false}
      options={languages}
      defaultValue={selectedLanguage}
      onChange={(option) => i18n.changeLanguage(option?.value)}
    />
  );

  return (
    <div className={styles["scenario-main-container"]}>
      <div className={styles["scenario-selector-container"]}>
        <div className={styles["scenario-selector"]}>
          <ScenarioSelector />
        </div>
        <div className={styles["player-selector"]}>
          <NumberOfPlayersSelector />
        </div>
        <div className={styles["language-selector"]}>
          <LanguageSelector />
        </div>
      </div>

      <div className={styles["scenario-button-container"]}>
        <Link
          onClick={() => setHasGameStarted(true)}
          className={styles["scenario-button-link"]}
          to={"/scenario"}
        >
          {t("scenarioSelectorPage.startGame")}
        </Link>
      </div>
    </div>
  );
};
