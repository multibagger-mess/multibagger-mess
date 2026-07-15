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

}