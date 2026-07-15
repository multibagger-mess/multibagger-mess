import 'package:flutter/foundation.dart';

import 'native_sms_service.dart';

class SmsService {
  Future<bool> sendSms({
    required String phone,
    required String message,
  }) async {
    try {
      await NativeSmsService.sendSms(
        phone: phone,
        message: message,
      );

      return true;
    } catch (e) {
      debugPrint("SMS Error: $e");
      return false;
    }
  }
}