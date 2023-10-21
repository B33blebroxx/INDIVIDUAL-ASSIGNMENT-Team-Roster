import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeam } from '../api/teamData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete Team ${teamObj.team_name}?`)) {
      deleteTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={teamObj.logo} alt={teamObj.team_name} />
      <Card.Body>
        <Card.Title>{teamObj.team_name}
          <span>{teamObj.favorite ? ' ⭐' : ''}</span>
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>City: {teamObj.city}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button>Edit Team</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam}>
          Delete Team
        </Button>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">View Team Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    team_name: PropTypes.string,
    logo: PropTypes.string,
    city: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
