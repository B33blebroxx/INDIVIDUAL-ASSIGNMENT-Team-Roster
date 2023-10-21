import { deletePlayer, getSinglePlayer } from './playerData';
import { deleteTeam, getSingleTeam } from './teamData';
import { getTeamPlayers } from './teamPlayersData';

const viewPlayerDetails = (playerId) => new Promise((resolve, reject) => {
  getSinglePlayer(playerId).then((playerObj) => {
    getSingleTeam(playerId.team_id).then((teamObj) => {
      resolve({ teamObj, ...playerObj });
    });
  }).catch((error) => reject(error));
});

const viewTeamDetails = async (firebaseKey) => {
  const team = await getSingleTeam(firebaseKey);
  const players = await getTeamPlayers(team.firebaseKey);

  return { ...team, players };
};

const deleteTeamPlayer = (firebaseKey) => new Promise((resolve, reject) => {
  getTeamPlayers(firebaseKey).then((teamsPlayerArray) => {
    const deleteMemberPromises = teamsPlayerArray.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteTeam(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { viewPlayerDetails, viewTeamDetails, deleteTeamPlayer };
