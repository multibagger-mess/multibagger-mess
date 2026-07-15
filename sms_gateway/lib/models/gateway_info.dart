class GatewayInfo {

  final String deviceName;

  final String androidVersion;

  final String appVersion;

  final String status;

  GatewayInfo({
    required this.deviceName,
    required this.androidVersion,
    required this.appVersion,
    required this.status,
  });

  Map<String, dynamic> toJson() {

    return {

      "deviceName": deviceName,

      "androidVersion": androidVersion,

      "appVersion": appVersion,

      "status": status,

    };

  }

}