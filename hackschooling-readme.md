# Fork of Workadventure

As private fork are not allowed by github, a few steps are required to be able to use this repository as a regular fork

### How to stay up to date
##### Configure the original repo as one of your remote URL

```git remote add upstream https://github.com/thecodingmachine/workadventure.git```

##### Disable push for this remote ( You're not allowed to push anyway )

```git remote set-url --push upstream DISABLE```

##### Fetch the original repo on a regular basis

```
git fetch upstream
git rebase upstream/master
```  

## Hackschooling instance

### Settings
The settings are store in the `.env` file on the server inside the hackschooling-workadventure folder.

The csv listing the user's accounts are located in the default Nginx folder.
The user list can be updated without redeploying the application

### Maps
The map is located in `maps/hackschooling`. When you update the map, you will need to redeploy for the changes to take effects.

### Deploy
- On the server, go into the hackschooling-workadventure folder.
- Pull the changes ( /!\ After ownership transfer you may need to update the remote url )
- Run `docker-compose -f docker-compose.prod.yaml build && docker-compose -f docker-compose.prod.yaml up -d` to deploy

/!\ This docker file was made to work with Nginx on the current server.
If you want to deploy on another server, you can either :
- Use the default docker-compose to work with traefik if there is no webserver installed
- Copy the nginx configuration from the current server

### Dev
To run with the same environment in dev mode, you can use the docker-compose.prod.yaml but you will need to do some changes :
- Replace the port 9180 by 80
- Replace the port 9443 by 443
- You may need to add vhost to handle all the subdomain for workadventure.localhost as 127.0.0.1
- You will need to go to https://pusher.workadventure.localhost to allow the certificate before you can use the application
- You will need to create a .env file ( a template .env.template exists in the repo )
