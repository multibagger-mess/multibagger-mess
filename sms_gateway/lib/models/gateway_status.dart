class GatewayStatus {

  bool isRunning;

  int smsSent;

  int pendingSms;

  int failedSms;

  String ipAddress;

  int port;

  String statusMessage;

  GatewayStatus({

  this.isRunning = false,

  this.smsSent = 0,

  this.pendingSms = 0,

  this.failedSms = 0,

  this.ipAddress = "Unavailable",

  this.port = 8080,

  this.statusMessage = "Gateway Offline",

});

}