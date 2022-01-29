import { useQuery } from 'graphql-hooks';
import React, { Fragment } from 'react';
import { useUser } from './UserContext';

const INITIAL_QUERY = `
query InitalQuery($id:String!){
    getUser(id:$id){
        id
        name
        orgs{
            name
            id
        }
    }
}`;

export function ContextLoader() {
  const { dispatch } = useUser();
  const { loading, error, data } = useQuery(INITIAL_QUERY, {
    variables: {
      id: '61f28b404956e23fa1c4534e',
    },
  });

  console.log(data);

  return <Fragment />;
}
