import { useState, useCallback, useMemo } from "react";
import { debounce } from "lodash";

export const useTemporaryValue = (
  initialValue = 0
): [number, (value: number) => void] => {
  const [temporaryValue, setTemporaryValue] = useState(initialValue);

  const resetTemporaryValue = useMemo(
    () =>
      debounce(
        () => {
          setTemporaryValue(0);
        },
        2000,
        { leading: false }
      ),
    []
  );

  const changeTemporaryValue = useCallback(
    (value: number) => {
      setTemporaryValue((prevState) => prevState + value);
      resetTemporaryValue();
    },
    [resetTemporaryValue]
  );

  return [temporaryValue, changeTemporaryValue];
};
