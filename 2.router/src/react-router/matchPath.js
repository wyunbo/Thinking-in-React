import pathToRegexp from 'path-to-regexp';

const cache = {};
function compilePath(path, options) {
  let cacheKey = path + JSON.stringify(options);
  if (cache[cacheKey]) return cache[cacheKey];
  const keys = []; // handle path parameters
  const regexp = pathToRegexp(path, keys, options);
  let result = { keys, regexp };
  cache[cacheKey] = result;
  return result;
}

/**
 *
 * @param {*} pathname browser real path
 * @param {*} options attributes in Route
 * path: Route path
 * exact
 * strict
 * sensitive
 */
function matchPath(pathname, options = {}) {
  let {
    path = '/',
    exact = false,
    strict = false,
    sensitive = false,
  } = options;
  let { keys, regexp } = compilePath(path, { end: exact, strict, sensitive });
  const match = regexp.exec(pathname);
  if (!match) return null;
  const [url, ...values] = match;
  const isExact = pathname === url;
  if (exact && !isExact) return null;
  return {
    path, // path in Route
    url, // url in browser address
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {}), // path parameters
  };
}

export default matchPath;
