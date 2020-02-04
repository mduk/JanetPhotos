import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { DatabaseHost, Months } from '../data';

export default function(props) {
  const [ dates, setDates ] = useState(undefined);
  useEffect(() => {
    async function getData() {
      const response = await axios({
        method: 'get',
        url: `${DatabaseHost}/camera/_design/byYearMonth/_view/photo-counts`,
        params: {
          reduce: true,
          group: true,
        }
      });
      const rows = response.data.rows;

      const grouped = {};
      for (let i in rows) {
        const { key, value } = rows[i];

        let [ year, month ] = key;
        year = parseInt(year);
        month = parseInt(month);

        if (grouped[year] === undefined) {
          grouped[year] = {};
        }

        grouped[year][Months[month]] = value;
      }

      setDates(grouped);
    }
    getData();
  }, [] );

  if (dates) {

    const year_menus  = Object.keys(dates).map(year => {

      const month_items = Object.keys(dates[year]).map(month => {
        const photos_in_month = dates[year][month];
        return (
          <Menu.Item
            as={Link}
            to={`/archive/${year}/${month}`}
            name={month}
            icon='calendar'
          />
        );
      });

      return (
        <Menu>
          <Menu.Item header>{year}</Menu.Item>
          {month_items}
        </Menu>
      );

    });
    return year_menus;
  }

  return (
    <p>Hello.</p>
  );
}

