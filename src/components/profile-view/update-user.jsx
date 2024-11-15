import React from "react";

import { Row, Col, Button, Form } from "react-bootstrap";

export const UpdateUser = () => {
  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <h3>Update Profile</h3>
        <Form.Group className="mb-2">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            minLength={4}
            value={formData.username}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>
            Password:
            <p>Your password must be at least 8 characters long.</p>
          </Form.Label>
          <Form.Control
            type="password"
            minLength={8}
            value={formData.password}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label> Email: </Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Birthdate:</Form.Label>
          <Form.Control
            type="date"
            value={formData.birthdate.slice(0, 10)}
            onChange={(e) => handleUpdate(e)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Changes
        </Button>
      </Form>
    </Row>
  );
};
