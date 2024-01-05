import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import {
  getDisplayableValueFromContract,
  getImageUrl,
  sortData,
} from "../../app/public_api";

export default function ImageVotings(props) {
  const { data, onVote } = props;
  const sortedArray = sortData(data);

  const handleVote = (item) => {
    if (onVote) {
      onVote(item);
    }
  };

  return (
    <Grid container spacing={2}>
      {sortedArray.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={getImageUrl(item.key)}
              alt="Image"
            />
            <CardContent style={{ position: "relative" }}>
              <Typography variant="body2" color="text.secondary">
                Votes: {getDisplayableValueFromContract(item.value)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  backgroundColor: "blue",
                }}
                onClick={() => handleVote(item)}
              >
                Vote
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
