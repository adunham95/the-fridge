import { useMutation, useQuery } from 'graphql-hooks';
import * as React from 'react';
import { UPDATE_POST_MUTATION } from '../../graphql/mutation/updatePost';
import { GET_GROUPS_BY_ORG } from '../../graphql/query/getGroupsByOrg';
import { Loader } from '../Loader/Loader';
import { Button, EButtonStyle } from '../StatelessInput/Button';
import { SelectedGroup } from '../StatelessInput/SelectedGroup';
import { useToast } from '../Toast/ToastContext';
import theme from '../../theme/theme.json';
import { EIcons } from '../Icons';

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
  const [updatePost] = useMutation(UPDATE_POST_MUTATION);
  const { addToast } = useToast();

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

  async function save() {
    const newPostData = {
      id,
      postInput: {
        viewByGroups: selectedGroups,
      },
    };
    const data = await updatePost({ variables: newPostData });
    if (data?.error) {
      addToast(
        'Post Failed to save',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION_TRIANGLE,
      );
    }
    if (data?.data) {
      addToast('Post Saved', theme.BASE_COLOR.success, EIcons.CHECK_CIRCLE);
      onSave();
    }
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
        <Button onClick={save} size="base" buttonStyle={EButtonStyle.SUCCESS}>
          Save
        </Button>
      </div>
    </div>
  );
}
