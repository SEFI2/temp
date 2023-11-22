# GraphQL Server
To test 127.0.0.1:80/graphql

# Start server
npm start

# Start container
docker build -t generator-backend:latest .
docker run -it -p 80:80 generator-backend:latest

# Write your mutation
```
mutation{
  generateVideo(title: "hello world!", orientation: "portrait"){
    id
  }
}

query{
  is_uploaded(id:"654f2f4b1ba2a352611e7aaa")
}
```
