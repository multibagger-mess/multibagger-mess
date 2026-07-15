import 'dart:io';

class NetworkUtils {

  static Future<String> getLocalIpAddress() async {

    try {

      final interfaces =
          await NetworkInterface.list();

      for (final interface in interfaces) {

        for (final addr in interface.addresses) {

          if (!addr.isLoopback &&
              addr.type ==
                  InternetAddressType.IPv4) {

            return addr.address;

          }

        }

      }

    }

    catch (_) {}

    return "Unavailable";

  }

}