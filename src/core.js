import {
  List,
  Map
} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries)); //List makes entries immutable to pass testing
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else return [a, b];
}

export function next(state) {
  const entries = state.get('entries')
    .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
        pair: entries.take(2)
      }), //take make a new map with just the first (n)
      entries: entries.skip(2) //skip makes a map without the first(n)
    });
  }
}

export function vote(state, entry) {
  return state.updateIn( //updateIn follows the keypath listed in the []'s.
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
