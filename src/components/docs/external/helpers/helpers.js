export const sortByOrder = items => {
  return [...items].sort(sortBy(items, "order"));
};

export const sortBy = (items, sortBy) => {
  return (a, b) => {
    if (a[sortBy] && b[sortBy]) {
      const nameA = a[sortBy].toString().toLowerCase();
      const nameB = b[sortBy].toString().toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    }
    return 0;
  };
};

export const filterWithoutInternal = items => {
  return [...items].filter(item => {
    return item.internal && item.internal === true ? false : true;
  });
};
