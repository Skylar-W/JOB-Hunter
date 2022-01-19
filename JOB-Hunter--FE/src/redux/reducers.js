/* 根据旧的数据,利用action进行修改,然后返回 */
import {combineReducers} from 'redux'

function foo(state=0, action) {
  return state
}

function bar(state=0, action) {
  return state
}

export default combineReducers({
  foo,
  bar
})