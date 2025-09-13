import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Faq from "../Components/Faq";

export const careArticles = [
  {
    id: 1,
    title: "Feeding Your Dog: A Complete Guide",
    category: "Feeding",
    author: "John Doe",
    date: "12 Sep 2025",
    image: "https://picsum.photos/900/500?random=21",
    description: "Discover portion sizes, feeding schedules, and the difference between dry and wet food for dogs of all ages.",
  },
  {
    id: 2,
    title: "Cat Hygiene Tips Every Owner Should Know",
    category: "Hygiene",
    author: "Jane Smith",
    date: "10 Sep 2025",
    image: "https://picsum.photos/900/500?random=22",
    description: "From grooming to litter box maintenance, keep your feline friend clean and healthy.",
  },
  {
    id: 3,
    title: "Exercise for Birds: Keeping Them Active",
    category: "Exercise",
    author: "Emily Brown",
    date: "9 Sep 2025",
    image: "https://picsum.photos/900/500?random=23",
    description: "Creative ways to keep your birds mentally and physically stimulated indoors.",
  },
  {
    id: 4,
    title: "Aquarium Maintenance Made Simple",
    category: "Aquatic Care",
    author: "Chris Lee",
    date: "8 Sep 2025",
    image: "https://picsum.photos/900/500?random=24",
    description: "Learn how to maintain a balanced aquarium environment for healthy fish.",
  },
];

const careVideos = [
  {
    id: 1,
    title: "How to Groom Your Dog",
    url: "https://www.youtube.com/embed/ysz5S6PUM-U",
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/0.jpg",
  },
  {
    id: 2,
    title: "Setting Up an Aquarium",
    url: "https://www.youtube.com/embed/ScMzIvxBSi4",
    thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/0.jpg",
  },
  {
    id: 3,
    title: "Cat Exercise Routines",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/0.jpg",
  },
];

function CareOptions() {
  return (
  <>
  <Box sx={{ mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 6, md: 12 } }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 8, textAlign: "center" }}>
        Pet Care Resources
      </Typography>

      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          mb: 8,
          height: { xs: 280, md: 450 },
          "&:hover img": { transform: "scale(1.05)", transition: "all 0.5s" },
        }}
      >
        <CardMedia
          component="img"
          image={careArticles[0].image}
          alt={careArticles[0].title}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(0,0,0,0.55)",
            color: "#fff",
            p: { xs: 2, md: 4 },
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            {careArticles[0].category}
          </Typography>
          <Typography variant="h5" md="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {careArticles[0].title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {careArticles[0].description}
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "red", borderRadius: "20px", px: 4 }}
            component={Link}
            to={`/article/${careArticles[0].id}`}
          >
            Read More
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ mb: 10 }} justifyContent="center">
        {careArticles.slice(1, 3).map((article) => (
          <Grid item xs={12} sm={10} md={5} key={article.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 5,
                transition: "all 0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 8 },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={article.image}
                alt={article.title}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  By {article.author} • {article.date}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {article.description}
                </Typography>
                <Button
                  size="small"
                  sx={{ color: "red", fontWeight: "bold" }}
                  component={Link}
                  to={`/article/${article.id}`}
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 12 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 6, textAlign: "center" }}>
          More Articles
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {careArticles.slice(2).map((article) => (
            <Grid item xs={12} sm={10} md={5} lg={4} key={article.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  borderRadius: 4,
                  boxShadow: 3,
                  overflow: "hidden",
                  transition: "all 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: { xs: "100%", md: 180 }, objectFit: "cover" }}
                  image={article.image}
                  alt={article.title}
                />
                <CardContent sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    By {article.author} • {article.date}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {article.description}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ color: "red", fontWeight: "bold" }}
                    component={Link}
                    to={`/article/${article.id}`}
                  >
                    Read more →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 12 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 6, textAlign: "center" }}>
          Video Tutorials
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {careVideos.map((video) => (
            <Grid item xs={12} sm={10} md={4} key={video.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 5,
                  overflow: "hidden",
                  transition: "all 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 8 },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={video.thumbnail}
                  alt={video.title}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {video.title}
                  </Typography>
                  <Button
                    href={video.url}
                    target="_blank"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    Watch Now →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    
      
   
    </Box>
      <Faq />
      </>
  );
}

export default CareOptions;
