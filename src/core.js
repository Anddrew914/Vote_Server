import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries)); //List makes entries immutable to pass testing
}

export function next(state) {
  let entries = state.get('entries');
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}
