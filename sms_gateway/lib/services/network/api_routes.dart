import 'dart:convert';
import 'dart:io';

import 'api_response.dart';
import 'network_constants.dart';

class ApiRoutes {

  Future<void> handle(HttpRequest request) async {

    if (request.uri.path == NetworkConstants.healthRoute) {

      final response = ApiResponse(
        success: true,
        message: "Gateway Running",
      );

      request.response.statusCode = HttpStatus.ok;

      request.response.headers.contentType = ContentType.json;

      request.response.write(
        jsonEncode(response.toJson()),
      );

      await request.response.close();

      return;

    }

    request.response.statusCode = HttpStatus.notFound;

    request.response.write("Route Not Found");

    await request.response.close();

  }

}