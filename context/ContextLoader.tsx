import { useManualQuery, useQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import React, { Fragment, useEffect } from 'react';
import { USER_ACTION } from '../reducers/userReducer';
import { useUser } from './UserContext';

const INITIAL_QUERY = `
query GetUsertByID($id:String!){
  getUser(id:$id){
    id
    name
    accountColor
    orgs{
     org{
      id
      name
    }
      group{
			id
      name
      permissions
      }
    }
  }
}`;

export function ContextLoader() {
  const currentUserID = '61f28b404956e23fa1c4534e';
  const { state, dispatch } = useUser();
  const [fetchUser, { loading, error, data }] = useManualQuery(INITIAL_QUERY, {
    variables: { id: currentUserID },
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    // fetchUser();
    console.log('session', session);
    console.log('status', status);
  }, [session]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: USER_ACTION.SET_USER,
        payload: {
          user: data.getUser,
        },
      });
    }
  }, [data]);

  return <Fragment />;
}
