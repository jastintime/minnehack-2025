package main 

import "github.com/gin-gonic/gin" 
import "github.com/gin-contrib/cors"

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("api/locations", getLocations);
	r.Run();
}





