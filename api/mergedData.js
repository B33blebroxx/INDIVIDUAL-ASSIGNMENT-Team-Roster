import { deletePlayer, getSinglePlayer } from './playerData';
import { deleteTeam, getSingleTeam, getTeamPlayers } from './teamData';

const viewPlayerDetails = (playerId) => new Promise((resolve, reject) => {
  getSinglePlayer(playerId).then((playerObj) => {
    getSingleTeam(playerId.team_id).then((teamObj) => {
      resolve({ teamObj, ...playerObj });
    });
  }).catch((error) => reject(error));
});

const viewTeamDetails = (teamId) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamId),
    getTeamPlayers(teamId)]).then(([teamObj, teamPlayerArr]) => {
    resolve({ ...teamObj, players: teamPlayerArr });
  }).catch((error) => reject(error));
});

const deleteTeamPlayer = (playerId) => new Promise((resolve, reject) => {
  getTeamPlayers(playerId).then((playerArr) => {
    const deletePlayerPromise = playerArr.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deletePlayerPromise).then(() => {
      deleteTeam(playerId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPlayerDetails, viewTeamDetails, deleteTeamPlayer };
