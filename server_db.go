package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type ServerDb struct {
}

func (sm *ServerDb) load() []ApiServer {
	var fileData []byte

	fileData, err := os.ReadFile("serverDb.json")

	if err != nil {
		panic(err)
	}

	var fileServers []ApiServer
	json.Unmarshal(fileData, &fileServers)

	fmt.Println(fileServers)

	return fileServers
}

func (sm *ServerDb) write(servers []ApiServer) {
	fileData, _ := json.MarshalIndent(servers, "", " ")

	err := os.WriteFile("serverDb.json", fileData, 0644)

	if err != nil {
		panic(err)
	}

	fmt.Println("Saved server database")
}
