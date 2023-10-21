import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTeamPlayers = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team_players.json?orderBy="team_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

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

const deleteTeamPlayer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team_players/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getTeamPlayers, createTeamPlayer, updateTeamPlayer, getSingleTeamPlayer, deleteTeamPlayer,
};
