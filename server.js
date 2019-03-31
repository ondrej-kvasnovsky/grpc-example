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

function helloWorld(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

function main() {
  const server = new grpc.Server();

  server.addService(exampleProto.Example.service, {helloWorld: helloWorld});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
