class GatewayService {
  bool _isRunning = false;

  bool get isRunning => _isRunning;

  Future<bool> start() async {
    _isRunning = true;
    return true;
  }

  Future<void> stop() async {
    _isRunning = false;
  }
}