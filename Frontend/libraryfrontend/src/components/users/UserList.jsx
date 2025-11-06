// src/components/users/UserList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/slices/userSlice";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(id));
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Loading users...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={10}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box
      sx={{
        maxWidth: "90%",
        mx: "auto",
        mt: 8,
        mb: 6,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          overflowX: "auto",
        }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <ManageAccountsIcon color="green" sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h5" fontWeight="bold" color="green">
            User Management
          </Typography>
        </Box>

        {/* Empty state */}
        {users.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ py: 4 }}
          >
            No users found.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "green" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                    Role
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                    }}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {user.role}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        to={`/users/${user.id}`}
                        variant="contained"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          fontWeight: 500,
                          backgroundColor: "primary.main",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        }}
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default UserList;
