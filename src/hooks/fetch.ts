import * as React from "react";

const useFetchJson = (url: string, options = {}) => {
  const [data, setData] = React.useState({});
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let loaded = false;
    fetch(url, options)
      .then((data) => {
        if (loaded) return;
        setLoaded(true);
        setData(data);
      })
      .catch((err) => {
        if (loaded) return;
        setLoaded(false);
        setError(err);
      });

    return () => {
      loaded = true;
    };
  });

  return [loaded, data, error];
};

export default useFetchJson;
