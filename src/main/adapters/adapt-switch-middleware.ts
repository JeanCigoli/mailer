import { formateToLowerCase } from '../../utils/object';

export type adapterOptions = {
  target?: {
    body?: string;
    params?: string;
    query?: string;
    headers?: string;
    [key: string]: string | undefined;
  };
  expected?: { [key: string]: any };
  handle: Function;
}[];

const checkIfTestsPass = (checkArray: any[]) => {
  const findNonComplianceResult = checkArray.find((value) => value === false);
  return findNonComplianceResult !== false;
};

const filterHttpRequestByTarget = (
  request: { [key: string]: any },
  target: { [key: string]: any },
) =>
  Object.keys(target).reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue]: request?.[currentValue],
    }),
    {},
  );

const convertTargetForLowerCaseEntities = (target: { [key: string]: any }) =>
  Object.entries(target).map(([key, value]) => [
    String(key).toLocaleLowerCase(),
    String(value).toLocaleLowerCase(),
  ]);

const adaptSwitchMiddleware =
  (switchMiddlewareOptions: adapterOptions) =>
  (...middlewareParams: any) => {
    const [rawHttpRequest] = middlewareParams;

    for (const options of switchMiddlewareOptions) {
      if (!options.target) return options.handle(...middlewareParams);

      const filteredHttRequest = filterHttpRequestByTarget(
        rawHttpRequest,
        options.target,
      );

      const httpRequestToLowerCaseKeys = formateToLowerCase(filteredHttRequest);

      const targetEntries = convertTargetForLowerCaseEntities(options.target);

      const expectedToLowerCaseKeys = formateToLowerCase(options.expected);

      const testsResults = targetEntries.map((entries) => {
        const targetRequestKey = entries[0] as string;
        const targetRequestValue = entries[1] as string;

        if (Array.isArray(targetRequestValue)) {
          const conditionResultExtractedFromArray = (() => {
            const testsResult = targetRequestValue.map((value) => {
              const requestValue =
                httpRequestToLowerCaseKeys?.[targetRequestKey]?.[value];

              if (!options.expected && requestValue) return true;

              const expectedValue = expectedToLowerCaseKeys?.[value];

              return requestValue === expectedValue;
            });

            return checkIfTestsPass(testsResult);
          })();

          return conditionResultExtractedFromArray;
        }

        const requestValue =
          httpRequestToLowerCaseKeys?.[targetRequestKey]?.[targetRequestValue];

        if (!options.expected) return true;

        const expectedValue = expectedToLowerCaseKeys?.[targetRequestValue];

        const testResult = requestValue === expectedValue;

        return testResult;
      });

      const passedTheTest = checkIfTestsPass(testsResults);

      if (passedTheTest) return options.handle(...middlewareParams);
    }
  };

export { adaptSwitchMiddleware };
