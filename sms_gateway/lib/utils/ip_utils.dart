import 'dart:io';

class IPUtils {
  static Future<String> getLocalIp() async {
    try {
      for (final interface in await NetworkInterface.list()) {
        for (final addr in interface.addresses) {
          if (addr.type == InternetAddressType.IPv4 &&
              !addr.isLoopback) {
            return addr.address;
          }
        }
      }
    } catch (_) {}

    return "Unavailable";
  }
}