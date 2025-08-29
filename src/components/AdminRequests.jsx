import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { supabase } from "../../supabase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
//   updateDoc,
  deleteDoc,
  addDoc
} from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Grid,
  Avatar
} from "@mui/material";

// Import icons - make sure @mui/icons-material is installed
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';

function AdminRequest() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageDialog, setImageDialog] = useState({ open: false, src: '', title: '', loading: false });
  const [processingAction, setProcessingAction] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch all pending admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Pending_Admins"));
        const adminList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdmins(adminList);
      } catch (err) {
        console.error("Error fetching admins:", err);
        showSnackbar("Error fetching admin requests", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Fetch details of a single admin when clicked
  const handleAdminClick = async (id) => {
    try {
      const docRef = doc(db, "Pending_Admins", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setSelectedAdmin({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (err) {
      console.error("Error fetching admin details:", err);
      showSnackbar("Error fetching admin details", "error");
    }
  };

  // Get Supabase signed URL for private bucket
  const getImageUrl = async (filePath) => {
    if (!filePath) return null;
    try {
      const { data, error } = await supabase.storage
        .from('PumpProof')
        .createSignedUrl(filePath, 3600); // URL expires in 1 hour
      
      if (error) {
        console.error('Error creating signed URL:', error);
        return null;
      }
      
      return data.signedUrl;
    } catch (err) {
      console.error('Error generating signed URL:', err);
      return null;
    }
  };

  // Open image in dialog
  const handleViewImage = async (filePath, fileName) => {
    try {
      // Show loading state
      setImageDialog({
        open: true,
        src: '',
        title: fileName || 'Document',
        loading: true
      });

      const imageUrl = await getImageUrl(filePath);
      if (imageUrl) {
        setImageDialog({
          open: true,
          src: imageUrl,
          title: fileName || 'Document',
          loading: false
        });
      } else {
        setImageDialog(prev => ({ ...prev, loading: false }));
        showSnackbar("Unable to load image", "error");
      }
    } catch (error) {
      console.error('Error loading image:', error);
      setImageDialog(prev => ({ ...prev, loading: false }));
      showSnackbar("Error loading image", "error");
    }
  };

  // Close image dialog
  const closeImageDialog = () => {
    setImageDialog({ open: false, src: '', title: '', loading: false });
  };

  // Show snackbar notification
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Approve admin request
  const handleApprove = async () => {
    if (!selectedAdmin) return;

    setProcessingAction(true);
    try {
      // Add to approved admins collection
      await addDoc(collection(db, "Admins"), {
        email: selectedAdmin.email,
        name: selectedAdmin.name,
        mobile: selectedAdmin.mobile,
        approvedAt: new Date(),
        PumpApproved:true,
        approvedBy: import.meta.env.VITE_SUPERADMIN_UID, // Replace with actual current user ID
        Files: selectedAdmin.Files?.map(file => ({ ...file, Approved: true }))
      });

      // Remove from pending admins
      await deleteDoc(doc(db, "Pending_Admins", selectedAdmin.id));

      // Update local state
      setAdmins(admins.filter(admin => admin.id !== selectedAdmin.id));
      setSelectedAdmin(null);

      showSnackbar("Admin request approved successfully!", "success");
    } catch (err) {
      console.error("Error approving admin:", err);
      showSnackbar("Error approving admin request", "error");
    } finally {
      setProcessingAction(false);
    }
  };

  // Reject admin request
  const handleReject = async () => {
    if (!selectedAdmin) return;

    setProcessingAction(true);
    try {
      // Remove from pending admins
      await deleteDoc(doc(db, "Pending_Admins", selectedAdmin.id));

      // Update local state
      setAdmins(admins.filter(admin => admin.email !== selectedAdmin.id));
      setSelectedAdmin(null);

      showSnackbar("Admin request rejected", "info");
    } catch (err) {
      console.error("Error rejecting admin:", err);
      showSnackbar("Error rejecting admin request", "error");
    } finally {
      setProcessingAction(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Admin Request Management
      </Typography>

      <Grid container spacing={4}>
        {/* Left side: List of admins */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon />
                Pending Requests ({admins.length})
              </Typography>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : admins.length === 0 ? (
                <Typography variant="body2" sx={{ textAlign: 'center', p: 4, color: 'text.secondary' }}>
                  No pending admin requests
                </Typography>
              ) : (
                <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                  {admins.map((admin, index) => (
                    <React.Fragment key={admin.id}>
                      <ListItem
                        button
                        onClick={() => handleAdminClick(admin.id)}
                        sx={{
                          borderRadius: 1,
                          mb: 1,
                          "&:hover": { bgcolor: "primary.50" },
                          bgcolor: selectedAdmin?.id === admin.id ? "primary.100" : "inherit"
                        }}
                      >
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {(admin.name || admin.email || 'A').charAt(0).toUpperCase()}
                        </Avatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="medium">
                              {admin.name || admin.email}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {admin.email}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Requested: {
                                  admin.createdAt 
                                    ? new Date(admin.createdAt.seconds * 1000).toLocaleDateString()
                                    : "N/A"
                                }
                              </Typography>
                            </Box>
                          }
                        />
                        <Chip 
                          label="Pending" 
                          color="warning" 
                          size="small"
                          variant="outlined"
                        />
                      </ListItem>
                      {index < admins.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right side: Selected admin details */}
        <Grid item xs={12} md={7}>
          {selectedAdmin ? (
            <Card sx={{ height: 'fit-content' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Request Details
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckIcon />}
                      onClick={handleApprove}
                      disabled={processingAction}
                      sx={{ minWidth: 120 }}
                    >
                      {processingAction ? <CircularProgress size={20} /> : 'Approve'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={handleReject}
                      disabled={processingAction}
                    >
                      Reject
                    </Button>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1" fontWeight="medium">{selectedAdmin.email}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Name</Typography>
                    <Typography variant="body1" fontWeight="medium">{selectedAdmin.name || "N/A"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1" fontWeight="medium">{selectedAdmin.mobile || "N/A"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Request Date</Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedAdmin.createdAt 
                        ? new Date(selectedAdmin.createdAt.seconds * 1000).toLocaleString()
                        : "N/A"
                      }
                    </Typography>
                  </Grid>
                </Grid>

                {/* Documents section */}
                {selectedAdmin.Files && selectedAdmin.Files.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Submitted Documents ({selectedAdmin.Files.length})
                    </Typography>
                    <List>
                      {selectedAdmin.Files.map((file, index) => (
                        <ListItem 
                          key={index}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            mb: 1,
                            bgcolor: 'background.paper'
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="subtitle2">
                                {file.Pumpproof || `Document ${index + 1}`}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Chip
                                  label={file.Approved ? "Approved" : "Pending"}
                                  color={file.Approved ? "success" : "warning"}
                                  size="small"
                                />
                                {file.path && (
                                  <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                                    File: {file.path.split('/').pop()}
                                  </Typography>
                                )}
                              </Box>
                            }
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewImage(file.path, file.Pumpproof)}
                            sx={{ ml: 2 }}
                          >
                            View
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Select an admin request
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose a request from the list to view details and take action
                </Typography>
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Image View Dialog */}
      <Dialog 
        open={imageDialog.open} 
        onClose={closeImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {imageDialog.title}
          <IconButton onClick={closeImageDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {imageDialog.loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading image...</Typography>
            </Box>
          ) : imageDialog.src ? (
            <Box sx={{ textAlign: 'center' }}>
              <img 
                src={imageDialog.src} 
                alt={imageDialog.title}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '70vh', 
                  objectFit: 'contain',
                  borderRadius: 8
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  showSnackbar('Failed to load image', 'error');
                }}
              />
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography color="error">Failed to load image</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeImageDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdminRequest;