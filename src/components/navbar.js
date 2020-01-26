import React from 'react';
import { useState, useEffect } from 'react';

import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Months } from '../data';

export default function(props) {

  const [ dates, setDates ] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const response = await axios({
        method: 'get',
        url: "http://localhost:5984/camera/_design/byYearMonth/_view/photo-counts",
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

        grouped[year][Months[month--]] = value;
      }

      setDates(grouped);
    }
    getData();
  }, [] );

  let year_items = []
  if (dates) {
    year_items = Object.keys(dates).map(year => {

      const month_items = Object.keys(dates[year]).map(month => {
        const photos_in_month = dates[year][month];
        return (
          <Dropdown.Item
            as={Link}
            to={`/archive/${year}/${month}`}
            text={`${month} ${year} (${photos_in_month})`}
            icon='calendar'
          />
        );
      });

      return (
        <Dropdown item text={`${year}`}>
          <Dropdown.Menu>{month_items}</Dropdown.Menu>
        </Dropdown>
      );

    });
  }

  return (
    <Menu>
      <Menu.Item header>Janet Photos</Menu.Item>

      <Dropdown item text='Archive'>
        <Dropdown.Menu>{year_items}</Dropdown.Menu>
      </Dropdown>

    </Menu>
  );
}
