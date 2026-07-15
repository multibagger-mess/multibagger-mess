import 'package:flutter/foundation.dart';
import 'package:permission_handler/permission_handler.dart';

class PermissionService {

  static Future<bool> requestSmsPermission() async {

    final status = await Permission.sms.request();

    debugPrint("SMS Permission Status: $status");

    if (status.isGranted) {
      return true;
    }

    if (status.isPermanentlyDenied) {
      await openAppSettings();
    }

    return false;
  }
}