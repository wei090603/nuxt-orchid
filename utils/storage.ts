const basePrefix = 'orchid'
/**
 * 获取当前 project 存储数据的 key
 * @param key
 * @param prefix 可以指定前缀，默认为 basePrefix
 * @returns {*}
 */
function getProjectKey(key: string, prefix = basePrefix): string {
  return `${prefix}_${key}`;
}

/**
 * 获取cookie
 * @param key
 * @param common 是否为全局共享的 key,如果为 true 则不会加上工程的前缀
 * @param common 读取特定前缀的数据
 * @returns {*}
 */
export function getStorage(key: string, common = false, prefix = basePrefix): string | null {
  const realKey = common ? key : getProjectKey(key, prefix);
  let value: string | undefined | null = localStorage.getItem(realKey);
  if (value === 'null') {
    value = null;
  }
  if (value === 'undefined') {
    value = null;
  }
  return value;
}

/**
 * 删除cookie
 * @param key
 * @param common 是否为全局共享的 key,如果为 true 则不会加上工程的前缀
 * @returns {*}
 */
export function removeStorage(key: string, common = false): void {
  const realKey = common ? key : getProjectKey(key);
  localStorage.removeItem(realKey);
}

/**
 * 设置cookie
 * @param key
 * @param value
 * @param common 是否为全局共享的 key,如果为 true 则不会加上工程的前缀
 * @returns {*}
 */
export function setStorage(key: string, value: string, common = false): void {
  if (value === undefined) {
    return removeStorage(key, common);
  }
  const realKey = common ? key : getProjectKey(key);
  return localStorage.setItem(realKey, value);
}
