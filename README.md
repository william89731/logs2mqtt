![denied2](https://user-images.githubusercontent.com/68069659/218181676-640622fb-1a7d-4255-8066-ab7f425c0c92.gif)

[![platform](https://img.shields.io/badge/platform-kubernetes-blue)](https://kubernetes.io/)
[![os](https://img.shields.io/badge/os-linux-red)](https://www.linux.org/)
[![platform](https://img.shields.io/badge/platform-nodejs-blue)](https://nodejs.org/en/)
[![docker version](https://img.shields.io/badge/docker%20version-20.10-brightgreen)](https://www.docker.com/)
[![license](https://img.shields.io/badge/license-Apache--2.0-yellowgreen)](https://apache.org/licenses/LICENSE-2.0)
[![donate](https://img.shields.io/badge/donate-wango-blue)](https://www.wango.org/donate.aspx)

# logs2mqtt
logs autentication failed. publish to mqtt

```requirements``` :

- [broker mqtt](https://mqtt.org/)

- [docker](https://www.docker.com/) for dockerized application

- [kubernetes](https://kubernetes.io/) for orchestration cluster

```use case for docker```

- create .env file. see example [here](https://github.com/william89731/logs2mqtt/blob/main/env-example)

- create docker-compose.yml. [gotcha](https://github.com/william89731/logs2mqtt/blob/main/docker-compose.yml)

- in same dir, launch:

```bash
docker compose up
```

```use case for kubernetes```

 run [daemonset](https://github.com/william89731/logs2mqtt/blob/main/daemonset.yml) every node in cluster
 
 ```what purpose does it serve?```
 
 ...send notification. example, telegram:
 
 ![image](https://user-images.githubusercontent.com/68069659/218189342-52d3c398-81d4-42ce-a62e-0ee74b3a8b05.png)

topic mqtt:

```logs2mqtt/#```
 
 ### Credit
 
 thanks to [jmmy](https://github.com/JmmyGun) for great idea! 
 
