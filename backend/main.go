package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"

	"dnd-virus/handlers"
)

//go:embed web/**
var web embed.FS

func main() {
	http.HandleFunc("/api/roll", handlers.RollHandler)

	webFS, err := fs.Sub(web, "web")
	if err != nil {
		log.Fatal(err)
	}
	http.Handle("/", http.FileServer(http.FS(webFS)))
	port := ":8080"
	log.Fatal(http.ListenAndServe(port, nil))
}
