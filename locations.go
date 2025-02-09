package main

import "github.com/gin-gonic/gin" 
import  "net/http"

type image struct {
	Location string `json:""`
	Name string `json:"name"`
	Date string `json:"date"`
	Description string `json:"description"`
	Source string `json:"source"`
}


type location struct {
	//lattiude first, longtitude first
	Coordinate [2]float64 `json:"coordinates"`
	Images []image `json:images`

}

var smiling_guy = image{Location: "assets/smiling_guy.jpg", Name: "Smiling Guy", Date: "9/11/2001", Description: "A guy smiling", Source: "Your mom"}

var angry_women = image{Location: "assets/angry_women.jpg", Name: "Angry Women", Date: "10/17/1972", Description: "A women angry", Source: "Wikipedia"}

func getLocations (c *gin.Context) {
	myLocations := []location{ 
		{Coordinate: [2]float64{44.9866, -93.2581}, Images: []image{smiling_guy,angry_women}},
		{Coordinate: [2]float64{40.9866, -93.2581}, Images: []image{smiling_guy}},
	}
	c.JSON(http.StatusOK,myLocations)

}
