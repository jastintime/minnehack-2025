package main 

import "github.com/gin-gonic/gin" 
import "github.com/gin-contrib/cors"

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	//serve static files in /images as /assets/$FILE_NAME 
	r.Static("/assets", "./images")
	r.GET("api/locations", getLocations)
	r.Run()
}





