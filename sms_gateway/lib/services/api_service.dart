import 'dart:convert';

import 'package:http/http.dart' as http;

import '../config/api_config.dart';

import '../models/sms_job.dart';

class ApiService {

  String get baseUrl => ApiConfig.baseUrl;

  Future<List<SmsJob>> fetchPendingJobs() async {

    final response = await http.get(

      Uri.parse("$baseUrl/api/gateway/jobs"),

    );

    if (response.statusCode != 200) {

      return [];

    }

    final body = jsonDecode(response.body);

    List jobs = body["data"];

    return jobs

        .map((e) => SmsJob.fromJson(e))

        .toList();

  }

   Future<void> updateSmsJob({
    required String id,
    required String status,
    String? error,
  }) async {

    await http.post(

      Uri.parse("$baseUrl/api/gateway/jobs/$id/result"),

      headers: {

        "Content-Type": "application/json",

      },

      body: jsonEncode({

        "status": status,

        "error": error,

      }),

    );

  }

  // ===========================
  // Fetch Gateway Statistics
  // ===========================

  Future<Map<String, dynamic>> fetchGatewayStats() async {

    final response = await http.get(

      Uri.parse("$baseUrl/api/gateway/stats"),

    );

    if (response.statusCode != 200) {

      return {

        "sent": 0,

        "pending": 0,

        "failed": 0,

      };

    }

    final body = jsonDecode(response.body);

    return body["data"];

  }

  Future<List<SmsJob>> fetchRecentActivity() async {

  final response = await http.get(

    Uri.parse("$baseUrl/api/gateway/activity"),

  );

  if (response.statusCode != 200) {

    return [];

  }

  final body = jsonDecode(response.body);

  List jobs = body["data"];

  return jobs

      .map((e) => SmsJob.fromJson(e))

      .toList();

}

Future<void> sendHeartbeat() async {

  await http.post(

    Uri.parse("$baseUrl/api/gateway/heartbeat"),

  );

}

}
