package main

import (
	"context"
	"fmt"
        "github.com/google/uuid"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

type ApiServer struct {
  Name string
  Uuid uuid.UUID
  Vars []ApiServerVar
}

type ApiServerVar struct {
  Name string
  Value string
}

func (a *App) LoadServers() []ApiServer {
        var servers []ApiServer = make([]ApiServer, 0, 0)
        var server ApiServer
        server.Name = "test"
        server.Uuid = uuid.New()

        var serverVars = make([]ApiServerVar, 0, 0)
        var serverVar ApiServerVar
        serverVar.Name = "sv_hostname"
        serverVar.Value = "example.com"

        serverVars = append(serverVars, serverVar)
        server.Vars = serverVars

        servers = append(servers, server)
        fmt.Println(server)
        return servers;
}
