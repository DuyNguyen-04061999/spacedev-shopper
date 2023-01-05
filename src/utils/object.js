import _ from "lodash"

export const isEqual = (obj1, obj2, ...field) => _.isEqual(_.pick(obj1, ...field), _.pick( obj2, ...field))