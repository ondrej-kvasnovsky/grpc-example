const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    './example.proto',
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
const exampleProto = grpc.loadPackageDefinition(packageDefinition).example;

function main() {
  const credentials = grpc.credentials.createInsecure();
  const client = new exampleProto.Example('localhost:50051', credentials);

  client.helloWorld({name: 'World'}, function(err, response) {
    console.log('Greeting:', response);
  });
}

main();