/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar className="nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand id="brand-logo">Team Roster Central</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/player/players">
              <Nav.Link>Players</Nav.Link>
            </Link>
            <Link passHref href="/team/teams">
              <Nav.Link>Teams</Nav.Link>
            </Link>
            <Link passHref href="/player/new">
              <Nav.Link>Add Player</Nav.Link>
            </Link>
          </Nav>
          <SearchBar />
          <Button id="sign-out" variant="danger" onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
