import 'api_service.dart';

import '../models/sms_job.dart';

class GatewayService {

  bool _isRunning = false;

  final ApiService apiService = ApiService();

  bool get isRunning => _isRunning;

  Future<bool> start() async {

    _isRunning = true;

    return true;

  }

  Future<void> stop() async {

    _isRunning = false;

  }

  Future<List<SmsJob>> fetchPendingJobs() async {

    return await apiService.fetchPendingJobs();

  }

  Future<void> updateSmsJob({

    required String id,

    required String status,

    String? error,

  }) async {

    await apiService.updateSmsJob(

      id: id,

      status: status,

      error: error,

    );

  }

  Future<Map<String, dynamic>> fetchGatewayStats() async {

  return await apiService.fetchGatewayStats();

}

Future<List<SmsJob>> fetchRecentActivity() async {

  return await apiService.fetchRecentActivity();

}

Future<void> sendHeartbeat() async {

  await apiService.sendHeartbeat();

}

}