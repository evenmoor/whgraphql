# whgraphql
A Simple GraphQL implementation for data collection in WarmaHordes

## Prerequisites
This spins up in a vagrant virtual machine so you will need to have vagrant and oracle virtual box installed. Both should be running with admin or root permissions.

- https://www.virtualbox.org/
- https://www.vagrantup.com/

## Setup
_this only needs to be done the first time the machine is booted_
1. Clone the repo to your machine.
1. Open the command prompt as admin and navigate to the directory where you cloned the repo (e.g. `$cd C:/Users/evenmoor/desktop/vms/whgraph/`.
1. Start the vm with `$vagrant up`.
1. Once the vm is running, connect to it via ssh `$ssh vagrant@192.168.50.101`. When prompted for a password, enter `vagrant`.
1. Run the server config script `$sudo bash /mnt/scripts/setupGraph.sh`.
1. Change to the app directory `$cd /mnt/app`.
1. Install the app `$sudo npm install`.
1. Setup is now complete. You may start the graphql app by skipping to step 4 in the next section.

## Starting
_this needs to be done every time the machine is booted_
1. Open the command prompt as admin and navigate to the directory where you cloned the repo (e.g. `$cd C:/Users/evenmoor/desktop/vms/whgraph/`
1. Start the vm with `$vagrant up`
1. Once the vm is running, connect to it via ssh `$ssh vagrant@192.168.50.101`. When prompted for a password, enter `vagrant`.
1. Run the start script `$sudo bash /mnt/scripts/startGraph.sh`.
1. Navigate to http://192.168.50.101:8080/graph to start using the graph.

## Stopping
If the app is running, it can be stopped by typing ctl+c. 

## Exiting
You can exit the VM by first stopping the app and then exiting ssh `$exit`. This will return you to the host operating system.

## The System
This is a basic graphql system so the documentation for the available resolvers can be found in the graphiql ui.

When the vm is running, the contents of the repo are mounted as /mnt so modifying the files in the directory will allow you to extend/modify the system.

Resolvers are in /mnt/app/graphq/schemas/warmahordes.js

## Example Queries
### Add Model
```
mutation{
  addModel( input : {
    name : "woo",
    str : 12,
    mat : 5,
    rat : 5,
    def : 13,
    arm : 19
  }){
    success,
    error,
    doc {
      name
    }
  }
}
```

### Find Models
```
{
  models(filter : { name : "find me?" }) {
    success,
    error,
    docs{
      _id
      name
      str
      mat
      rat
      def
      arm
    }
  }
}
```

### Clear Data
```
mutation{
  clear_data(input : { collection : "models" }){
    success
  }
}
```
