import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useStartingSetUpContext } from "../../context/startingSetUpContext/startingSetUpContext";
import ScenariosJson from "../../assets/data/Scenarios.json";
import styles from "./ScenarioSelector.module.scss";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { Modal } from "../../components/Modal/Modal";
import { useTranslation } from "react-i18next";

export const ScenarioSelector: React.FC = () => {
  const {
    setScenarioValue,
    setNumberOfPlayers,
    numberOfPlayers,
    scenarioValue,
  } = useStartingSetUpContext();

  const { open, close } = useModalContext();

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
      options={languages}
      defaultValue={selectedLanguage}
      onChange={(option) => i18n.changeLanguage(option?.value)}
    />
  );

  const TestModal = () => (
    <Modal size={"large"}>
      This is a modal
      <button onClick={() => close()}>Close</button>
    </Modal>
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
        <Link className={styles["scenario-button-link"]} to={"/scenario"}>
          {t("scenarioSelectorPage.startGame")}
        </Link>
      </div>
      <button onClick={() => open(<TestModal />)}>Open test modal</button>
    </div>
  );
};
