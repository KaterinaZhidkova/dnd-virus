package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"

	"dnd-virus/handlers"
)

//go:embed web/**
var web embed.FS

func main() {
	if len(os.Args) > 1 && os.Args[1] == "genpass" {
		fmt.Print(GeneratePassword())
		return
	}

	http.HandleFunc("/api/roll", handlers.RollHandler)

	webFS, err := fs.Sub(web, "web")
	if err != nil {
		log.Fatal(err)
	}
	http.Handle("/", http.FileServer(http.FS(webFS)))
	port := ":8080"
	log.Fatal(http.ListenAndServe(port, nil))
}
