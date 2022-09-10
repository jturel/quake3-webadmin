package main

import (
	"fmt"
	"os/exec"
)

type ServerManager struct {
	//servers map[string] ApiServer
	servers []ApiServer
	db      ServerDb
}

func (sm *ServerManager) Init() {
	sm.servers = sm.db.load()
}

func (sm *ServerManager) WriteServerDb() {
	sm.db.write(sm.servers)
}

func (sm *ServerManager) FindServer(uuid string) ApiServer {
	var found ApiServer

	for _, server := range sm.servers {
		if server.Uuid == uuid {
			found = server
		}
	}

	return found
}

func (sm *ServerManager) CreateServer(server ApiServer) {

}

func (sm *ServerManager) LaunchServer(uuid string) {
	serverCommand := exec.Command("/home/jturel/code/ioq3-main/build/release-linux-x86_64/ioq3ded.x86_64")

	server := sm.FindServer(uuid)
	fmt.Println(server)

	_, err := serverCommand.Output()

	if err != nil {
		panic(err)
	}
}
