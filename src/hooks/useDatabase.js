import React, { useState } from 'react';
import PouchDB from 'pouchdb';

import DB from '../db'

export default function() {
  let [ database, setDatabase ] = useState(null);

  if (database == null) {
    database = new DB('http://localhost:5984/camera');
    setDatabase(database);
  }

  return database;
}
