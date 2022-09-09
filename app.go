package main

import (
        "context"
        "fmt"
        "github.com/google/uuid"
        "os/exec"
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

func (a *App) FindServer(uuidIn string) ApiServer {
  return ApiServer {
    Uuid: uuid.New(),
    Vars: []ApiServerVar {
      ApiServerVar {
        Name: "sv_hostname",
        Value: "example.com",
      },
    },
  }
}

func (a *App) LaunchServer(uuid string) {
  fmt.Println("launching erver")
  fmt.Println(uuid)
  serverCommand := exec.Command("/home/jturel/code/ioq3-main/build/release-linux-x86_64/ioq3ded.x86_64")

  server := a.FindServer(uuid)
  fmt.Println(server)

  result, err := serverCommand.Output()

  if err != nil {
    panic(err)
  }

  fmt.Println(string(result))

}

func (a *App) LoadServers() []ApiServer {
        servers := []ApiServer {
          ApiServer {
            Uuid: uuid.New(),
            Vars: []ApiServerVar {
              ApiServerVar {
                Name: "sv_hostname",
                Value: "example.com",
              },
              ApiServerVar {
                Name: "net_port",
                Value: "27960",
              },
            },
          },
        }

        fmt.Println(servers)

        return servers;
}
