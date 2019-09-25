import createUseContext from "constate";

export interface TabServiceProps {
  group?: string;
  label?: string;
}

function useTabService({ group, label }: TabServiceProps) {
  return {
    group,
    label,
  };
}

const { Provider, Context } = createUseContext(useTabService);
export { Provider as TabProvider, Context as TabContext };
