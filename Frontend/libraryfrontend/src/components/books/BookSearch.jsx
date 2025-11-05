import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, searchBooks } from "../../redux/slices/bookSlice";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const BookSearch = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("title");

  // ✅ Debounced search (500ms)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        dispatch(searchBooks(searchTerm));
      } else {
        dispatch(fetchBooks());
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchField, dispatch]);

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        mt: 6,
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight="bold"
        color="primary"
        textAlign="center"
        mb={4}
      >
        Book Search
      </Typography>

      {/* Search Controls */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        {/* Dropdown */}
        <TextField
          select
          label="Search Field"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Author</MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="isbn">ISBN</MenuItem>
        </TextField>

        {/* Search Input */}
        <TextField
          fullWidth
          label={`Search by ${searchField}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Search Results */}
      {!loading && books && books.length > 0 ? (
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:hover": { boxShadow: 5 },
                  height: "100%",
                  transition: "0.2s",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Author:</strong> {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {book.category || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ISBN:</strong> {book.ISBN || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        !loading && (
          <Typography
            textAlign="center"
            color="text.secondary"
            mt={3}
            fontSize="1rem"
          >
            No books found.
          </Typography>
        )
      )}
    </Box>
  );
};

export default BookSearch;
