package main

import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx           context.Context
	serverManager ServerManager
	serverDb      ServerDb
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	a.serverManager = ServerManager{
		db: ServerDb{},
	}

	a.serverManager.Init()
}

func (a *App) shutdown(ctx context.Context) {
	fmt.Println("\n\n\n\nshutting down")
	a.serverManager.WriteServerDb()
}

type ApiServer struct {
	Name string
	Uuid string
	Vars []ApiServerVar
}

type ApiServerVar struct {
	Name  string
	Value string
}

func (a *App) FindServer(uuid string) ApiServer {
	return a.serverManager.FindServer(uuid)
}

func (a *App) CreateServer(server ApiServer) {
	a.serverManager.CreateServer(server)
}

func (a *App) UpdateServer(server ApiServer) {
	fmt.Println(server)
}

func (a *App) LaunchServer(uuid string) {
	a.serverManager.LaunchServer(uuid)
}

/*
func generateApiServer() ApiServer {
	return ApiServer{
		Uuid: uuid.New().String(),
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
*/

func (a *App) LoadServers() []ApiServer {
	return a.serverManager.servers
}
