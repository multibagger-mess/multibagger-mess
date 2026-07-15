
import 'dart:io';

import 'network_constants.dart';

import 'api_routes.dart';

class ApiServer {

  HttpServer? _server;

  final ApiRoutes _routes = ApiRoutes();

  bool get isRunning => _server != null;

  Future<void> start() async {

  if (_server != null) return;

  _server = await HttpServer.bind(
    InternetAddress.anyIPv4,
    NetworkConstants.port,
  );

  _server!.listen((HttpRequest request) async {

    await _routes.handle(request);

});

}

  Future<void> stop() async {

  await _server?.close(force: true);

  _server = null;

}

}