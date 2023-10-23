const capitalize = (word = '') => {
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

const formatDate = (date) => {
  const day = date.getDay() === 0 ? 7 : date.getDay();
  const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const fullDate = date.toString();
  return { day, time, fullDate };
};


export { formatDate, capitalize, toArray, formatCLP };