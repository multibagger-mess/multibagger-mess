import 'package:flutter/services.dart';

class NativeSmsService {
  static const MethodChannel _channel =
      MethodChannel("sms_gateway/native");

  static Future<String> ping() async {
    final result = await _channel.invokeMethod<String>("ping");
    return result ?? "No response";
  }

  static Future<void> sendSms({
    required String phone,
    required String message,
  }) async {
    await _channel.invokeMethod(
      "sendSms",
      {
        "phone": phone,
        "message": message,
      },
    );
  }
}