import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete Player ${playerObj.player_name}?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.player_name} />
      <Card.Body>
        <Card.Title>{playerObj.player_name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Position: {playerObj.player_role}</ListGroup.Item>
      </ListGroup>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Team: {playerObj.team_id ? playerObj.team_name : '' }</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
          <Button>Edit Player</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayer}>
          Delete Player
        </Button>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    player_name: PropTypes.string,
    player_role: PropTypes.string,
    team_name: PropTypes.string,
    team_id: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
