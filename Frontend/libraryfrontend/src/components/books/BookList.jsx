import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/slices/bookSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={8}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #a8e063, #ffffff)",
        py: 6,
      }}
    >
      <Box
        maxWidth="1100px"
        mx="auto"
        bgcolor="white"
        p={4}
        borderRadius={3}
        boxShadow={3}
      >
        {/* Title */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <MenuBookIcon fontSize="large" />
            Available Books
          </Typography>
        </Box>

        {/* Search Button */}
        <Box textAlign="center" mb={4}>
          <Button
            variant="contained"
            color="success"
            startIcon={<SearchIcon />}
            onClick={() => navigate("/books/search")}
            sx={{ px: 4, py: 1.2, borderRadius: 2 }}
          >
            Search Books
          </Button>
        </Box>

        {/* Book Grid */}
        {books.length === 0 ? (
          <Typography textAlign="center" color="textSecondary">
            No books available at the moment.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                  }}
                  onClick={() => navigate(`./${book.id}`)}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {book.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default BookList;
