import { useQuery } from 'graphql-hooks';
import * as React from 'react';
import { GET_GROUPS_BY_ORG } from '../../graphql/query/getGroupsByOrg';
import { Loader } from '../Loader/Loader';
import { Button } from '../StatelessInput/Button';
import { SelectedGroup } from '../StatelessInput/SelectedGroup';

type Props = {
  id: string,
  orgID: string,
  viewByGroups: Array<string>,
  onSave: () => void,
};

export function EditPostSettings({ id, orgID, viewByGroups, onSave }: Props) {
  const { loading, error, data } = useQuery(GET_GROUPS_BY_ORG, {
    variables: {
      orgIDs: [orgID],
    },
  });

  // eslint-disable-next-line prettier/prettier
  const [orgGroups, setOrgGroups] = React.useState<Array<any>>([]);
  const [selectedGroups, setSelectedGroups] =
    React.useState<Array<string>>(viewByGroups);

  React.useEffect(() => {
    console.log(data);
    setOrgGroups(data?.getGroupsByOrg || []);
  }, [data]);

  function setOrgGroup(groupVal: string) {
    let newGroup = [...selectedGroups];
    if (newGroup.includes(groupVal)) {
      newGroup = newGroup.filter((g) => g !== groupVal);
    } else if (!newGroup.includes(groupVal)) {
      newGroup = [...newGroup, groupVal];
    }
    setSelectedGroups(newGroup);
  }

  function setAll() {
    const groups = orgGroups.map((g) => {
      return g.id;
    });
    setSelectedGroups(groups);
  }

  function save() {
    onSave();
  }

  return (
    <div>
      {loading && <Loader />}
      {orgGroups.length > 0 && (
        <>
          <div className="pb-1">
            <h2>This Post View Groups</h2>
          </div>
          <div className="overflow-x-auto whitespace-nowrap pt-1 hide-scrollbar">
            <span className="mr-1">
              <button
                className="bg-green-400 text-white p-1 rounded text-sm"
                onClick={setAll}
              >
                All
              </button>
            </span>
            {orgGroups.map((g) => (
              <SelectedGroup
                key={g.id}
                id={g.id}
                name={g.name}
                checked={selectedGroups.includes(g.id)}
                onClick={(id) => setOrgGroup(id)}
              />
            ))}
            <span className="mr-1">
              <button
                className="bg-red-400 text-white p-1 rounded text-sm"
                onClick={() => setSelectedGroups([])}
              >
                Clear
              </button>
            </span>
          </div>
        </>
      )}
      <div className="flex justify-end pt-2">
        <Button
          onClick={save}
          size="base"
          className="bg-emerald-400 text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
