package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"os"
	"os/exec"
)

type ServerManager struct {
	//servers map[string] ApiServer
	servers []ApiServer
}

func (sm *ServerManager) loadDatabase() {
	var fileData []byte

	fileData, err := os.ReadFile("serverDb.json")

	if err != nil {
		panic(err)
	}

	var fileServers []ApiServer
	json.Unmarshal(fileData, &fileServers)

	fmt.Println(fileServers)

	sm.servers = fileServers
}

func (sm *ServerManager) writeServerDb() {
	fileData, _ := json.MarshalIndent(sm.servers, "", " ")

	err := os.WriteFile("serverDb.json", fileData, 0644)

	if err != nil {
		panic(err)
	}

	fmt.Println("Saved server database")
}

// App struct
type App struct {
	ctx           context.Context
	serverManager ServerManager
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.serverManager = ServerManager{}
	a.serverManager.loadDatabase()
}

func (a *App) shutdown(ctx context.Context) {
	fmt.Println("\n\n\n\nshutting down")
	a.serverManager.writeServerDb()
}

type ApiServer struct {
	Name string
	Uuid uuid.UUID
	Vars []ApiServerVar
}

type ApiServerVar struct {
	Name  string
	Value string
}

func (a *App) FindServer(uuidIn string) ApiServer {
	return generateApiServer()
}

func (a *App) LaunchServer(uuid string) {
	fmt.Println("launching erver")
	serverCommand := exec.Command("/home/jturel/code/ioq3-main/build/release-linux-x86_64/ioq3ded.x86_64")

	server := generateApiServer()
	fmt.Println(server)

	result, err := serverCommand.Output()

	if err != nil {
		panic(err)
	}

	fmt.Println(string(result))

}

func generateApiServer() ApiServer {
	return ApiServer{
		Uuid: uuid.New(),
		Vars: []ApiServerVar{
			ApiServerVar{
				Name:  "sv_hostname",
				Value: "example.com",
			},
			ApiServerVar{
				Name:  "net_port",
				Value: "27960",
			},
		},
	}
}

func (a *App) LoadServers() []ApiServer {
	return a.serverManager.servers
}
