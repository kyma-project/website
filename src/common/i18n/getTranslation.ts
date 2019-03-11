export default (prefix?: string) => (id: string) =>
  prefix ? `${prefix}.${id}` : id;
