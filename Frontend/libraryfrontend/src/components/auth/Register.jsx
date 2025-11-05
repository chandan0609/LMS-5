import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WorkIcon from "@mui/icons-material/Work";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "member",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    try {
      await dispatch(register(formData)).unwrap();
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 140px)", // fits between fixed header and footer
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        padding: "16px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="black" gutterBottom>
          Library System
        </Typography>
        <Typography
          variant="h6"
          color="success.main"
          fontWeight="bold"
          gutterBottom
        >
          Register
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 1 }}>
            ✓ Registration successful! Redirecting to login...
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: "8px" }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="dense"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon color="success" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="dense"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="success" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="dense"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="success" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon color="success" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="librarian">Librarian</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1,
              background: "linear-gradient(135deg, #43a047, #66bb6a)",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(135deg, #388e3c, #4caf50)",
              },
            }}
            disabled={loading}
            startIcon={!loading && <HowToRegIcon />}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2e7d32",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Register;
