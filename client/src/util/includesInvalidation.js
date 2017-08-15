export default (invalidations, propertyName) => {
  return invalidations.find(({property}) => property === propertyName) !== undefined;
};
