const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const capitalize = (word) => {
  return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
};

function toArray(...args) {
  const transformedArgs = args.map(arg => {
    if (Array.isArray(arg)) {
      return arg;
    } else {
      return [arg];
    }
  });
  return transformedArgs;
}

const formatCLP = (value) => {
  value = value?.toString();
  const formatted = value?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  return `$${formatted}`;
};

export { formatDate, capitalize, toArray, formatCLP };