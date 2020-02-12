import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/fetch';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core/';
import { Spinner } from './UI';
import env from '../config/config';

const UserList = () => {
  const COLUMS = ['Name', 'Last Name', 'email', 'Updated At'];
  const [pagination, setPagination] = useState({ page: 0, order: 'DESC', limit: 10 });
  const { data, isLoading, sendRequest } = useFetch();

  useEffect(() => {
    const { page, order, limit } = pagination;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    sendRequest(`${env.basepath}${env.users}?page=${page}&limit=${limit}&order=${order}`, config);
  }, [pagination, sendRequest]);

  const handleChangePage = (_, newPage) => {
    setPagination({ ...pagination, page: newPage });
  }

  return (
    <Grid xs={12} item>
      <Box mt='20px'>
        <TableContainer component={Paper} mt={5}>
          {
            isLoading
              ? <Spinner />
              : (
                <Table>
                  <TableHead>
                    <TableRow>
                      {COLUMS.map(data => <TableCell key={data}>{data}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      data && data.users.map(res => (
                        <TableRow key={res.id}>
                          <TableCell>{res.name}</TableCell>
                          <TableCell>{res.lastName}</TableCell>
                          <TableCell>{res.email}</TableCell>
                          <TableCell>{res.updatedAt}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              )
          }
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={data ? data.count : 0}
            rowsPerPage={10}
            page={pagination.page}
            onChangePage={handleChangePage}
          />
        </TableContainer>
      </Box>
    </Grid>
  )
}

export default UserList;