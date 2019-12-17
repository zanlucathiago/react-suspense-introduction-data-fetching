import React, { Suspense } from 'react';
import './App.css';
import { fetchData } from './Api';

import spinner from './spinner.gif';
const resource = fetchData();

const App = () => (
  <div className="container my-5">
    <Suspense fallback={<Spinner />}>
      <ProfileDetails />
      <ProfilePosts />
    </Suspense>
  </div>
);

const ProfileDetails = () => {
  const user = resource.user.read();

  return (
    <div className="card card-body my-3">
      <h1 className="large text-primary">{user.name}</h1>
      <ul>
        <li>Usuário: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Cidade: {user.address.city}</li>
      </ul>
    </div>
  );
};

const ProfilePosts = () => {
  const posts = resource.posts.read();

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <strong>Últimos Posts</strong>
      </li>
      {posts.map(post => (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
};

const Spinner = () => (
  <img
    src={spinner}
    style={{ width: 200, margin: 'auto', display: 'block' }}
    alt="Carregando..."
  />
);

export default App;
