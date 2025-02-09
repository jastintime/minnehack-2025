package main

import "github.com/gin-gonic/gin"
import "github.com/gin-contrib/cors"
import "os"
import "encoding/json"
import "log"
import "net/http"

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	//serve static files in /images as /assets/$FILE_NAME
	r.Static("/assets", "./images")
	content, err := os.ReadFile("database.json")
	if err != nil {
		panic(err)
	}
	r.Use(CorsMiddleware())
	if ok := json.Valid([]byte(content)); ok == false {
		log.Fatalf("database.json is not a valid json file")
	}
	r.StaticFile("api/locations", "database.json")
	//	r.GET("api/locations", getLocations)
	r.Run()
}

func CorsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, Authorization")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PATCH, DELETE, PUT")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }

        c.Next()
    }
}
