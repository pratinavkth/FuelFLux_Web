import React from 'react';
import { Box, Container, Grid, Paper, Typography, Avatar, Stack } from '@mui/material';

const reviews = [
  {
    name: "Riya Mehra",
    username: "@riyamehra",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    review: `This service completely changed how I order fuel. 
            It’s reliable and super convenient!`,
  },
  {
    name: "Amit Deshmukh",
    username: "@amitd",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    review: `I’ve been using this for a few months now 
            and my experience has been amazing!`,
  },
  {
    name: "Sneha Kapoor",
    username: "@snehak",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    review: `No more waiting at fuel stations. The 
            delivery is quick and easy to track.`,
  },
  {
    name: "Rahul Verma",
    username: "@rahulv",
    photo: "https://randomuser.me/api/portraits/men/34.jpg",
    review: `Simple interface and great customer support. 
            Highly recommended!`,
  },
  {
    name: "Kavita Joshi",
    username: "@kavitaj",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    review: `User-friendly and very useful for busy 
            professionals like me.`,
  },
  {
    name: "Manoj Nair",
    username: "@manojn",
    photo: "https://randomuser.me/api/portraits/men/61.jpg",
    review: `Using this service saved me hours every week. 
            Super helpful!`,
  },
  {
    name: "Priya Shah",
    username: "@priyashah",
    photo: "https://randomuser.me/api/portraits/women/58.jpg",
    review: `I recommend this to all my friends. 
            It’s fantastic!`,
  },
  {
    name: "Arjun Bhatia",
    username: "@arjunb",
    photo: "https://randomuser.me/api/portraits/men/48.jpg",
    review: `Clean design and seamless performance. 
            Well done team!`,
  },
  {
    name: "Divya Rani",
    username: "@divyarani",
    photo: "https://randomuser.me/api/portraits/women/50.jpg",
    review: `Impressive service that delivers what it promises, 
            and more.`,
  },
];

const CustomerReviews = () => {
  return (
    <Box sx={{ py: 8, px: 2, mt: -1, pb: 10, backgroundColor: 'white', borderTopLeftRadius: { xs: 32, md: 64 }, borderTopRightRadius: { xs: 32, md: 64 }, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
            <Typography
            variant="caption"
                sx={{
                color: 'orange',
                position: 'relative',
                display: 'inline-block',
                mb: 4,
                fontWeight: 'bold',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: { xs: '2rem', md: '2.5rem' },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: -1,
                    width: '90%',
                    height: '3px',
                    backgroundColor: 'black',
                    borderRadius: '1px',
                },
                }}
            >
            What Our Customers Say
            </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: 6 }}>
              <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    height: '100%', 
                    borderRadius: 4,
                    alignItems: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', // subtle base shadow
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px',
                    transform: 'translateY(-6px)',
                    },
                }}>
                <Typography variant="body1" justifyContent="center" sx={{ whiteSpace: 'pre-line', mb: 4, mt: 2 }}>
                  {review.review}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: -4 }}>
                  <Avatar src={review.photo} alt={review.name} />
                  <Box>
                    <Typography fontWeight={600}>{review.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.username}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerReviews;
