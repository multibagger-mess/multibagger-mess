
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

}