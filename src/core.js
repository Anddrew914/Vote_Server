import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries)); //List makes entries immutable to pass testing
}

export function next(state) {
  let entries = state.get('entries');
  return state.merge({
    vote: Map({pair: entries.take(2)}), //take make a new map with just the first (n)
    entries: entries.skip(2) //skip makes a map without the first(n)
  });
}
