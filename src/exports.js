const _ = require('lodash')
const R = require('./utils/fp')
const C = require('./classes/containers')
const U = require('./utils/utils')

const Container = C.Container
const cloneDeep = _.cloneDeep

// Container -> Container -> Either(Left, Right)
const getProp = R.curry((prop_Container, obj_Container) => {
  if(!R.is(Container, prop_Container)) {
    prop_Container = Container.of(prop_Container)
  }
  if(!R.is(Container, obj_Container)) {
    obj_Container = Container.of(obj_Container)
  }
  let targetValue_Maybe = U.prop(prop_Container, obj_Container)
  if(targetValue_Maybe.isNil()) {
    return U.Left({
      code: 'PROP_CANNOT_BE_FOUND',
      track: {
        obj: cloneDeep(obj_Container.__value),
        prop: prop_Container.__value
      }
    })
  } else {
    return U.Right(targetValue_Maybe.__value)
  }
})

module.exports = {
  getProp: getProp,
  C: C,
  R: R,
  U: U
}
