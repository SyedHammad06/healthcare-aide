import { NextPage } from 'next';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '1rem',
    padding: '0.5rem 1.5rem',
  },
  field: {
    flex: '100%',
    margin: '0.5rem 0',

    '& input': {
      fontSize: '1.2rem',
    },
  },
  select: {
    fontSize: '1.2rem',
  },
  hr: {
    height: 0,
    borderTop: '1px solid rgba(150, 150, 150, 0.5)',
  },
}));

type Props = {
  title: string;
  searchValue: string;
  selectValue?: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectValue?: Dispatch<SetStateAction<string>>;
};

export const Search: NextPage<Props> = ({
  title,
  searchValue,
  selectValue,
  setSearchValue,
  setSelectValue,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.search}>
        <TextField
          id='search'
          value={searchValue}
          variant='standard'
          placeholder={`Search ${title}`}
          className={classes.field}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='secondary' />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {selectValue && setSelectValue ? (
          <FormControl variant='standard' sx={{ m: 1, minWidth: 200 }}>
            <Select
              id='select'
              value={selectValue}
              className={classes.select}
              startAdornment={
                <InputAdornment position='start'>
                  <LocationOnIcon color='secondary' />
                </InputAdornment>
              }
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <MenuItem value='Bengaluru' selected>
                Bengaluru
              </MenuItem>
              <MenuItem value='Mysore'>Mysore</MenuItem>
            </Select>
          </FormControl>
        ) : null}
      </div>
      <hr className={classes.hr} />
    </>
  );
};
