import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  team_name: '',
  city: '',
  logo: '',
  favorite: false,
};

export default function NewTeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateTeam(formInput).then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateTeam(patchPayload).then(() => {
          router.push(`/team/${obj.firebaseKey}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <h2 className="text-center mt-4">
        {obj.firebaseKey ? 'Update' : 'Add A'} Team
      </h2>

      <Form.Group className="mb-3 mt-3">
        <FloatingLabel controlId="floatingInput1" label="Club Name" className="mb-3 f-w f-c">
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            name="team_name"
            value={formInput.team_name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <FloatingLabel controlId="floatingInput1" label="Team Logo" className="mb-3 f-w f-c">
          <Form.Control
            type="text"
            placeholder="Enter Team Logo"
            name="logo"
            value={formInput.logo}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <FloatingLabel controlId="floatingInput1" label="Team City" className="mb-3 f-w f-c">
          <Form.Control
            type="text"
            placeholder="Enter Team City"
            name="city"
            value={formInput.city}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId="formBasicCheckbox"
      >
        <Form.Check
          className="f-c"
          type="switch"
          id="favorite"
          name="favorite"
          label="Favorite?"
          checked={formInput.favorite}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              favorite: e.target.checked,
            }));
          }}
        />
      </Form.Group>
      <Form.Group className="text-center">
        <Button className="btn-success" type="submit">
          {obj.firebaseKey ? 'Update' : 'Add'} Team
        </Button>
      </Form.Group>
    </Form>
  );
}

NewTeamForm.propTypes = {
  obj: PropTypes.shape({
    team_name: PropTypes.string,
    city: PropTypes.string,
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NewTeamForm.defaultProps = {
  obj: initialState,
};
