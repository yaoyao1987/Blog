const toyShallClone = target => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (const prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop]
      }
    }
    return cloneTarget;
  } else {
    return target
  }
}

// ======================================================
/**
 * testing
 */