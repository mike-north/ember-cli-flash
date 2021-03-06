import Ember from 'ember';

const get = Ember.get;
const {
  computed,
  typeOf,
  A: emberArray
} = Ember;

export function add(...dependentKeys) {
  const computedFunc = computed({
    get() {
      const values = dependentKeys.map((dependentKey) => {
        const value = get(this, dependentKey);

        if (typeOf(value) !== 'number') {
          return;
        }

        return value;
      });

      return emberArray(values).compact().reduce((prev, curr) => {
        return prev + curr;
      });
    }
  });

  return computedFunc.property.apply(computedFunc, dependentKeys);
}
