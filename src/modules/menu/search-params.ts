import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const params = {
  category: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  page: parseAsInteger.withDefault(1).withOptions({
    clearOnDefault: true,
  }),
};

export const useCategoryFilter = () => {
  return useQueryStates(params);
};
