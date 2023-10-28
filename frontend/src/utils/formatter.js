const capitalize = (word = "") => {
  return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
};

function toArray(...args) {
  const transformedArgs = args.map((arg) => {
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
  const formatted = value?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  return `$${formatted}`;
};

const formatDate = (dateObj = false) => {
  if (!dateObj) {
    return false;
  }
  const day = dateObj.getDay() === 0 ? 7 : dateObj.getDay();
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dayDate = String(dateObj.getDate()).padStart(2, '0');
  const date = `${year}-${month}-${dayDate}`;
  return { day, time, date, fullDate: dateObj };
};

export { formatDate, capitalize, toArray, formatCLP };
