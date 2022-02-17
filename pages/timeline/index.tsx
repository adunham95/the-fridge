import { useManualQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { EIcons } from '../../components/Icons';
import { Loader } from '../../components/Loader/Loader';
import { PageBanner } from '../../components/Page/PageBanner';
import PostCard from '../../components/Post/PostCard';
import { PostCardSmall } from '../../components/Post/PostCardSmall';
import { Select } from '../../components/StatelessInput/Select';
import { useToast } from '../../components/Toast/ToastContext';
import { GET_POSTS_BY_MONTH } from '../../graphql/query/getPostMonths';
import { GET_POSTS_BY_GROUP_DATE } from '../../graphql/query/getPostsByGroup';
import { monthList } from '../../models/DateModel';
import { IPost } from '../../models/PostModel';
import { EUserPermissions } from '../../models/UserModel';
import theme from '../../theme/theme.json';

interface ITimeline {
  value: string;
  label: string;
}

const Timeline = () => {
  const [currentDate, setCurrentDate] = useState('');
  const { addToast } = useToast();
  const [fetchTimeline] = useManualQuery(GET_POSTS_BY_MONTH);
  const [fetchPosts, { loading }] = useManualQuery(GET_POSTS_BY_GROUP_DATE);
  const [months, setMonths] = useState<Array<ITimeline>>([]);
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const { data: session } = useSession();
  const myUser = session?.user;

  useEffect(() => {
    const myGroups = myUser?.orgs.map((o) => o.group.id);
    fetchMonthData(myGroups || []);
  }, [myUser]);

  useEffect(() => {
    if (currentDate === '') {
      return;
    }
    const splitString = currentDate.split('-');
    const year = parseInt(splitString[1]);
    const month = parseInt(splitString[0]);
    const startDate = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
    const endDate = `${year}-${(month + 2).toString().padStart(2, '0')}-01`;
    const myGroups = myUser?.orgs.map((o) => o.group.id);
    console.log({
      currentDate,
      splitString,
      year,
      month,
      startDate,
      endDate,
    });
    fetchPostData(myGroups || [], startDate, endDate);
  }, [currentDate]);

  const fetchMonthData = async (groupList: Array<string>) => {
    const data = await fetchTimeline({
      variables: {
        ids: groupList,
      },
    });
    console.log(data.data);
    if (data.data?.getPostTimeline) {
      const monthData = data.data?.getPostTimeline.map(
        (g: { month: string, year: string }): ITimeline => {
          const monthObj = {
            label: `${monthList[parseInt(g.month)]} ${g.year}`,
            value: `${g.month}-${g.year}`,
          };
          return monthObj;
        },
      );
      setMonths(monthData);
    }
    if (data.error) {
      addToast(
        'Error Fetching Posts',
        theme.BASE_COLOR.error,
        EIcons.EXCLAMATION,
      );
    }
  };

  const fetchPostData = async (
    groupList: Array<string>,
    startDate: string,
    endDate: string,
  ) => {
    const data = await fetchPosts({
      variables: {
        ids: groupList,
        endDate,
        startDate,
      },
    });
    if (data.data.getPostsByGroup) {
      setPosts(data.data.getPostsByGroup);
    }
    if (data.error) {
      addToast('Error Loading posts', theme.BASE_COLOR.error, EIcons.WARNING);
    }
  };

  return (
    <div>
      <PageBanner title="Timeline">
        <Select
          id="selectTime"
          label="Select Month"
          value={currentDate}
          options={months}
          defaultOption="Select Month"
          onChange={setCurrentDate}
        />
      </PageBanner>
      <main className="flex flex-wrap mx-auto py-5 px-1">
        {loading && (
          <div className="flex justify-center pt-1 pb-2">
            <Loader />
          </div>
        )}
        {posts.map((post) => (
          // <PostCard key={post.id} {...post} />
          <PostCardSmall key={post.id} {...post} />
        ))}
      </main>
    </div>
  );
};

Timeline.auth = true;
Timeline.permissions = [EUserPermissions.CAN_VIEW_POST];

export default Timeline;
