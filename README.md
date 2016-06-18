# QW-Lobby

Development done on:
Lubuntu 14.04.4 (trusty)


Install nodejs
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install nodejs package manager (NPM)
```
sudo apt-get install npm
```

Clone repository
```
git clone git@github.com:liback/QW-Lobby.git
```


Install dependencies after navigating to repo
```
npm install
```

Run server
```
nodejs server.js
```

Server should now be running on port 3000, i.e. navigate to http://localhost:3000
