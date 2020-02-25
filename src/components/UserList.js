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
import { Check, Clear, Delete } from '@material-ui/icons';
import { Spinner } from './UI';
import moment from 'moment';
import env from '../config/config';
import { withRouter } from 'react-router-dom';
import { addBearerToken } from '../utils/auth';

const UserList = ({ history }) => {
  const COLUMS = ['Name', 'Last Name', 'Email', 'Active', 'Updated At', 'Delete'];
  const [pagination, setPagination] = useState({ page: 0, order: 'DESC', limit: 10 });
  const { data, isLoading, sendRequest } = useFetch();
  const { isLoading: isDeleteLoading, sendRequest: sendDeleteRequest } = useFetch();

  useEffect(() => {
    const { page, order, limit } = pagination;
    const config = {
      method: 'GET',
      headers: {
        'Authorization': addBearerToken(),
        'Content-Type': 'application/json'
      }
    }
    sendRequest(`${env.REACT_APP_BASEPATH}${env.REACT_APP_USERS}?page=${page}&limit=${limit}&order=${order}`, config);
  }, [isDeleteLoading, pagination, sendRequest]);

  const handleChangePage = (_, newPage) => {
    setPagination({ ...pagination, page: newPage });
  }

  const deleteUser = (id) => {
    const config = {
      method: 'DELETE',
      headers: {
        'Authorization': addBearerToken(),
        'Content-Type': 'application/json'
      }
    }
    sendDeleteRequest(`${env.REACT_APP_BASEPATH}${env.REACT_APP_USERS}/${id}`, config);
  }

  return (
    <Grid xs={12} item>
      <Box mt='20px'>
        <TableContainer component={Paper} mt={5}>
          {
            isLoading || isDeleteLoading
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
                          <TableCell onClick={() => history.push(`/user/${res.id}`)}>{res.name}</TableCell>
                          <TableCell onClick={() => history.push(`/user/${res.id}`)}>{res.lastName}</TableCell>
                          <TableCell onClick={() => history.push(`/user/${res.id}`)}>{res.email}</TableCell>
                          <TableCell onClick={() => history.push(`/user/${res.id}`)}>
                            {res.active ? <Check data-testid="active" /> : <Clear data-testid="inactive" />}
                          </TableCell>
                          <TableCell onClick={() => history.push(`/user/${res.id}`)}>{moment(res.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                          <TableCell onClick={() => deleteUser(res.id)}><Delete /></TableCell>
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

export default withRouter(UserList);