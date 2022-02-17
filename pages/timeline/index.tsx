import { useManualQuery } from 'graphql-hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { EIcons } from '../../components/Icons';
import { PageBanner } from '../../components/Page/PageBanner';
import { Select } from '../../components/StatelessInput/Select';
import { useToast } from '../../components/Toast/ToastContext';
import { GET_POSTS_BY_MONTH } from '../../graphql/query/getPostMonths';
import { monthList } from '../../models/DateModel';
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
  const [months, setMonths] = useState<Array<ITimeline>>([]);
  const { data: session } = useSession();
  const myUser = session?.user;

  useEffect(() => {
    const myGroups = myUser?.orgs.map((o) => o.group.id);
    fetchPostData(myGroups || []);
  }, [myUser]);

  useEffect(() => {
    if (currentDate === '') {
      return;
    }
    const splitString = currentDate.split('-');
    const year = parseInt(splitString[1]);
    const month = parseInt(splitString[0]);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month, daysInMonth);
    console.log({
      currentDate,
      daysInMonth,
      splitString,
      year,
      month,
      startDate,
      endDate,
    });
  }, [currentDate]);

  const fetchPostData = async (groupList: Array<string>) => {
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
    </div>
  );
};

Timeline.auth = true;
Timeline.permissions = [EUserPermissions.CAN_VIEW_POST];

export default Timeline;
