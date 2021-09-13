export const middlewareSystemAdapter =
  (data: object) =>
  (...args: Function[]) =>
  async () => {
    const [mainFunction, ...functions] = args;

    const functionsWithProps = functions
      .reverse()
      .reduce(
        (
          arrayOfFunctions: Function[],
          currentFunction: Function,
          index: number,
        ) => {
          if (!index)
            return [
              () =>
                currentFunction(data, (callback: any) => {
                  if (typeof callback === 'function') callback();
                }),
            ];

          const pastFunction = arrayOfFunctions?.[index - 1];

          return [
            ...arrayOfFunctions,
            () => currentFunction(data, pastFunction),
          ];
        },
        [],
      )
      .reverse();

    await mainFunction(data, functionsWithProps[0]);
  };
