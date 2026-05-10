package main

import (
	"log"
	"net/http"

	"github.com/KaterinaZhidkova/dnd-virus/backend/handlers"
)

func main() {
	http.HandleFunc("/api/roll", handlers.RollHandler)
	port := ":8080"
	log.Fatal(http.ListenAndServe(port, nil))
}
