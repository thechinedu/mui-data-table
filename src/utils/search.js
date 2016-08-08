const search = (key, word, data) => {
  if (word.length < 1) return data;

  const res = [];
  const regex = new RegExp(word, 'i');
  const keys = key.split('|');

  data.forEach((item) => {
    for (let i = 0; i < keys.length; i += 1) {
      if ( String(item[keys[i]]).match(regex) ) {
        res.push(item);
        break;
      }
    }

  });

  return res;
};

export default search;
