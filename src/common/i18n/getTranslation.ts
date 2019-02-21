export default (prefix?: string) => (id: string) => {
  return prefix ? `${prefix}.${id}` : id;
};
