package main

import (
	"log"
	"net/http"

	"dnd-virus/handlers"
)

func main() {
	http.HandleFunc("/api/roll", handlers.RollHandler)
	port := ":8080"
	log.Fatal(http.ListenAndServe(port, nil))
}
