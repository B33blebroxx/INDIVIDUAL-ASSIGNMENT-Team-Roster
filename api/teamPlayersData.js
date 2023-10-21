import { clientCredentials } from '../utils/client';
import { getTeamPlayers } from './teamData';

const endpoint = clientCredentials.databaseURL;

const createTeamPlayer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team_players.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTeamPlayer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team_players/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleTeamPlayer = async (playerId, teamId) => {
  const allTeamPlayers = await getTeamPlayers(teamId);
  const singleTeamPlayer = await allTeamPlayers.find((obj) => obj.player_id === playerId);

  return singleTeamPlayer;
};

export {
  createTeamPlayer, updateTeamPlayer, getSingleTeamPlayer,
};
