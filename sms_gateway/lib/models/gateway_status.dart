class GatewayStatus {

  bool isRunning;

  int smsSent;

  int pendingSms;

  int failedSms;

  GatewayStatus({

    this.isRunning = false,

    this.smsSent = 0,

    this.pendingSms = 0,

    this.failedSms = 0,

  });

}