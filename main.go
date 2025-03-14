package main

import "github.com/gin-gonic/gin"
import "github.com/gin-contrib/cors"
import "github.com/gin-gonic/contrib/static"
import "os"
import "encoding/json"
import "log"

func main() {
	//gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(cors.Default())
	//serve static files in /images as /assets/$FILE_NAME
	r.Static("/assets", "./images")
	content, err := os.ReadFile("database.json")
	if err != nil {
		panic(err)
	}
	r.Use(static.Serve("/", static.LocalFile("./statics", true)))
	if ok := json.Valid([]byte(content)); ok == false {
		log.Fatalf("database.json is not a valid json file")
	}
	r.StaticFile("api/locations", "database.json")
	//	r.GET("api/locations", getLocations)
	r.Run(":8080")
}
