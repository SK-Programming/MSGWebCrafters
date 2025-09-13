import React from "react";
import { Box, Typography, CardMedia, Grid, Button, Card, CardContent } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { careArticles } from "./CareOptions";

function CareArticle() {
  const { id } = useParams();
  const article = careArticles.find((item) => item.id === parseInt(id));

  if (!article) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h4" fontWeight="bold">
          Article Not Found
        </Typography>
        <Button component={Link} to="/care" sx={{ mt: 3 }} variant="contained" color="error">
          Back to Articles
        </Button>
      </Box>
    );
  }

  const relatedArticles = careArticles.filter((item) => item.id !== article.id);

  return (
    <Box sx={{ width: "100%", px: { xs: 3, md: 6 }, py: { xs: 6, md: 12 } }}>
      <CardMedia
        component="img"
        image={article.image}
        alt={article.title}
        sx={{
          width: "100%",
          height: { xs: 250, md: 400 },
          objectFit: "cover",
          borderRadius: 4,
          mb: 6,
        }}
      />

      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          {article.category} • By {article.author} • {article.date}
        </Typography>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
          {article.title}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: "900px", mx: "auto" }}>
          {article.description}
        </Typography>
      </Box>

      <Box sx={{ mb: 10 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: "center" }}>
          Full Guide
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, maxWidth: "900px", mx: "auto" }}>
          {article.fullContent || article.description}
        </Typography>
      </Box>

      {relatedArticles.length > 0 && (
        <Box sx={{ mb: 12 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 6, textAlign: "center" }}>
            Related Articles
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {relatedArticles.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: 5,
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 8 },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Button
                      size="small"
                      sx={{ color: "red", fontWeight: "bold" }}
                      component={Link}
                      to={`/article/${item.id}`}
                    >
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default CareArticle;
